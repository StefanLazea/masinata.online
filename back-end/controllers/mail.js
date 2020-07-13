const MailService = require('../services/mail');

const sendForgotPasswordEmail = async (req, res) => {
    const email = req.body.email;

    MailService.sendRenewPassword(email).then(resp => {
        if (resp) {
            res.status(200).send({ message: resp });
        }
    });
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
        MailService.sendExpirationMail(body).then(resp => {
            if (resp) {
                res.status(200).send({ message: resp });
            }
        });
    }
}

module.exports = {
    sendForgotPasswordEmail,
    sendPaperExpirationEmail,
}
