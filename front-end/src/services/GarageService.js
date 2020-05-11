const Axios = require('axios');
const { getToken, getUserId } = require("./Token.js");

const getBasename = () => {
    return process.env.REACT_APP_BACK_END_URL;
};

const getGaragesByUserId = (userId) => {
    return Axios.get(`${getBasename()}/garages/user/${getUserId()}`,
        {
            headers: { "Authorization": getToken() }
        });
};

const getGaragesById = (id) => {
    return Axios.get(`${getBasename()}/garages/${id}`,
        {
            headers: { "Authorization": getToken() }
        });
};

module.exports = {
    getGaragesByUserId,
    getGaragesById,
};