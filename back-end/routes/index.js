const router = require('express').Router();
const authRouter = require('./auth');
const { authorize, verifyToken } = require("../services/authorize");
const Role = require("../helpers/role");

router.get("/hello", authorize(Role.Admin), (req, res) => {
    res.status(200).send({ message: "Hello boss" });
})

router.use("/auth", authRouter);

module.exports = router;
