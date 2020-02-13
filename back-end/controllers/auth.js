const Users = require("../models").Users;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findUserByUsername } = require("../controllers/users");

const login = async (req, res) => {
    let userFound = await findUserByUsername(req.body.username);

    if (!userFound) {
        return res
            .status(404)
            .send({ message: "No email related to an account was found" });
    }

    const validPass = bcrypt.compareSync(req.body.password, userFound.password);
    if (!validPass) {
        return res.status(400).send({ message: "Wrong password" });
    }

    const token = jwt.sign({ user: userFound.username }, process.env.TOKEN_SECRET,
        {
            expiresIn: "3h"
        });

    const refreshToken = jwt.sign({ user: userFound.username }, process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "3 days" }
    );

    res.cookie("refreshToken", refreshToken, { signed: true, httpOnly: true })
        .send({
            token: "Bearer " + token,
            refreshToken: "Bearer " + refreshToken
        });
};

module.exports = {
    login
}