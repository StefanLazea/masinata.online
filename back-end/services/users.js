const User = require("../models").User;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const TOKEN_SECRET = require("../configuration.json").token_secret;


const register = async (res, credentials) => {
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
        User.create(user);
    } catch (err) {
        res.send(err);
        return;
    }

    res.status(201).send({ message: `User created` });
}

const authenticate = async (req, res) => {

    let userFound = await findUserByEmail(req.body.email);

    if (!userFound) {
        return res
            .status(404)
            .send({ message: "No email related to an account was found" });
    }

    const validPass = bcrypt.compareSync(req.body.password, userFound.password);
    if (!validPass) {
        return res.status(400).send({ message: "Wrong password" });
    }

    const token = jwt.sign({ id: userFound.id, role: userFound.role }, TOKEN_SECRET,
        {
            expiresIn: "30s"
        });

    res.cookie("refreshToken", token, { signed: true, httpOnly: true })
        .send({
            token: "Bearer " + token
            // refreshToken: "Bearer " + refreshToken
        });
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
    authenticate,
    findUserByEmail
}