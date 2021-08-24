const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validateRegister = require('../validators/validateRegister');
const validateLogin = require('../validators/validateLogin');
const validateVerificationCode = require('../validators/validateVerificationCode');
const validateResetPass = require('../validators/validateResetPass');
const u = require('../config/multer');
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.post('/send-verification-code', u.uploadAvatar, validateRegister.rules, authController.sendVerificationCode);
router.post('/verify-code', validateVerificationCode.rules, authController.verifyCode);
router.post('/send-forgot-pass-email', authController.sendForgotPassEmail);
router.post('/reset-password', validateResetPass.rules, authController.resetPassword);
router.post('/login', validateLogin.rules, authController.login);


// Passport.js Google auth routes
router.get('/google', passport.authenticate('google', {session: false, scope: ['profile', 'email']}));
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/login',
    scope: ['email', 'openid', 'profile'],
    session: false
}), (req, res) => {
    let token = jwt.sign(req.user.toJSON(), 'secretkey', {expiresIn: '8h'});
    console.log(`${process.env.FRONTEND_URL}/?token=${token}`);
    console.log('token!!!!!')
    console.log(token)
    res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
});


module.exports = router;
