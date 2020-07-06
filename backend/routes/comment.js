const express = require("express");
const { check, validationResult } = require("express-validator");

const logger = require("../config/logger");
const isAuth = require("../config/isAuth");

const router = express.Router();

const Comment = require("../models/comment");
const Post = require("../models/post");
const Profile = require("../models/profile");

const {
  getAll,
  getById,
  getByProfile,
  getByPostId,
  postComment,
  patchComment,
  deleteComment,
} = require("../controllers/comment");

// Get comments
router.get("/", getAll);

// Get comment by id
router.get("/:id", getById);

// Get all comments by user
router.get("/profile", getByProfile);

// Get all comment by post id
router.get("/post/:post_id", getByPostId);

// Post comment
router.post(
  "/",
  [
    isAuth,
    check("content", "Content of comment should not be empty!").not().isEmpty(),
  ],
  postComment
);

// Update comment
router.patch(
  "/",
  [
    isAuth,
    check("content", "Content of comment should not be empty!").not().isEmpty(),
  ],
  patchComment
);

// Delete comment
router.delete("/", isAuth, deleteComment);

module.exports = router;
