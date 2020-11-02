const express = require("express");
const { check, validationResult } = require("express-validator");
const multer = require("multer");
const {
  multerStorage,
  fileFilter,
  limits,
} = require("../config/multerStorageConfig");

const logger = require("../config/logger");
const isAuth = require("../config/isAuth");

const router = express.Router();

const {
  getAll,
  getByUserName,
  patchProfile,
  deleteProfile,
  postAvatar,
} = require("../controllers/profile");

const Profile = require("../models/profile");
const Language = require("../models/language");
const Role = require("../models/role");

const upload = multer({
  storage: multerStorage,
  fileFilter: fileFilter,
  limits: limits,
});

// Get all profiles
router.get("/", isAuth, getAll);

// Get profile by username
router.get("/:user_name", isAuth, getByUserName);

// Patch profile
router.patch(
  "/",
  [
    isAuth,
    check("user_name", "User name should not be empty").not().isEmpty(),
    check("first_name", "First name should not be empty").not().isEmpty(),
    check("last_name", "Last name should not be empty").not().isEmpty(),
    check("languages", "Input at least one language").isArray().not().isEmpty(),
    check("role", "Assign a role for yourself").not().isEmpty(),
  ],
  patchProfile
);

// Delete profile
router.delete("/", isAuth, deleteProfile);

router.post("/avatar", [isAuth, upload.single("avatar")], postAvatar);

module.exports = router;
