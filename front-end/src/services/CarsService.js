const Axios = require('axios');
const { getToken } = require("./Token.js");

const getBasename = () => {
    return process.env.REACT_APP_BACK_END_URL;
};

const getAllCars = () => {
    return Axios.get(`${getBasename()}/cars`,
        {
            headers: { "Authorization": getToken() }
        });
};

module.exports = {
    getAllCars,
};