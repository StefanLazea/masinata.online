const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const model = require('./models');
const routes = require('./routes');
const PORT = require("./configuration.json").port;
const COOKIE_SECRET = require("./configuration.json").cookie_secret;

const app = express();

app.use(bodyParser.json());
app.use(cookieParser(COOKIE_SECRET));


app.use(cors());

// model.sequelize.sync({ force: true });
model.sequelize.sync();

app.use('/', express.static('../front-end/build'));

app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`App started on http://localhost:${PORT}`);
});