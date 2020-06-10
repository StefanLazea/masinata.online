const Axios = require('axios');
const { getToken } = require("./Token.js");

const getBasename = () => {
    return process.env.REACT_APP_BACK_END_URL;
};

const getDocumentsList = () => {
    let types = ['RCA', 'ITP', 'Rovigneta'];
    let documents = [];
    for (let index in types) {
        console.log(types[index])
        if (checkIfDocumentImageExists(types[index], '40ba6d10-aa4b-11ea-bb9c-fd095f9ad0bd') != null) {
            console.log('ok')
            documents.push(
                {
                    thumbnailLabel: types[index],
                    original: `${getBasename()}/paper/${types[index]}/car/40ba6d10-aa4b-11ea-bb9c-fd095f9ad0bd`,
                    thumbnail: 'https://picsum.photos/id/1018/250/150/',
                }
            )
        }
    }
    return documents;
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

const checkIfDocumentImageExists = (type, id) => {
    return Axios.get(`${getBasename()}/paper/${type}/car/${id}`).catch(err => {
        if (err.response.status === 404) {
            return false;
        }
    })
}

module.exports = {
    addPaper,
    addFormDataPaper,
    getDocumentsList,
};