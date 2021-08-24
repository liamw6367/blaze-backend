const path = require('path');
const emailTmplPath = path.join(__dirname, '../public/email_templates/')
module.exports = (tmplName) => {
    return {
        viewEngine: {
            extName: '.hbs',
            partialsDir: emailTmplPath,
            layoutsDir: emailTmplPath,
            defaultLayout: `${tmplName}.hbs`,
        },

        viewPath: emailTmplPath,
        extName: '.hbs',
    }
}
