const jwt = require('jsonwebtoken');
const Cookies = require('js-cookie');
const Role = require('./Roles');
const secret = process.env.REACT_APP_TOKEN_SECRET;

const getUserId = () => {
    let token = localStorage.getItem('token');
    const trimmedToken = token.split(" ")[1];
    const decode = jwt.decode(trimmedToken, secret);
    return decode.id;
}

const getUserRole = () => {
    let token = localStorage.getItem('token');
    if (token) {
        const trimmedToken = token.split(" ")[1];
        const decode = jwt.decode(trimmedToken, secret);
        console.log(decode.role);
        return decode.role;
    }

    return token;
}

const getDecodedToken = () => {
    let token = localStorage.getItem('token');
    const trimmedToken = token.split(" ")[1];
    const decode = jwt.verify(trimmedToken, secret);
    return decode;
}


const getToken = () => {
    return localStorage.getItem('token');
}

const setTokenInCookies = (token) => {
    Cookies.set("token", token)
}

const setTokenToLocalStorage = (token) => {
    localStorage.setItem('token', token);
}

const removeTokenFromLocalStorage = () => {
    localStorage.removeItem('token');
}

const checkAdmin = () => {
    if (getUserRole()) {
        return getUserRole() !== Role.User;
    }
    return false;
}
module.exports = {
    getUserId,
    getUserRole,
    getToken,
    setTokenToLocalStorage,
    setTokenInCookies,
    getDecodedToken,
    removeTokenFromLocalStorage,
    checkAdmin,
}