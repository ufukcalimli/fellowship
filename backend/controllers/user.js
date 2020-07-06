module.exports.getAll = async (req, res, next) => {
  try {
    const users = await User.find();

    res.json(users);
    logger.http("Request at [GET:/api/user/]");
  } catch (error) {
    logger.error(error);
    res.status(500).send("Server error!");
  }
};

module.exports.getById = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findOne({ _id: userId });

    if (!user) return res.status(400).json({ msg: "User is not found" });

    res.json(user);
    logger.http(`Request at [GET:/api/user/:id] with user id [${userId}]`);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Server error!");
  }
};

module.exports.patchUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userId = req.params.id;
  const { name, email } = req.body;
  try {
    let user = await User.findById(userId).select("-password");

    if (!user) return res.status(400).send("User is not found");

    user = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          name,
          email,
        },
      },
      { new: true }
    );

    await user.save();
    logger.info(`User [${user._id}] updated at [${req.ip}]`);

    res.json(user);
    logger.http(`Request at [PATCH:/api/user/:id] with user id [${userId}]`);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Server error!");
  }
};

module.exports.deleteUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findById({ _id: userId });

    if (!user) return res.status(400).send("User is not found");

    await Promise.all([
      await Comment.deleteMany({ user: userId }),
      await Post.deleteMany({ user: userId }),
      await profile.findOneAndDelete({ user: userId }),
      await User.findOneAndDelete({ _id: userId }),
    ]);

    logger.info(`User [${user._id}] removed at [${req.ip}]`);

    res.json({ msg: "User deleted" });
    logger.http(`Request at [DELETE:/api/user/:id] with user id [${userId}]`);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Server error!");
  }
};
