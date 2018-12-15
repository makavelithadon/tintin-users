const { User } = require("./../models");
const api = require("./../api");

exports.getAll = async (req, res, next) => {
  const allUsers = await api.getAll(User);
  return res.send(allUsers);
};

exports.findById = async (req, res, next) => {
  try {
    const user = await api.findById(User, req.params.id);
    return res.send(user);
  } catch (error) {
    console.error("error");
    return res.status(204).send();
  }
};

exports.findOne = async (req, res, next) => {
  const user = await api.findOne(
    User,
    Object.entries(req.body).reduce((resource, [field, value]) => ({ ...resource, [field]: value }), {})
  );
  if (user) {
    return res.send(user);
  }
  return res.status(204).send();
};
