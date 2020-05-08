const Axios = require('axios');
const { getToken, getUserId } = require("./Token.js");

const getBasename = () => {
    return process.env.REACT_APP_BACK_END_URL;
};

const getAllCars = () => {
    return Axios.get(`${getBasename()}/cars`,
        {
            headers: { "Authorization": getToken() }
        });
};

const getAllCarsByUserId = () => {
    return Axios.get(`${getBasename()}/cars/user/${getUserId()}`,
        {
            headers: { "Authorization": getToken() }
        });
}

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
const createCarUsingFormData = (data) => {
    return Axios.post(`${getBasename()}/cars`, data,
        {
            headers: {
                "Content-Type": 'multipart/form-data',
                "Authorization": getToken()
            }
        });
}

const updateCar = (id, data) => {
    return Axios.post(`${getBasename()}/cars/${id}`, JSON.stringify(data),
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": getToken()
            }
        });
}

const deleteCar = (id) => {
    return Axios.delete(`${getBasename()}/cars/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": getToken()
            }
        });
}

module.exports = {
    createCar,
    createCarUsingFormData,
    getAllCars,
    getAllCarsByUserId,
    getCarById,
    deleteCar,
    updateCar,
};