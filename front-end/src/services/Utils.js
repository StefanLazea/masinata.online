const formatData = (data) => {
    var event = new Date(data);
    let date = JSON.stringify(event)
    date = date.slice(1, 11)
    return date;
}

const urlBase64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

module.exports = {
    formatData,
    urlBase64ToUint8Array,
}