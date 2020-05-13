const Axios = require('axios');
const { getToken, getUserId } = require("./Token.js");

const getBasename = () => {
    return process.env.REACT_APP_BACK_END_URL;
};

const getGaragesByUserId = () => {
    return Axios.get(`${getBasename()}/garages/user/${getUserId()}`,
        {
            headers: { "Authorization": getToken() }
        });
};

const createGarage = (data) => {
    return Axios.post(`${getBasename()}/garages`, JSON.stringify(data),
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": getToken()
            }
        });
}

const getGaragesById = (id) => {
    return Axios.get(`${getBasename()}/garages/${id}`,
        {
            headers: { "Authorization": getToken() }
        });
};

module.exports = {
    getGaragesByUserId,
    getGaragesById,
    createGarage,
};