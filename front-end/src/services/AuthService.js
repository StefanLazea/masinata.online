import Axios from "axios";
const getBasename = () => {
    return process.env.REACT_APP_BACK_END_URL;
};

const post = async (form) => {
    await Axios.post(`${getBasename()}/auth/register`, JSON.stringify(form),
        {
            headers: { "Content-Type": "application/json" }
        });
}
module.exports = {
    post
}

