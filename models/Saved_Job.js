const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema(
  {
    job_id: {
      type: String,
      required: [true, 'please provide job id'],
      unique: true,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'please provide user id'],
    },
    title: {
      type: String,
    },
    company: {
      type: String,
    },
    job_type: {
      type: String,
    },
    skills: {
      type: String,
    },
    experience: {
      type: String,
    },
    description: {
      type: String,
    },
    city: {
      type: String,
    },
    created_at: {
      type: String,
    },
    min_salary: {
      type: String,
    },
    max_salary: {
      type: String,
    },
    job_expiry_date: {
      type: Date,
    },
    permaLink: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Saved_Job', JobSchema)
