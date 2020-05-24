const Axios = require('axios');
const { getToken } = require("./Token.js");

const getBasename = () => {
    return process.env.REACT_APP_BACK_END_URL;
};

const addPaper = (data) => {
    return Axios.post(`${getBasename()}/papers`, JSON.stringify(data),
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": getToken()
            }
        });
};

module.exports = {
    addPaper,
};