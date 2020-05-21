const bcrypt = require("bcryptjs");
const UserService = require("../services/users");
const TokenService = require("../services/token");
const { validateUser } = require("../helpers/validation/user");
const { findUserByEmail } = require("../services/users");

const register = async (req, res) => {
    let isPaperAdmin = req.body.isPaperAdmin;
    let credentials = {
        email: req.body.email,
        password: req.body.password,
        repeat_password: req.body.repeat_password,
        companyName: req.body.companyName,
    };

    let errors = validateUser(credentials, isPaperAdmin);
    if (errors) {
        return res.status(400).send({ message: errors })
    }

    UserService.register(res, credentials, isPaperAdmin);
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

    const token = TokenService.createToken(userFound);
    console.log(req.cookies)
    res.cookie("token", token, { secure: false, httpOnly: true })
        .send({
            token: "Bearer " + token
        });
};

module.exports = {
    login,
    register
}