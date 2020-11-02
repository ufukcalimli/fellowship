module.exports.getAll = async (req, res, next) => {
  try {
    const languages = await Language.find();
    res.json(languages);
    logger.http(`Request at [GET:/api/language/]`);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Server error!");
  }
};

module.exports.getByLanguage = async (req, res, next) => {
  const lang = req.params.lang;
  try {
    const language = await Language.findOne({ title: lang });

    if (!language) {
      return res.status(400).send("Language is not found");
    }

    res.json(language);
    logger.http(`Request at [GET:/api/language/:lang] with language [${lang}]`);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Server error!");
  }
};

module.exports.postLanguage = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title } = req.body;
  try {
    let language = await Language.findOne({ title });
    if (language) {
      return res.status(400).send("Language is already exists");
    }

    language = await new Language({ title });

    await language.save();
    logger.info(`Language [${language._id}] created at [${req.ip}]`);

    res.json(language);
    logger.http(`Request at [POST:/api/language/]`);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Server error!");
  }
};

module.exports.patchLanguage = async (req, res, next) => {
  const { title } = req.body;
  try {
    let language = await Language.findOne({ title: title });

    if (!language) {
      return res.status(400).send("Language does not exist");
    }

    language = await Language.findOneAndUpdate({ title }, { $set: { title } });

    await language.save();
    logger.info(`Language [${language._id}] updated at [${req.ip}]`);

    res.json(language);
    logger.http(
      `Request at [PATCH:/api/language/] with language [${language.title}]`
    );
  } catch (error) {
    logger.error(error);
    res.status(500).send("Server error!");
  }
};

module.exports.deleteLanguage = async (req, res, next) => {
  const title = req.body.title;
  try {
    const language = await Language.findOne({ title });

    if (!language) {
      return res.status(400).send("Language does not exists");
    }

    await Language.findOneAndDelete({ title });
    logger.info(`Language [${language._id}] removed at [${req.ip}]`);

    res.send("Language is deleted");
    logger.http(`Request at [DELETE:/api/language/]`);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Server error!");
  }
};
