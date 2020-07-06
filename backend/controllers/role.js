module.exports.getAll = async (req, res, next) => {
  try {
    const roles = await Role.find();

    res.json(roles);
    logger.http(`Request at [GET:/api/role/]`);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Server error!");
  }
};

module.exports.getByRole = async (req, res, next) => {
  const roleName = req.params.role;
  try {
    const role = await Role.findOne({ title: roleName });

    if (!role) return res.status(400).send("Role is not found");

    res.json(role);
    logger.http(`Request at [GET:/api/role/:role] with role [${roleName}]`);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Server error!");
  }
};

module.exports.postRole = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title } = req.body;
  try {
    let role = await Role.findOne({ title });

    if (role) return res.status(400).send("Role is already exists");

    role = new Role({ title });

    await role.save();
    logger.info(`Role [${role._id}] created at [${req.ip}]`);

    res.json(role);
    logger.http(`Request at [POST:/api/role/] with role [${title}]`);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Server error!");
  }
};

module.exports.deleteRole = async (req, res, next) => {
  const roleName = req.params.role;
  try {
    const role = await Role.findOne({ title: roleName });

    if (!role) return res.status(400).send("This role does not exist");

    await Role.findOneAndDelete({ title: roleName });

    res.send("Role is deleted");
    logger.http(`Request at [DELETE:/api/role/]`);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Server error!");
  }
};
