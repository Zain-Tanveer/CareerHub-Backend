const express = require('express')
const router = express.Router()

const {
  getSavedJobs,
  saveJob,
  removeSavedJob,
  removeExpiredJobs,
} = require('../controllers/user-jobs')

router.route('/getSavedJobs').get(getSavedJobs)
router.route('/saveJob').post(saveJob)
router.route('/removeSavedJob/:job_id').delete(removeSavedJob)
router.route('/removeExpiredJobs').delete(removeExpiredJobs)

module.exports = router
