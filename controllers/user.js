const User = require("../models/user");

async function getUser(req, res) {
  const id = req.params.id;
  const user = await User.findById(id);

  res.status(200);

  return res.json({
    data: user,
    message: "User details successfully retrieved",
  });
}

async function getAllUsers(req, res) {
  const users = await User.find();
  res.status(200);
  return res.json({
    data: users,
    message: "All users successfully retrieved",
  });
}

module.exports = {
  getUser,
  getAllUsers,
};
