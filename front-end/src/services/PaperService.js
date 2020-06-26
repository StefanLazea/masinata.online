const Axios = require('axios');
const { getToken } = require("./Token.js");

const getBasename = () => {
    return process.env.REACT_APP_BACK_END_URL;
};

const getData = (id) => {
    return [
        {
            thumbnailLabel: 'ITP',
            original: `${getBasename()}/paper/ITP/car/${id}`,
            thumbnail: 'https://picsum.photos/id/1018/250/150/',
        },
        {
            thumbnailLabel: 'RCA',
            original: `${getBasename()}/paper/RCA/car/${id}`,
            thumbnail: 'https://picsum.photos/id/1018/250/150/',
        },
        {
            thumbnailLabel: 'Rovigneta',
            original: `${getBasename()}/paper/Rovigneta/car/${id}`,
            thumbnail: 'https://picsum.photos/id/1018/250/150/',
        }
    ]
}

const addPaper = (data) => {
    return Axios.post(`${getBasename()}/papers`, JSON.stringify(data),
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": getToken()
            }
        });
};

const addFormDataPaper = (data) => {
    return Axios.post(`${getBasename()}/papers`, data,
        {
            headers: {
                "Content-Type": 'multipart/form-data',
                "Authorization": getToken()
            }
        });
};

const checkTypes = (id) => {
    return Axios.get(`${getBasename()}/check/paper/car/${id}`);
}

const updatePaper = (carId, type, data) => {
    return Axios.put(`${getBasename()}/papers/renew/${type}/car/${carId}`, data,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": getToken()
            }
        });
}

export default {
    addPaper,
    addFormDataPaper,
    checkTypes,
    getData,
    updatePaper
};