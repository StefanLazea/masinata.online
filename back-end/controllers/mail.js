const MailService = require('../services/mail');

const sendForgotPasswordEmail = async (req, res) => {
    const email = req.body.email;
    if (email.length) {
        MailService.sendRenewPassword(req.body.email)
    }
}

const sendPaperExpirationEmail = (req, res) => {
    const body = {
        email: req.body.email,
        paperType: req.body.paperType,
        lastname: req.body.lastname,
        licencePlate: req.body.licencePlate,
        adminEmail: req.body.adminEmail,
        telephone: req.body.telephone,
    }

    if (body.email.length) {
        MailService.sendExpirationMail(body)
    }
}

module.exports = {
    sendForgotPasswordEmail,
    sendPaperExpirationEmail,
}
