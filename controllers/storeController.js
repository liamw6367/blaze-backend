const db = require('../models');
const Stores = db.stores;

const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const hbs = require('nodemailer-express-handlebars');

const c = require('../config/constants');
const m = require('../config/multer');
const showIfErrors = require('../helpers/showIfErrors');
const generateMailOptions = require('../helpers/generateMailOptions');
const to = require('../helpers/getPromiseResult');

exports.add = async (req, res) => {
    let data = req.body;
    if (!showIfErrors(data)) {
        await to(Stores.create(data));
        this.sendStorePersonInvitationEmail(data);
        this.get(req, res);
    }
};

exports.get = async (req, res) => {
    const stores = await to(Stores.findAll({
        order: [
            ['id', 'DESC']
        ],
    }));
    res.json(stores);
};

exports.getOne = async (req, res) => {
    const stores = await to(Stores.findOne({
        where: {
            id: req.query.id
        }
    }));
    res.json(stores);
};

exports.update = async (req, res) => {
    let {id, ...data} = req.body;
    await to(Stores.update(data, {where: {id}}));
    res.json('OK');
};


exports.remove = async (req, res) => {
    let {id} = req.query;
    console.log('aaaaa')
    console.log(req.query)
    await to(Stores.destroy({where: {id}}));
    this.get(req, res);
};

exports.sendStorePersonInvitationEmail = async (data) => {


    let transporter = nodemailer.createTransport(c.NODEMAILER_TRANSPORT_SETTINGS);
    let jwtToken = jwt.sign({email: data.store_email_id}, 'secret', {expiresIn: 1200});

    // e-mail template settings
    transporter.use('compile', hbs(c.STORE_ADMIN_EMAIL_HBS_SETTINGS));

    // setup email data with unicode symbols
    let mailOptions = generateMailOptions(data.store_email_id, jwtToken, 'Store admin details',
        'store-admin-details', {email: data.store_email_id, password: data.password});
    console.log(data.store_email_id, mailOptions)

    // send mail with defined transport object
    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error.toString())
        } else if (info) {

            console.log('Message sent: %s', info.messageId);
        }
    });
};

