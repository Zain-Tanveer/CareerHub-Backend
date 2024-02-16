const express = require("express");
const router = express.Router();

const upload = require("../middlewares/file-upload");

const {
  getProfile,
  updateProfile,
  updatePassword,
  uploadPhoto,
  uploadResume,
} = require("../controllers/user");

router.route("/getProfile").get(getProfile);
router.route("/updateProfile").patch(updateProfile);
router.route("/updatePassword").patch(updatePassword);
router.route("/uploadPhoto").post([upload.single("image"), uploadPhoto]);
router.route("/uploadResume").post([upload.single("resume"), uploadResume]);

module.exports = router;
