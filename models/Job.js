const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema(
  {
    job_id: {
      type: String,
      required: [true, 'job id not provided'],
      unique: true,
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
    job_created_at: {
      type: String,
    },
    min_salary: {
      type: String,
    },
    max_salary: {
      type: String,
    },
    expiry_date: {
      type: String,
    },
    permaLink: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Job', JobSchema)
