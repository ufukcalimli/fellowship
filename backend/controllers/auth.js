module.exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, user_name } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    let profile = await Profile.findOne({ user_name });
    if (profile) {
      return res
        .status(400)
        .json({ msg: "Profile exists with this user name, please log in" });
    }

    user = await new User({
      email,
      password,
    });

    profile = await new Profile({
      user_name,
      user: user._id,
    });
    await profile.save();
    logger.info(`Profile [${profile._id}] created at [${req.ip}]`);

    // Password encryption
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
    });

    jwt.sign(
      payload,
      process.env.JWTSECRET,
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

    logger.http(`User [${user._id}] signed up at [${req.ip}]`);
    logger.info(`Profile [${profile._id}] created at [${req.ip}]`);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Server error!");
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials!" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWTSECRET,
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
    logger.http(`User [${user._id}] logged in at [${req.ip}]`);
  } catch (error) {
    res.status(500).send("Server error");
  }
};
