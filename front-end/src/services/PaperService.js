const Axios = require('axios');
const { getToken } = require("./Token.js");

const getBasename = () => {
    return process.env.REACT_APP_BACK_END_URL;
};

const getDocumentsList = (id) => {
    let types = ['RCA', 'ITP', 'Rovigneta'];
    let documents = [];
    for (let index in types) {
        // checkIfDocumentImageExists(types[index], id).then(res => {
        // if (res === true) {
        console.log('ok')
        documents.push(
            {
                thumbnailLabel: types[index],
                original: `${getBasename()}/paper/${types[index]}/car/${id}`,
                thumbnail: 'https://picsum.photos/id/1018/250/150/',
            }
        )
        // }
        // })
    }
    console.log(documents)
    return documents;
}

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

// const checkIfDocumentImageExists = async (type, id) => {
//     try {
//         await Axios.get(`${getBasename()}/check/paper/${type}/car/${id}`);
//         return true;
//     } catch (err) {
//         return false;
//     }
// }

const checkCar = () => {
    return Axios.get(`${getBasename()}/check/paper/RCA/car/64031b00-b0d1-11ea-869a-6df2f0cb1ba5`);
};

const checkTypes = (id) => {
    return Axios.get(`${getBasename()}/check/paper/car/${id}`);
}

export default {
    addPaper,
    addFormDataPaper,
    getDocumentsList,
    checkCar,
    checkTypes,
    getData
};