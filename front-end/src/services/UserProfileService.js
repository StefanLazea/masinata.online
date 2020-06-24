const Axios = require('axios');
const { getToken, getUserId } = require("./Token.js");

const getBasename = () => {
    return process.env.REACT_APP_BACK_END_URL;
};

const getUserDetails = () => {
    return Axios.get(`${getBasename()}/user/details/${getUserId()}`, {
        headers: { "Authorization": getToken() }
    });
};

const updateUserDetails = (user) => {
    return Axios.put(`${getBasename()}/user/details/${getUserId()}`, JSON.stringify(user), {
        headers: { "Content-Type": "application/json", "Authorization": getToken() }
    })
}

const getAllPaperAdmins = () => {
    return Axios.get(`${getBasename()}/user/admins`, {
        headers: { "Authorization": getToken() }
    });
}

const getAdminDetails = (id) => {
    return Axios.get(`${getBasename()}/user/admin/${id}`, {
        headers: { "Authorization": getToken() }
    });
}

module.exports = {
    getUserDetails,
    updateUserDetails,
    getAllPaperAdmins,
    getAdminDetails
};