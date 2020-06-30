const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const webpush = require('web-push');
const cors = require('cors');
const uploader = require('express-fileupload');
const model = require('./models');
const routes = require('./routes');
const dotenv = require('dotenv');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(uploader());
app.use(cookieParser());

// model.sequelize.sync({ force: true });
model.sequelize.sync();
const PUBLIC_VAPID = process.env.PUBLIC_VAPID_KEY;
const PRIVATE_VAPID = process.env.PRIVATE_VAPID_KEY;

webpush.setVapidDetails('mailto:lazeastefan@gmail.com', PUBLIC_VAPID, PRIVATE_VAPID);

app.use('/', express.static('../front-end/build'));

app.use('/api', routes);

app.listen(process.env.PORT, () => {
    console.log(`App started on http://localhost:${process.env.PORT}`);
});