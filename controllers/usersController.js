const db = require('../models');
const Users = db.users;
const UserRoles = db.user_roles;
const DeliveryDetails = db.delivery_details;
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
        where: {id: data.id}, include: [
            {model: UserRoles, attributes: ['name', 'id']},
            {model: DeliveryDetails, as: 'delivery_addresses'}
        ]
    });


    let full_name = user[`first_name`] + ' ' + user[`last_name`];
    let {
        password,
        ...details
    } = user.toJSON();
    // console.log(details)
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
    let {phone, user_id} = req.body;
    let code = generateCode(4);
    await to(Users.update({verification_code: code, verified: 1}, {where: {id: user_id}}));
    await to(sendSMS(code, phone));
    res.json('OK');
};

exports.activateProfile = async (req, res) => {
    let {verification_code, user_id} = req.body;
    let user = await Users.findOne({where: {id: user_id}, attributes: ['verification_code']});
    console.log(user?.verification_code, verification_code)
    if (+user?.verification_code === +verification_code) {
        await this.changeJwt({id: user_id, ...req.body}, res);
    } else {
        res.status(500).json('The code is wrong');
    }
};

exports.saveDeliveryDetails = async (req, res) => {
    let data = req.body;
    console.log(data)

    // let dt = await Users.findOne({
    //     where: {id: data.user_id},
    //     include: [
    //         {model: DeliveryDetails, as: 'delivery_addresses'}
    //     ]
    // });

    let found = await DeliveryDetails.findOne({where: {user_id: data.user_id}});

    if (!found) {
        let d = await DeliveryDetails.create(data);
    }
    else {
        await DeliveryDetails.update(data,{where: {user_id: data.user_id}});
    }
    await this.changeJwt({id: data.user_id, ...req.body}, res);


    // res.json(dt);
};