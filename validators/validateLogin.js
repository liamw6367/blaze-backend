const {body} = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../models');
const Users = db.users;

const rules = [
    body('email').not().isEmpty().withMessage('E-mail is required').isEmail().withMessage('E-mail is invalid'),
    // body('password', '').not().isEmpty(),
    body().custom(async (req) => {
        let email = req.email;
        let pass = req.password;


        if (!pass) {
            throw new Error('Password is required');
        }

        // Checking email existence & passwords match
        let found = await Users.findOne({attributes: ['email', 'password'], where: {email: email}});


        // This case is for the users that signed up via social medias, and (accidentally) want to login regularly
        if (!found || !found.password) throw new Error('Invalid password or email');

        // Checking passwords match
        let match = await bcrypt.compare(pass, found.password);
        if (!match) throw new Error('Wrong password')


    })
];

module.exports = {
    rules
};
