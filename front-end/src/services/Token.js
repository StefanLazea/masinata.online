const jwt = require('jsonwebtoken');
const Cookies = require('js-cookie');

const secret = process.env.REACT_APP_TOKEN_SECRET;

const getUserId = () => {
    let token = localStorage.getItem('token');
    const trimmedToken = token.split(" ")[1];
    const decode = jwt.decode(trimmedToken, secret);
    return decode.id;
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

module.exports = {
    getUserId,
    getToken,
    setTokenToLocalStorage,
    setTokenInCookies,
    getDecodedToken,
    removeTokenFromLocalStorage,
}