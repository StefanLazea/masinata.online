const dotenv = require('dotenv');
dotenv.config();
const API_KEY = process.env.MAILGUN_API_KEY;
const DOMAIN = process.env.MAILGUN_DOMAIN;
var mailgun = require('mailgun-js')({ apiKey: API_KEY, domain: DOMAIN });


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
        '<p>Salut, ' + mailProps.email + '</p>' +
        '<p><br /> Ai cerut resetarea parolei. Pentru a face lucrul acesta, apasa pe urmatorul link:</p>' +
        '<p><a href="' + mailProps.url + 'style="color:blue;font-size:12px;">' + mailProps.url + '</p>' +
        '<p>Link-ul expira intr-o ora.</p><p> </p><p>Multumim,</p><p>Echipa MasinaMea.online</p></td></tr>' +
        '<tr><td>' +
        '<div align="center" style="font-size:12px; margin-top:20px; padding:5px; width:100%; background:#eee;"> © 2020 ' +
        '<a href="http://masinamea.online" target="_blank" style="color:#333; text-decoration: none;">masinamea.online</a></div></td></tr>' +
        '</table></div></body></html>'

    return mail;
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

const sendRenewPassword = async (body) => {
    let data = { email: body, url: 'https://masinamea.online' }
    let emailData = generateResetPasswordContent(data);

    const resetData = {
        from: "lazeastefan97@gmail.com",
        to: data.email,
        subject: "Reset password",
        test: JSON.stringify(data),
        html: emailData
    }

    try {
        let result = await mailgun.messages().send(resetData);
        return result.message;
    } catch (err) {
        return false;
    }
}

const notifyExpirationMailTemplate = (mailProps) => {

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
        '<p>Buna, ' + mailProps.lastname + '</p>' +
        '<p><br /> Se pare ca documentul ' + mailProps.paperType + ' va expira in curand.</p>' +
        '<p>Contacteaza administratorul tau de garaj pentru a putea face reinnoirea.</p><p>' +
        '<p>Datele administratorului:</p>' +
        '<div style="margin-left:10%;">' +
        '<p>Email: ' + mailProps.adminEmail + '</p>' +
        '<p>Telefon: ' + mailProps.telephone + '</p><br/></div>' +
        '</p><p>Multumim,</p><p>Echipa MasinaMea.online</p></td></tr>' +
        '<tr><td>' +
        '<div align="center" style="font-size:12px; margin-top:20px; padding:5px; width:100%; background:#eee;"> © 2020 ' +
        '<a href="http://masinamea.online" target="_blank" style="color:#333; text-decoration: none;">masinamea.online</a></div></td></tr>' +
        '</table></div></body></html>'

    return mail;
}

const sendExpirationMail = async (reqBody) => {
    let emailData = notifyExpirationMailTemplate(reqBody);

    const resetData = {
        from: "lazeastefan97@gmail.com",
        to: reqBody.email,
        subject: "Notificare expirare act pentru " + reqBody.licencePlate,
        test: JSON.stringify(reqBody),
        html: emailData
    }

    try {
        let result = await mailgun.messages().send(resetData);
        return result.message;
    } catch (err) {
        return false;
    }
}

module.exports = {
    sendRegistrationEmail,
    sendRenewPassword,
    sendExpirationMail,
}
