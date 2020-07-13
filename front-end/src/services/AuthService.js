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

const login = (form) => {
    return Axios.post(`${getBasename()}/auth/login`, JSON.stringify(form),
        {
            headers: { "Content-Type": "application/json", withCredentials: true },
            credentials: 'include'
        })
};

const resetPassword = (form) => {
    return Axios.post(`${getBasename()}/email/reset-password`, JSON.stringify(form),
        {
            headers: { "Content-Type": "application/json" }
        });
};

module.exports = {
    register,
    login,
    resetPassword
}

