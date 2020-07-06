const express = require("express");
const { check, validationResult } = require("express-validator");

const logger = require("../config/logger");
const isAuth = require("../config/isAuth");

const router = express.Router();

const {
  getAll,
  getById,
  patchUser,
  deleteUser,
} = require("../controllers/user");

const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const profile = require("../models/profile");

// Get all users
router.get("/", isAuth, getAll);

// Get user by id
router.get("/:id", isAuth, getById);

// Update user
router.patch(
  "/:id",
  [
    isAuth,
    check("name", "User name is required!").not().isEmpty(),
    check("email", "User email is required!").isEmail(),
  ],
  patchUser
);

// Delete user
router.delete("/:id", isAuth, deleteUser);

module.exports = router;
