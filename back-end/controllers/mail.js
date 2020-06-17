const dotenv = require('dotenv');
const { getUserId } = require("../services/token.js");
const API_KEY = process.env.MAILGUN_API_KEY;
const DOMAIN = process.env.MAILGUN_DOMAIN;
var mailgun = require('mailgun-js')({ apiKey: API_KEY, domain: DOMAIN });

var dataRegistration = {
    from: 'lazeastefan97@gmail.com',
    to: 'lazeastefan@gmail.com',
    subject: 'Registration',
    template: "registration",
}

const generateResetPasswordContent = function (mailProps) {

    const mail = '<html><body>' +
        '<div style="font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif;">' +
        '<table style="width: 100%;">' +
        '<tr> <td></td> <td bgcolor="#FFFFFF ">' +
        '<div style="padding: 15px; max-width: 600px;margin: 0 auto;display: block; border-radius: 0px;padding: 0px; border: 1px solid lightseagreen;">' +
        '<table style="width: 100%;background: #00b6e2 ;">' +
        '<tr><td></td><td></td><td></td></tr>' +
        '</table>' +
        '<table style="padding: 10px;font-size:14px; width:100%;"><tr>' +
        '<td style="padding:10px;font-size:14px; width:100%;">' +
        '<p>Hi,' + mailProps.lastname + '</p>' +
        '<p><br /> Ai cerut resetarea parolei. Pentru a face lucrul acesta, apasa pe urmatorul link:</p>' +
        '<p><a href="' + mailProps.url + 'style="color:blue;font-size:12px;">' + mailProps.url + '</p>' +
        '<p>Link-ul expira intr-o ora.</p><p> </p><p>Multumim,</p><p>Echipa MasinaMea.online</p></td></tr>' +
        '<tr><td>' +
        '<div align="center" style="font-size:12px; margin-top:20px; padding:5px; width:100%; background:#eee;"> © 2020 ' +
        '<a href="http://masinamea.online" target="_blank" style="color:#333; text-decoration: none;">masinamea.online</a></div></td></tr>' +
        '</table></div></body></html>'

    return mail;
}

const sendRegisterEmail = async (req, res) => {
    mailgun.messages().send(dataRegistration, function (error, body) {
        console.log(body);
    });
}

const sendForgotPasswordEmail = async (req, res) => {
    let data = { lastname: 'stefan', url: 'https://masinamea.online' }
    let emailData = generateResetPasswordContent(data);

    const resetData = {
        from: "lazeastefan97@gmail.com",
        to: "lazeastefan@gmail.com",
        subject: "Reset password",
        test: JSON.stringify(data),
        html: emailData
    }
    mailgun.messages().send(resetData, function (error, body) {
        console.log(body);
    });
}

const sendRegistrationEmail = (email) => {
    var dataRegistration = {
        from: 'lazeastefan97@gmail.com',
        to: email,
        subject: 'Registration',
        template: "registration",
    }

    mailgun.messages().send(dataRegistration, function (error, body) {
        console.log(body);
    });
}

module.exports = {
    sendRegisterEmail,
    sendForgotPasswordEmail,
    sendRegistrationEmail,
}