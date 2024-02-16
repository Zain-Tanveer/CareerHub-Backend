const Skill = require('../models/Skill')
const User_Skill = require('../models/User_Skill')

const mongoose = require('mongoose')

const { StatusCodes } = require('http-status-codes')
const { NotFoundError, BadRequestError } = require('../errors')

const getSkills = async (req, res) => {
  const skills = await Skill.find({})

  if (!skills) {
    throw new NotFoundError('No skills in database')
  }

  res.status(StatusCodes.OK).json({ nbHits: skills.length, skills })
}

const addSkills = async (req, res) => {
  const skills = req.body

  const data = skills.map((skill) => {
    return { skill_id: skill._id, user_id: req.user.userId }
  })

  const userSkills = await User_Skill.create(data)
  return res.status(StatusCodes.CREATED).json({ userSkills })
}

const getUserSkills = async (req, res) => {
  let userId = new mongoose.Types.ObjectId(req.user.userId)

  const data = await User_Skill.aggregate([
    {
      $match: { user_id: userId },
    },
    {
      $lookup: {
        from: 'skills',
        localField: 'skill_id',
        foreignField: '_id',
        as: 'Skills',
      },
    },
  ])

  if (data.length === 0) {
    throw new BadRequestError('Please add new skills!')
  }

  const skills = data.map((skill) => {
    return skill.Skills[0].skill
  })

  res.status(StatusCodes.OK).json({ userId, skills })
}

const removeUserSkill = async (req, res) => {
  const { skill_id } = req.params
  const skill = await User_Skill.findOneAndRemove({
    user_id: req.user.userId,
    skill_id: skill_id,
  })

  if (!skill) {
    throw new BadRequestError(`No such skill with id: ${skill_id}`)
  }
  res.status(StatusCodes.OK).json({ skill })
}

module.exports = {
  getSkills,
  addSkills,
  getUserSkills,
  removeUserSkill,
}
