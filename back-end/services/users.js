const User = require("../models").User;
const bcrypt = require("bcryptjs");
const MailService = require("../services/mail");
const Role = require("../helpers/role");
const dotenv = require('dotenv');
dotenv.config();

const register = async (res, credentials, isPaperAdmin) => {
    let userFound = await findUserByEmail(credentials.email);

    if (userFound) {
        res.status(409).send({ message: "User exists..." });
        return;
    }

    const salt = bcrypt.genSaltSync(10);
    ePassword = bcrypt.hashSync(credentials.password, salt);

    let user = {
        email: credentials.email,
        password: ePassword,
        role: isPaperAdmin ? Role.AppAdmin : Role.User,
        company_name: credentials.companyName
    }

    try {
        User.create(user);
        MailService.sendRegistrationEmail(user.email);
    } catch (err) {
        res.send(err);
        return;
    }

    res.status(201).send({ message: `User created` });
}

const findUserByEmail = async (email) => {
    let userFound;
    await User.findOne({
        where: {
            email: email
        }
    }).then((user) => userFound = user);

    return userFound;
}

module.exports = {
    register,
    findUserByEmail
}