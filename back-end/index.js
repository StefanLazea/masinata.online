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
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     res.header("Access-Control-Allow-Methods", "DELETE,PUT,GET");
//     res.header("Access-Control-Allow-Credentials", "true");
//     next();
// });

// model.sequelize.sync({ force: true });
model.sequelize.sync();

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`App started on http://localhost:${PORT}`);
});