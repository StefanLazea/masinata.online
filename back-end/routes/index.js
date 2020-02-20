const router = require('express').Router();
const authRouter = require('./auth');
const carRouter = require('./cars');
const { authorize } = require("../services/authorize");
const Role = require("../helpers/role");

router.get("/hello", authorize(Role.Admin), (req, res) => {
    res.status(200).send({ message: "Hello boss" });
})

router.use("/auth", authRouter);
router.use("/cars", carRouter);

module.exports = router;
