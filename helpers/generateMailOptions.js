module.exports = (email, jwtToken, subject, template, context) => {
    return {
        from: process.env.NODEMAILER_FROM_DETAILS,
        to: email,
        subject,
        context,
        template
    };
};
