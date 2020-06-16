const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET;
const EXPIRATION_DATE = process.env.EXPIRATION_TIME;

const createToken = (userFound) => {
    return jwt.sign({ id: userFound.id, role: userFound.role }, TOKEN_SECRET,
        {
            expiresIn: EXPIRATION_DATE
        });
}

const getUserId = (token) => {
    const decode = jwt.decode(token, secret);
    return decode.id;
}
module.exports = {
    createToken,
    getUserId
}