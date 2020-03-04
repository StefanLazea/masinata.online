const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserService = require("../services/users")
const { validateUser } = require("../helpers/validation/user");
const { findUserByEmail } = require("../services/users");
const TOKEN_SECRET = require("../configuration.json").token_secret;

const register = async (req, res) => {
    let credentials = {
        email: req.body.email,
        password: req.body.password,
        repeat_password: req.body.repeat_password
    };

    let errors = validateUser(credentials);
    if (errors) {
        return res.status(400).send({ message: errors })
    }

    UserService.register(res, credentials);
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

    const token = jwt.sign({ id: userFound.id, role: userFound.role }, TOKEN_SECRET,
        {
            expiresIn: "30s"
        });

    res.cookie("token", token, { signed: true, httpOnly: true })
        .send({
            token: "Bearer " + token
        });
};

module.exports = {
    login,
    register
}