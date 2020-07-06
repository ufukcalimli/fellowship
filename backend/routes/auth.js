const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const logger = require("../config/logger");
const router = express.Router();

const { login, signup } = require("../controllers/auth");

const User = require("../models/user");

// Post user
router.post(
  "/signup",
  [
    check("user_name", "User name is required!").not().isEmpty(),
    check("email", "User email is required!").isEmail(),
    check(
      "password",
      "Password should contain minimum 6 characters!"
    ).isLength({ min: 6 }),
  ],
  signup
);

router.post(
  "/login",
  [
    check("email", "Email is required!").isEmail(),
    check("password", "Password should contain 6 characters").isLength({
      min: 6,
    }),
    passport.authenticate("local", {
      successRedirect: "/api/auth/passport/success",
      failureRedirect: "/login",
      failureFlash: true,
    }),
  ],
  login
);

router.get("/passport/success", (req, res, next) => {
  res.send(`passport success, user: ${req.user}`);
});

module.exports = router;
