const to = require('../helpers/getPromiseResult');
const db = require('../models');
const Users = db.users;
const FacebookStrategy = require('passport-facebook').Strategy;

// Strategy config
module.exports = (passport) => {
    passport.use(new FacebookStrategy({
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: `${process.env.API_URL}auth/facebook/callback`,
            profileFields: ['id', 'emails', 'name']
        },
        async (accessToken, refreshToken, profile, cb) => {
            delete profile._json['id'];
            // console.log(profile._json)


            let user = await to(Users.findOrCreate({
                    where: {
                        email: profile._json.email
                    },
                    defaults: {
                        first_name: profile._json.first_name,
                        last_name: profile._json.last_name,
                        access_token: accessToken
                    },

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

            // console.log(user)
            cb(null, user);
        }
    ));
};
