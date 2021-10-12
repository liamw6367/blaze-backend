const db = require('../models');
const Users = db.users;
const UserRoles = db.user_roles;

exports.getRoles = async (req, res) => {
    let roles = await UserRoles.findAll({});
    res.json(roles);
};

exports.getUsersByRole = async(req,res) =>{
    let {role_id} = req.query;
    let roles = await Users.findAll({where: {role_id}, attributes: ['first_name','last_name','email','phone']});
    res.json(roles);
};