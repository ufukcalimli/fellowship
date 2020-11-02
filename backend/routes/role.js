const express = require("express");
const { check, validationResult } = require("express-validator");

const logger = require("../config/logger");
const isAuth = require("../config/isAuth");

const router = express.Router();

const {
  getAll,
  getByRole,
  postRole,
  deleteRole,
} = require("../controllers/role");

const Role = require("../models/role");

// Get roles
router.get("/", isAuth, getAll);

// Get role by name
router.get("/:role", isAuth, getByRole);

// Post role
router.post(
  "/",
  [isAuth, check("title", "Title should not be empty!").not().isEmpty()],
  postRole
);

// Delete role
router.delete("/", isAuth, deleteRole);

module.exports = router;
