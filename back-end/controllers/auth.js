const Users = require("../models").Users;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findUserByEmail } = require("../controllers/users");
const TOKEN_SECRET = require("../configuration.json").token_secret;
const REFRESH_TOKEN_SECRET = require("../configuration.json").refresh_token;

const register = async (req, res) => {
    let userFound = await findUserByEmail(req.body.email);

    if (userFound) {
        res.status(409).send({ message: "User exists..." });
        return;
    }

    const salt = bcrypt.genSaltSync(10);
    ePassword = bcrypt.hashSync(req.body.password, salt);

    let user = {
        email: req.body.email,
        password: ePassword
    }
    try {
        Users.create(user);
    } catch (err) {
        res.send(err);
        return;
    }

    res.status(201).send({ message: `User created` });
};

const login = async (req, res) => {
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

    const token = jwt.sign({ user: userFound.id }, TOKEN_SECRET,
        {
            expiresIn: "3h"
        });

    const refreshToken = jwt.sign({ user: userFound.id }, REFRESH_TOKEN_SECRET,
        { expiresIn: "3 days" }
    );

    res.cookie("refreshToken", refreshToken, { signed: true, httpOnly: true })
        .send({
            token: "Bearer " + token,
            refreshToken: "Bearer " + refreshToken
        });
};

module.exports = {
    login,
    register
}