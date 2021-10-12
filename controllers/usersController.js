const db = require('../models');
const Users = db.users;
const UserRoles = db.user_roles;

exports.getRoles = async (req, res) => {
    let roles = await UserRoles.findAll({});
    res.json(roles);
};