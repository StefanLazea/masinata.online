const express = require("express");
const PORT = require("./configuration.json").port;
const app = express();


app.listen(PORT, () => {
    console.log(`App started on http://localhost:${PORT}`);
});