const dotenv = require('dotenv');
dotenv.config();

const subscribe = (req, res) => {
    res.send("ok")
}


module.exports = {
    subscribe,

}