const Axios = require('axios');
const { getToken, getUserId } = require("./Token.js");

const getBasename = () => {
    return process.env.REACT_APP_BACK_END_URL;
};

const getUserDetails = () => {
    // return Axios.get(`${getBasename()}/user/details/${getUserId()}`,
    //     {
    //         headers: { "Authorization": getToken() }
    //     });
};

module.exports = {
    getUserDetails,
};