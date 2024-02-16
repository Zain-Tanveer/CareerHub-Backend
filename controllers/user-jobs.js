const Saved_Job = require('../models/Saved_Job')

const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getSavedJobs = async (req, res) => {
  const user_id = req.user.userId

  const savedJobs = await Saved_Job.find({ user_id }).sort('-createdAt')

  if (savedJobs.length === 0) {
    throw new NotFoundError(`no jobs saved by user_id: ${user_id}`)
  }
  res.status(StatusCodes.OK).json({ nbHits: savedJobs.length, savedJobs })
}

const saveJob = async (req, res) => {
  const user_id = req.user.userId
  const data = req.body

  const savedJob = await Saved_Job.findOne({
    user_id: user_id,
    job_id: data.job_id,
  })

  if (savedJob) {
    throw new BadRequestError('job already saved')
  }

  let skills = data.skills

  if (!(typeof skills === 'string')) {
    skills = data.skills.join(',')
  }

  data.skills = skills
  data.user_id = user_id

  const job = await Saved_Job.create({ ...data })
  res.status(StatusCodes.CREATED).json({ job })
}

const removeSavedJob = async (req, res) => {
  const { job_id } = req.params
  const user_id = req.user.userId

  const savedJob = await Saved_Job.findOneAndRemove({
    user_id: user_id,
    job_id: job_id,
  })

  if (!savedJob) {
    throw new NotFoundError(`no job with id: ${job_id}`)
  }

  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: 'Job has been deleted' })
}

const removeExpiredJobs = async (req, res) => {
  const timeElapsed = Date.now()
  const today = new Date(timeElapsed)

  const expiredJobs = await Saved_Job.deleteMany({
    job_expiry_date: { $lte: today },
  })
  res.json(expiredJobs)
}

module.exports = { getSavedJobs, saveJob, removeSavedJob, removeExpiredJobs }
