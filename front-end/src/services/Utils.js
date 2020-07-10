const formatData = (data) => {
    var event = new Date(data);
    let date = JSON.stringify(event)
    date = date.slice(1, 11)
    return date;
}

const createFormData = (datas, file, carId) => {
    let formData = new FormData();
    formData.append('details', datas.details);
    formData.append('type', datas.type);
    formData.append('expirationDate', datas.expiration_date);
    formData.append('beginDate', datas.begin_date);
    formData.append('period', datas.period);
    formData.append('cost', datas.cost);
    formData.append('companyName', datas.companyName);
    formData.append('document', file);
    formData.append('renew', datas.renew === undefined ? false : datas.renew);
    formData.append('car_id', carId);
    return formData;
}

module.exports = {
    formatData,
    createFormData,
}