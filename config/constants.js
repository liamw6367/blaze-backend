const path = require('path');

const generateHbsSettings = require('../helpers/generateHbsSettings');

module.exports = {
    UPLOADS_FOLDER: path.join(__dirname, '../public/uploads'),
    EMAIL_HBS_SETTINGS: generateHbsSettings('verification'),
    FORGOT_PASS_EMAIL_HBS_SETTINGS: generateHbsSettings('forgot-password'),
    STORE_ADMIN_EMAIL_HBS_SETTINGS: generateHbsSettings('store-admin-details'),
    NODEMAILER_TRANSPORT_SETTINGS: {
        service: process.env.NODEMAILER_SERVICE,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS
        }
    },
    UPLOAD_MAX_FILE_SIZE: 2 * 1024 * 1024,
};


