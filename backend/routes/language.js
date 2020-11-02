const express = require("express");
const { check, validationResult } = require("express-validator");

const logger = require("../config/logger");
const isAuth = require("../config/isAuth");

const {
  getAll,
  getByLanguage,
  postLanguage,
  patchLanguage,
  deleteLanguage,
} = require("../controllers/language");

const router = express.Router();

const Language = require("../models/language");

// Get languages
router.get("/", getAll);

// Get language by name
router.get("/:lang", getByLanguage);

// Post language
router.post(
  "/",
  [isAuth, check("title", "Title should not be empty").not().isEmpty()],
  postLanguage
);

// Patch language
router.patch(
  "/",
  [isAuth, check("title", "Title should not be empty").not().isEmpty()],
  patchLanguage
);

// Delete language
router.delete("/", isAuth, deleteLanguage);

module.exports = router;
