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

const getCarById = (id) => {
    return Axios.get(`${getBasename()}/cars/${id}`,
        {
            headers: { "Authorization": getToken() }
        });
};

const createCar = (data) => {
    return Axios.post(`${getBasename()}/cars`, JSON.stringify(data),
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": getToken()
            }
        });
}

module.exports = {
    createCar,
    getAllCars,
    getCarById
};