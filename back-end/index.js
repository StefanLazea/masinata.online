const express = require("express");
const bodyParser = require('body-parser');
const model = require('./models');
const routes = require('./routes');
const PORT = require("./configuration.json").port;

const app = express();
app.use(bodyParser.json());

model.sequelize.sync();

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`App started on http://localhost:${PORT}`);
});