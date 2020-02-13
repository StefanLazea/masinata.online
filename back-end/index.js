const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const model = require('./models');
const routes = require('./routes');
const PORT = require("./configuration.json").port;
const COOKIE_SECRET = require("./configuration.json").cookie_secret;

const app = express();

app.use(bodyParser.json());
app.use(cookieParser(COOKIE_SECRET));

model.sequelize.sync();

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`App started on http://localhost:${PORT}`);
});