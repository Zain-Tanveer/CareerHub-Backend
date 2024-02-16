const mongoose = require('mongoose')

const UserSkillSchema = new mongoose.Schema(
  {
    skill_id: {
      type: mongoose.Types.ObjectId,
      required: [true, 'please provide skill id'],
      ref: 'Skill',
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      required: [true, 'please provide user id'],
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

UserSkillSchema.index({ skill_id: 1, user_id: 1 }, { unique: true })

module.exports = mongoose.model('User_Skill', UserSkillSchema)
