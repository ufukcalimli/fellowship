module.exports.getAll = async (req, res, next) => {
  try {
    const posts = await Post.find().populate(["comment", "tag"]);

    res.json(posts);
    logger.http(`Request at [GET:/api/post/]`);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Server error!");
  }
};

module.exports.getById = async (req, res, next) => {
  const postId = req.params.id;
  try {
    const post = await Post.findById({ _id: postId }).populate([
      "comment",
      "tag",
    ]);

    if (!post) return res.status(400).send("Post not found!");

    res.json(post);
    logger.http(`Request at [GET:/api/post/:id] with post id [${postId}]`);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Server error!");
  }
};

// Being used by post and patch
const filterTags = (db, reqTags) => {
  return db.filter((item) => reqTags.includes(item.title));
};

module.exports.postPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, content, user, label, tags } = req.body;

  try {
    const tagsFromDb = await Tag.find();
    const filteredTags = filterTags(tagsFromDb, tags);

    const newPost = await new Post({
      title,
      content,
      creator: user,
      label,
      tags: filteredTags,
      post_image_path: req.file.path,
    });

    // add the post to profile's posts array
    await Profile.findOneAndUpdate(
      { user: user },
      { $push: { posts: newPost } },
      { new: true }
    );

    // iterate given tags and append them in new post's tags array and save the post in the tag model as well
    if (filteredTags && filteredTags.length > 0) {
      filteredTags.map(async (tag) => {
        await Tag.findOneAndUpdate(
          { title: tag },
          { $push: { posts: newPost._id } }
        );
      });
    }

    await newPost.save();
    logger.info(`Post [${newPost._id}] created at [${req.ip}]`);

    res.json(newPost);
    logger.http(`Request at [POST:/api/post/]`);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Server error!");
  }
};

module.exports.patchPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const postId = req.params.id;
  const { title, content, user_name, label, tags } = req.body;
  try {
    let post = await Post.findById(postId);

    if (!post) return res.status(400).send("Post is not found");

    const tagsFromDb = await Tag.find();
    const filteredTags = filterTags(tagsFromDb, tags);

    post = await Post.findOneAndUpdate(
      { _id: postId },
      {
        $set: {
          title,
          content,
          tags: filteredTags,
          user_name,
          label,
          post_image_path: req.file.path,
        },
      },
      { new: true }
    );

    // iterate given tags and append them in new post's tags array and save the post in the tag model as well
    if (filteredTags && filteredTags.length > 0) {
      filteredTags.map(async (tag) => {
        await Tag.findOneAndUpdate(
          { title: tag },
          { $push: { posts: post._id } }
        );
      });
    }

    const profile = await Profile.findOneAndUpdate(
      { user_name },
      { $push: { posts: post._id } }
    );

    await profile.save();
    await post.save();

    logger.info(`Post [${post._id}] updated at [${req.ip}]`);

    res.json(post);
    logger.http(`Request at [PATCH:/api/post/]`);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Server error!");
  }
};

module.exports.deletePost = async (req, res, next) => {
  const postId = req.params.id;
  try {
    const post = await Post.findById({ _id: postId });

    if (!post) return res.status(400).send("Post is not found");

    await Promise.all([
      await Comment.deleteMany({ post: postId }),
      await Profile.findOneAndUpdate(
        { user_name },
        { $pull: { posts: post._id } }
      ),
      await Post.findOneAndDelete({ _id: postId }),
    ]);

    logger.info(`Post [${postId._id}] removed at [${req.ip}]`);

    res.json({ msg: "Post deleted" });
    logger.http(`Request at [DELETE:/api/post/]`);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Server error!");
  }
};