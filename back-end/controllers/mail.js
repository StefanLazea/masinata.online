const dotenv = require('dotenv');
const API_KEY = process.env.MAILGUN_API_KEY;
const DOMAIN = process.env.MAILGUN_DOMAIN;
var mailgun = require('mailgun-js')({ apiKey: API_KEY, domain: DOMAIN });

var data = {
    from: 'lazeastefan97@gmail.com',
    to: 'lazeastefan@gmail.com',
    subject: 'Registration',
    template: "registration",
}

const sendRegisterEmail = async (req, res) => {
    mailgun.messages().send(data, function (error, body) {
        console.log(body);
    });
}
module.exports = {
    sendRegisterEmail
}
