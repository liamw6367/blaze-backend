const db = require('../models');
const Users = db.users;
const UserRoles = db.user_roles;
const m = require('../config/multer');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateCode = require('../helpers/generateRandomCodeWithGivenLength');
const sendSMS = require('../helpers/sendSMS');
const to = require('../helpers/getPromiseResult');

exports.getRoles = async (req, res) => {
    let roles = await UserRoles.findAll({});
    res.json(roles);
};

exports.getUsersByRole = async (req, res) => {
    let {role_id} = req.query;
    let where = role_id ? {role_id} : {};
    let users = await Users.findAll({where});
    res.json(users);
};

exports.updateProfile = async (req, res) => {
    const {id, ...data} = req.body;

    m.uploadAvatar(req, res, async (err) => {
console.log(data)
        if (data.password) {
            let newPassword = data.password;
            data.password = bcrypt.hashSync(newPassword, 10);
        }
        await Users.update(data, {where: {id}});

        // res.json('OK')
        await this.changeJwt({id, ...data}, res);

    });
};

exports.updateDriverDetails = async (req, res) => {

    m.uploadLicensePaper(req, res, async (err) => {
        let {license, paper, user_id} = req.body;
        console.log('OK!!!!')
        console.log({license, paper}, user_id)
        await Users.update({license, paper}, {where: {id: user_id}});
        await this.changeJwt({id: user_id, ...req.body}, res);
        // res.json('OK')
    });
};

exports.changeJwt = async (data, res, ret = false) => {

    let user = await Users.findOne({
        where: {id: data.id}, include: []
    });


    let full_name = user[`first_name`] + ' ' + user[`last_name`];
    let {
        password,
        ...details
    } = user.toJSON();
    if (res) {
        res.json({
            token: jwt.sign(details, 'secretkey', {
                expiresIn: '8h'
            }),
            user_id: user.id,
            full_name
        })
    } else if (ret) {
        return jwt.sign(details, 'secretkey', {
            expiresIn: '8h'
        });
    }
};

exports.verifyPhone = async (req, res) => {
    let {phone} = req.body;
    console.log(req.body)
    let code = generateCode(6);
    await to(sendSMS(code, phone));
    res.json('OK');
};