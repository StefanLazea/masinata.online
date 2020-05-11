const Axios = require('axios');

const getBasename = () => {
    return process.env.REACT_APP_BACK_END_URL;
};

const register = (form) => {
    return Axios.post(`${getBasename()}/auth/register`, JSON.stringify(form),
        {
            headers: { "Content-Type": "application/json" }
        });
};

module.exports = {
    register
}

