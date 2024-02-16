const mongoose = require('mongoose')

const SkillSchema = new mongoose.Schema({
  skill: {
    type: String,
  },
})

module.exports = mongoose.model('Skill', SkillSchema)
