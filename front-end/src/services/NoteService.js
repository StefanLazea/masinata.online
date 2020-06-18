const Axios = require('axios');
const { getToken } = require("./Token.js");

const getBasename = () => {
    return process.env.REACT_APP_BACK_END_URL;
};

const getAllNotes = (car_id) => {
    return Axios.get(`${getBasename()}/notes/car/${car_id}`,
        {
            headers: { "Authorization": getToken() }
        });
}


const deleteNote = (id) => {
    return Axios.delete(`${getBasename()}/notes/${id}`,
        {
            headers: { "Authorization": getToken() }
        });
}
module.exports = {
    getAllNotes,
    deleteNote,
};