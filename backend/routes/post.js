const express = require("express");
const { check, validationResult } = require("express-validator");
const multer = require("multer");
const {
  multerStorage,
  fileFilter,
  limits,
} = require("../config/multerStorageConfig");

const router = express.Router();
const logger = require("../config/logger");
const isAuth = require("../config/isAuth");

const Post = require("../models/post");
const Comment = require("../models/comment");
const Profile = require("../models/profile");
const Tag = require("../models/tag");

const upload = multer({
  storage: multerStorage,
  fileFilter: fileFilter,
  limits: limits,
});

const {
  getAll,
  getById,
  postPost,
  patchPost,
  deletePost,
} = require("../controllers/post");

// Get all posts
router.get("/", getAll);

// Get post by post id
router.get("/:id", getById);

// Post post
router.post(
  "/",
  [
    upload.single("postImage"),
    isAuth,
    check("title", "Post title should not be empty").not().isEmpty(),
    check("content", "Post content should not be empty").not().isEmpty(),
  ],
  postPost
);

// Update post
router.patch(
  "/",
  [
    upload.single("postImage"),
    isAuth,
    check("title", "Post title should not be empty").not().isEmpty(),
    check("content", "Post content should not be empty").not().isEmpty(),
  ],
  patchPost
);

// Delete post
router.delete("/", isAuth, deletePost);

module.exports = router;
