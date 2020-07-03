const formatData = (data) => {
    var event = new Date(data);
    let date = JSON.stringify(event)
    date = date.slice(1, 11)
    return date;
}

module.exports = {
    formatData,
}