const express = require("express");
const { check, validationResult } = require("express-validator");

const logger = require("../config/logger");
const isAuth = require("../config/isAuth");

const router = express.Router();

const {
  getAll,
  getByTag,
  getPostsByTagName,
  postTag,
  followTag,
  unfollowTag,
  deleteTag,
} = require("../controllers/tag");

const Tag = require("../models/tag");
const Profile = require("../models/profile");

// Get tags
router.get("/", getAll);

// Get tag by name
router.get("/:tag", getByTag);

// Get all posts by tag name
router.get(
  "/:tag/posts",
  [check("title", "Title should not be empty").not().isEmpty()],
  getPostsByTagName
);

// Post tag
router.post(
  "/",
  [isAuth, check("title", "Title should not be empty").not().isEmpty()],
  postTag
);

// Follow tag
router.post("/follow/:tag/", isAuth, followTag);

// Unfollow tag
router.post("/unfollow/:tag", isAuth, unfollowTag);

// Delete tag
router.delete("/:tag", isAuth, deleteTag);

module.exports = router;
