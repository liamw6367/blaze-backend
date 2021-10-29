const {TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_MY_PHONE_NUMBER} = process.env;
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

module.exports = (text, phone) => {
    console.log(TWILIO_MY_PHONE_NUMBER)
    return new Promise((resolve, reject) => {
        client.messages
            .create({
                body: text,
                from: TWILIO_MY_PHONE_NUMBER,
                to: phone,
            })
            .then((message) => {
                console.log(message)
                resolve('sms send successfully')
            })
            .catch((err) => {
                console.log(err)
                reject(err.message);
            });
    });
};