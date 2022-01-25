const db = require('../models');
const Users = db.users;
const UserStatuses = db.user_statuses;
const UserRoles = db.user_roles;
const AccountVerifications = db.account_verifications;
const ForgotPassTokens = db.forgot_pass_tokens;
const DeliveryDetails = db.delivery_details;

const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const hbs = require('nodemailer-express-handlebars');
const bcrypt = require('bcryptjs');
const sequelize = require('sequelize');

const c = require('../config/constants');
const m = require('../config/multer');
const showIfErrors = require('../helpers/showIfErrors');
const generateMailOptions = require('../helpers/generateMailOptions');
const to = require('../helpers/getPromiseResult');

exports.sendVerificationCode = async (req, res) => {
    let {email, gender, ...data} = req.body;

    m.uploadAvatar(req, res, async (err) => {

        // Gets file type validation error
        if (req.fileTypeError) {
            res.status(423).json(req.fileTypeError);
        }

        // Getting multer errors if any
        else if (err) res.status(423).json(err);

        // If file validation passed, heading to the request data validation
        else {

            if (!showIfErrors(req, res)) {
                let transporter = nodemailer.createTransport(c.NODEMAILER_TRANSPORT_SETTINGS);
                let jwtToken = jwt.sign({email}, 'secret', {expiresIn: 1200});
                gender = +(gender === 'female');

                await this.saveToken(jwtToken, {email});
                // this.register(data, {email, gender});

                // e-mail template settings
                transporter.use('compile', hbs(c.EMAIL_HBS_SETTINGS));

                // setup email data with unicode symbols
                let mailOptions = generateMailOptions(email, jwtToken, 'Account verification code',
                    'verification', {verificationLink: `${process.env.FRONTEND_URL}/auth/account-verification?email=${email}&token=${jwtToken}`});

                // send mail with defined transport object
                await transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        res.status(500).json({msg: error.toString()})
                    } else if (info) {

                        console.log('Message sent: %s', info.messageId);
                        res.json(jwtToken);
                    }
                });
            }
        }
    })
};

exports.saveToken = async (jwtToken, email) => {
    let found = await AccountVerifications.findOne({where: email});

    if (found) {
        await AccountVerifications.update({secret: jwtToken}, {where: email});
    } else {
        await AccountVerifications.create({...email, secret: jwtToken});
    }
};

exports.verifyCode = async (req, res) => {
    const {token, email} = req.body;


    let user = await Users.findOne({where: {email}, attributes: ['password', 'id']});

    if (user) {
        let s = await ForgotPassTokens.findOne({where: {user_id: user.id}});
        console.log(s.token, token)
        let verified = s?.token === token;

        if (verified) {
            //     let status = await UserStatuses.findOne({where: {name: 'active'}});

            // let user = await Users.findOne({where: {email}, attributes: ['password', 'id']});
            user.isNewRecord = false;
            // user.set({status_id: status.id});
            await user.save();
            req.body.password = user.password;

            res.json('OK')

            // this.login(req, res);
        } else {
            res.status(500).json({msg: 'The code verification failed'});
        }
    } else {
        res.status(500).json({msg: 'A user with such email is not found'});
    }


};

exports.register = async (req, res) => {

    let data = req.body;

    if (!showIfErrors(req, res)) {
        // Saving the original password of user and hashing it to save in db
        let originalPass = data.password;
        data.password = bcrypt.hashSync(originalPass, 10);

        // Getting 'not-verified' status to assign it to the user
        let status = await UserStatuses.findOne({where: {name: 'not verified'}});

        await Users.create(data);

        this.login(req, res);
    }

};

exports.login = async (req, res) => {

    if (!showIfErrors(req, res)) {

        let {email} = req.body;
        let attributes = ['id', `first_name`, `last_name`, 'username', 'email', 'birthday', 'avatar', 'phone', 'address', 'status_id', 'verified'];

        // Active status selecting
        let statusWhere = sequelize.where(sequelize.col('`user_status`.`name`'), 'active');

        // Selecting an employee that has an email matching request one
        let user = await to(Users.findOne({
            attributes: attributes,
            // include: [{model: UserStatuses, attributes: ['name'], where: statusWhere}],
            include: [
                {model: UserRoles, attributes: ['name', 'id']},
                {model: DeliveryDetails, as: 'delivery_addresses'}
                ],
            where: {email}
        }), res);

        if (!res.headersSent) {


            // User is not active
            if (!user) res.status(500).json({msg: 'You don\'t have such privileges or the account is inactive'});

            else {
                res.status(200).json({
                    token: jwt.sign(user.toJSON(), 'secretkey', {expiresIn: '8h'}),
                    full_name: `${user.first_name} ${user.last_name}`
                })
            }
        }
    }
};

exports.sendForgotPassEmail = async (req, res) => {
    if (!showIfErrors(req, res)) {

        let {email} = req.body;
        let user = await Users.findOne({where: {email}, attributes: ['email', 'id']});
        let transporter = nodemailer.createTransport(c.NODEMAILER_TRANSPORT_SETTINGS);

        console.log(c.NODEMAILER_TRANSPORT_SETTINGS)

        // let jwtToken = jwt.sign({email}, 'secret', {expiresIn: 1200});
        let code = Math.floor(100000 + Math.random() * 900000);

        this.saveForgotPassToken(code, {user_id: user.id});

        // e-mail template settings
        transporter.use('compile', hbs(c.FORGOT_PASS_EMAIL_HBS_SETTINGS));

        // setup email data with unicode symbols
        let mailOptions = generateMailOptions(email, code, 'Reset password',
            'forgot-password', {code});
        console.log(mailOptions)

        // send mail with defined transport object
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).json({msg: error.toString()})
            } else if (info) {

                console.log('Message sent: %s', info.messageId);
                res.json(code);
            }
        });

        // res.json(code)

    }
};

exports.saveForgotPassToken = async (jwtToken, user_id) => {
    let found = await ForgotPassTokens.findOne({where: user_id});

    if (found) {
        await ForgotPassTokens.update({token: jwtToken}, {where: user_id});
    } else {
        await ForgotPassTokens.create({...user_id, token: jwtToken});
    }
};

exports.resetPassword = async (req, res) => {
    let data = req.body;
    let newPassword = data.password;
    if (!showIfErrors(req, res)) {
        data.password = bcrypt.hashSync(newPassword, 10);

        await to(Users.update({password: data.password}, {where: {email: data.email}}), res);
        this.login(req, res);
    }
};
