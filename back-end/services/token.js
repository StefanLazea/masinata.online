const jwt = require("jsonwebtoken");
const TOKEN_SECRET = require("../configuration.json").token_secret;
const EXPIRATION_DATE = require("../configuration.json").expiration_date;

const createToken = (userFound) => {
    return jwt.sign({ id: userFound.id, role: userFound.role }, TOKEN_SECRET,
        {
            expiresIn: EXPIRATION_DATE
        });
}

module.exports = {
    createToken,
}