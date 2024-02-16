const express = require('express')
const router = express.Router()

const {
  getSkills,
  getUserSkills,
  addSkills,
  removeUserSkill,
} = require('../controllers/skill')

router.route('/getSkills').get(getSkills)
router.route('/getUserSkills').get(getUserSkills)
router.route('/addSkills').post(addSkills)
router.route('/removeUserSkill/:skill_id').delete(removeUserSkill)

module.exports = router
