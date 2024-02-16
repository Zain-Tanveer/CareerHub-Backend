const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')
const bcrypt = require('bcryptjs')
const fs = require('fs')
const path = require('path')

const getProfile = async (req, res) => {
  const profile = await User.findOne({ _id: req.user.userId })
  res.status(StatusCodes.OK).json({ profile })
}

const updateProfile = async (req, res) => {
  const profileData = req.body
  if (!profileData.email) {
    throw new BadRequestError('please enter valid information')
  }
  const user = await User.findOneAndUpdate({ _id: req.user.userId }, req.body, {
    new: true,
    runValidators: true,
  })
  res.status(StatusCodes.OK).json({ user })
}

const updatePassword = async (req, res) => {
  const { password } = req.body
  if (!password) {
    throw new BadRequestError('please enter valid password')
  }
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { password: hashedPassword },
    {
      new: true,
      runValidators: true,
    }
  )
  res.status(StatusCodes.OK).json({ user })
}

const uploadPhoto = async (req, res) => {
  const file = req.file
  const updatedProfile = await User.findOne({ _id: req.user.userId })

  updatedProfile.image = req.file.filename
  updatedProfile.save()

  res.status(StatusCodes.OK).json({ updatedProfile, uploadedFile: file })
}

const uploadResume = async (req, res) => {
  const file = req.file
  const updatedProfile = await User.findOne({ _id: req.user.userId })
  res.status(StatusCodes.OK).json({ file })
}

module.exports = {
  getProfile,
  updateProfile,
  updatePassword,
  uploadPhoto,
  uploadResume,
}
