const Users = require("../models").Users;
const bcrypt = require("bcryptjs");
const { findUserByEmail } = require("../controllers/users");

const authenticate = async (res, credentials) => {
    let userFound = await findUserByEmail(credentials.email);

    if (userFound) {
        res.status(409).send({ message: "User exists..." });
        return;
    }

    const salt = bcrypt.genSaltSync(10);
    ePassword = bcrypt.hashSync(credentials.password, salt);

    let user = {
        email: credentials.email,
        password: ePassword
    }
    try {
        Users.create(user);
    } catch (err) {
        res.send(err);
        return;
    }

    res.status(201).send({ message: `User created` });
}

module.exports = {
    authenticate
}