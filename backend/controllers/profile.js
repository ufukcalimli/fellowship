module.exports.getAll = async (req, res, next) => {
  try {
    const profiles = await Profile.find();

    res.json(profiles);
    logger.http(`Request at [GET:/api/profile/]`);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Server error!");
  }
};

module.exports.getByUserName = async (req, res, next) => {
  const userName = req.params.user_name;
  try {
    const profile = await Profile.findOne({ user_name: userName });

    if (!profile) {
      return res.status(400).send("Profile is not found");
    }

    res.json(profile);
    logger.http(
      `Request at [GET:/api/profile/:user_name] with user name [${userName}]`
    );
  } catch (error) {
    logger.error(error);
    res.status(500).send("Server error!");
  }
};

module.exports.patchProfile = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { user_name, first_name, last_name, languages, role } = req.body;
  try {
    let profile = await Profile.findOne({ user_name });

    if (!profile) {
      return res.status(400).send("Profile is not found!");
    }

    const dbLanguages = await Language.find();
    const filteredLangs = dbLanguages.filter((item) =>
      languages.includes(item.title)
    );

    const dbRole = await Role.findOne({ title: role });

    profile = await Profile.findOneAndUpdate(
      { user_name },
      {
        $set: {
          user_name,
          first_name,
          last_name,
          languages: filteredLangs,
          role: dbRole._id,
        },
      },
      { new: true }
    );

    await profile.save();
    logger.info(`Profile [${profile._id}] updated at [${req.ip}]`);

    res.json(profile);
    logger.http(`Request at [PATCH:/api/profile/]`);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Server error!");
  }
};

module.exports.deleteProfile = async (req, res, next) => {
  const user_name = req.body.user_name;
  try {
    await Profile.findOneAndRemove({ user_name });

    res.send("Profile removed");
    logger.info(`Profile [${profile._id}] removed at [${req.ip}]`);
    logger.http(`Request at [DELETE:/api/profile/]`);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Server error!");
  }
};

module.exports.postAvatar = async (req, res, next) => {
  // TODO: - check user in the request
  //       - use logger
  //       - check if auth user
  try {
    const profile = await Profile.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(400).send("Profile is not found!");
    }

    await Profile.findOneAndUpdate(
      { user: req.user._id },
      { $set: { avatar_path: req.file.path } },
      { new: true }
    );

    res.json(profile);

    res.json({ img: req.file });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error!");
  }
};
