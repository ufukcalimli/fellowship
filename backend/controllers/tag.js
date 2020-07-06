module.exports.getAll = async (req, res, next) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
    logger.http(`Request at [GET:/api/tag/]`);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Server error!");
  }
};

module.exports.getByTag = async (req, res, next) => {
  const tagName = req.params.tag;
  try {
    const tag = await Tag.findOne({ title: tagName });

    if (!tag) return res.status(400).send("Tag is not found");

    res.json(tag);
    logger.http(`Request at [GET:/api/tag/:tag] with tag name [${tagName}]`);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Server error!");
  }
};

module.exports.getPostsByTagName = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(400).json({ errors: errors.array() });
  }

  const tagName = req.params.tag;
  try {
    const postsByTag = await Tag.findOne({ title: tagName }).populate("posts");

    if (!postsByTag) return res.status(400).send("No posts by this tag name");

    res.json(postsByTag);
    logger.http(
      `Request at [GET:/api/tag/:tag/posts] with tag name [${tagName}]`
    );
  } catch (error) {
    logger.error(error);
    res.status(500).send("Server error!");
  }
};

module.exports.postTag = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title } = req.body;
  try {
    let tag = await Tag.findOne({ title });

    if (tag) return res.status(400).send("Tag is already exists");

    tag = await new Tag({ title });

    await tag.save();
    logger.info(`Tag [${tag._id}] created at [${req.ip}]`);

    res.json(tag);
    logger.http(`Request at [POST:/api/tag/]`);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Server error!");
  }
};

module.exports.followTag = async (req, res, next) => {
  const { tag } = req.params;
  const user_id = req.user._id;
  try {
    const dbTag = await Tag.findOne({ title: tag.toLowerCase() });
    let profile = await Profile.findOne({ user: user_id });

    if (!dbTag || !profile) {
      return res
        .status(400)
        .send(
          "An error occurred while following the tag by the user, check parameters"
        );
    }

    profile = await Profile.findOneAndUpdate(
      { user: user_id },
      { $addToSet: { tags: dbTag } },
      { new: true }
    );

    logger.info(`Tag [${tag._id}] followed by [${profile._id}] at [${req.ip}]`);
    res.json(profile);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Server error!");
  }
};

module.exports.unfollowTag = async (req, res, next) => {
  const { tag } = req.params;
  const user_id = req.user._id;
  try {
    const dbTag = await Tag.findOne({ title: tag.toLowerCase() });
    let profile = await Profile.findOne({ user: user_id });

    if (!dbTag || !profile) {
      return res
        .status(400)
        .send(
          "An error occurred while unfollowing the tag by the user, check parameters"
        );
    }

    profile = await Profile.findOneAndUpdate(
      { user: user_id },
      { $pull: { tags: { _id: dbTag } } },
      { new: true }
    );

    res.json(profile);
    logger.http(
      `Request at [GET:/api/tag/follow/:tag/:user_id] with tag [${tag}] and user id [${user_id}]`
    );
  } catch (error) {
    logger.error(error);
    res.status(500).send("Server error!");
  }
};

module.exports.deleteTag = async (req, res, next) => {
  const tagName = req.params.tag;
  try {
    const tag = await Tag.findOne({ title: tagName });

    if (!tag) return res.status(400).send("This tag does not exist");

    await Tag.findOneAndDelete({ title: tagName });
    logger.info(`Tag [${tagName}] removed at [${req.ip}]`);

    res.send("Tag is deleted");
    logger.http(`Request at [DELETE:/api/tag/]`);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Server error!");
  }
};
