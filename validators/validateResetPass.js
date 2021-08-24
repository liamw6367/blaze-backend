// Express Validator
const {body} = require('express-validator');
const db = require('../models');
const Users = db.users;
const bcrypt = require('bcryptjs');

const rules = [
    body('email').not().isEmpty().withMessage('E-mail is required').isEmail().withMessage('E-mail is invalid'),
    body('password', 'Password is required').not().isEmpty(),
    body('confirm_password', 'Please confirm your password').not().isEmpty(),
    body().custom(async (req) => {
        let email = req.email;
        let pass = req.password;

        // Checking email existence & passwords match
        let found = await Users.findOne({where: {email}});
        if (!found) throw new Error('A user with such email doesn\'t exist');

        if (pass !== req.confirm_password) {
            throw new Error('Passwords don\'t match')
        }
    })
];

module.exports = {
    rules
};
