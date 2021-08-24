const db = require('../models');
const Users = db.users;
const Roles = db.roles;
const to = require('../helpers/getPromiseResult');
const GoogleStrategy = require('passport-google-oauth20');


// Strategy config
module.exports = (passport) => {
    passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.API_URL}auth/google/callback`
        },
        async (accessToken, refreshToken, profile, done) => {
            delete profile._json['id'];


            // Getting 'active' status id
            const status_id = await UsersStatuses.findOne({
                where: {
                    name_en: 'active'
                }, attributes: ['id']
            });

            const role_id = await Roles.findOne({
                where: {
                    name_en: 'Customer'
                },
                attributes: ['id']
            });


            let user = await to(Users.findOrCreate({
                    where: {
                        email: profile._json.email
                    },
                    defaults: {
                        first_name: profile._json.given_name,
                        last_name: profile._json.family_name,
                        status_id: status_id.toJSON()['id'],
                        role_id: role_id.toJSON()['id'],
                        access_token: accessToken
                    },
                    attributes: {exclude: ['role_id', 'status_id', 'access_token', 'id']},
                    include: [{model: Roles}]
                }).spread((item) => {
                    return item;
                    // return item.get({
                    //     plain: true
                    // });
                })
            );

            user = await Users.findOne({
                where: {
                    email: profile._json.email
                },
                attributes: {exclude: ['role_id', 'status_id', 'access_token', 'id']},
                include: [{model: Roles, attributes: ['id', 'name_en']}]
            });

            console.log('strategy!!!')
            // console.log(user.toJSON())
            done(null, user);
        }
    ));
};
