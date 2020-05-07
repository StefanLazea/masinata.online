const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const uploader = require('express-fileupload');
const model = require('./models');
const routes = require('./routes');
const dotenv = require('dotenv');

const app = express();
dotenv.config();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(uploader());
app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET));

// model.sequelize.sync({ force: true });
model.sequelize.sync();

app.use('/', express.static('../front-end/build'));

app.use('/api', routes);

app.listen(process.env.PORT, () => {
    console.log(`App started on http://localhost:${process.env.PORT}`);
});