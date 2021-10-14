const db = require('../models');
const Users = db.users;
const UserRoles = db.user_roles;
const m = require('../config/multer');

exports.getRoles = async (req, res) => {
    let roles = await UserRoles.findAll({});
    res.json(roles);
};

exports.getUsersByRole = async (req, res) => {
    let {role_id} = req.query;
    let where = role_id ? {role_id} : {};
    let users = await Users.findAll({where, attributes: ['first_name', 'last_name', 'email', 'phone']});
    res.json(users);
};

exports.updateProfile = async (req, res) => {
    const {id, ...data} = req.body;

    m.uploadAvatar(req, res, async (err) => {

        let newPassword = data.password;
        // data.password = bcrypt.hashSync(newPassword, 10);
        await Users.update(data, {where: {id: id}});

        res.json('OK')
        // await this.changeJwt({id: id, ...data}, res);

    });
};

exports.updateDriverDetails = async (req, res) => {
    let {license, paper, id} = req.body;
    m.uploadLicensePaper(req, res, async (err) => {
        await Users.update({license, paper}, {where: {id}});
        res.json('OK')
    });
};