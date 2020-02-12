const express = require("express");
const bodyParser = require('body-parser');
const model = require('./models');
const PORT = require("./configuration.json").port;

const app = express();
app.use(bodyParser.json());

model.sequelize.sync();

app.listen(PORT, () => {
    console.log(`App started on http://localhost:${PORT}`);
});