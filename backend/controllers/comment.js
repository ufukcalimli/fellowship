module.exports.getAll = async (req, res, next) => {
  try {
    const comment = await Comment.find();

    res.json(comment);
    logger.http(`Request at [GET:/api/comment/]`);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Server error!");
  }
};

module.exports.getById = async (req, res, next) => {
  const commentId = req.params.id;
  try {
    const comment = await Comment.findById(commentId);

    if (!comment) return res.status(400).send("Comment is not found");

    res.json(comment);
    logger.http(
      `Request at [GET:/api/comment/:id] with comment id [${commentId}]`
    );
  } catch (error) {
    logger.error(error);
    res.status(500).send("Server error!");
  }
};

module.exports.getByProfile = async (req, res, next) => {
  const user_id = req.user._id;
  try {
    const profile = await Profile.findOne({ user: user_id });
    const comments = await Comment.find({ profile }).sort({ profile });

    if (!comments) return res.status(400).send("No comments by this profile");

    logger.http(
      `Request at [GET:/api/profile/:profile_id] with profile id [${profile_id}]`
    );
    res.json(comments);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Server error!");
  }
};

module.exports.getByPostId = async (req, res, next) => {
  const postId = req.params.post_id;
  try {
    const commentsByPostId = await Comment.find().sort({ post: postId });

    if (!commentsByPostId)
      return res.status(400).send("No comments of this post");

    res.json(commentsByPostId);
    logger.http(`Request at [GET:/api/post/:post_id] with post id [${postId}]`);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Server error!");
  }
};

module.exports.postComment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { content, post } = req.body;
  const user = req.user;
  try {
    const profile = await Profile.findOne({ user: user._id });

    const comment = await new Comment({
      content,
      profile,
      post,
    });

    await Post.findOneAndUpdate(
      { _id: post },
      { $push: { comments: comment } }
    );

    await comment.save();
    logger.info(`Comment [${comment._id}] created at [${req.ip}]`);

    res.json(comment);
    logger.http(`Request at [POST:/api/post/]`);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Server error!");
  }
};

module.exports.patchComment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const comment_id = req.params.id;
  const { content } = req.body;
  try {
    const comment = Comment.findById({ commentId });

    if (!comment) return res.status(400).send("Comment is not found");

    comment = Comment.findByIdAndUpdate(
      { _id: comment_id },
      {
        $set: {
          content,
        },
      }
    );

    await comment.save();
    logger.info(`Commment [${comment._id}] updated at [${req.ip}]`);

    res.json(comment);
    logger.http(`Request at [PATCH:/api/post/]`);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Server error!");
  }
};

module.exports.deleteComment = async (req, res, next) => {
  const comment_id = req.params.comment_id;
  try {
    const comment = await Comment.findOne({ _id: comment_id });

    if (!comment) return res.status(400).send("This comment does not exist");

    await Promise.all([
      await Post.findOneAndUpdate(
        { _id: comment.post.toString() },
        { $pull: { comments: comment_id } }
      ),
      await Comment.findOneAndDelete({ _id: comment_id }),
    ]);

    logger.info(`Comment [${comment._id}] removed at [${req.ip}]`);

    res.send("Comment is deleted");
    logger.http(`Request at [DELETE:/api/comment/]`);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Server error!");
  }
};
