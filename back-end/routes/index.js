const router = require('express').Router();
const authRouter = require('./auth');
const { authorize, verifyToken } = require("../services/authorize");
const Role = require("../helpers/role");
const Car = require("../models").Car;

router.get("/hello", authorize(Role.Admin), (req, res) => {
    res.status(200).send({ message: "Hello boss" });
})

router.get("/cars/user/:id", authorize(), async (req, res) => {
    let cars;
    try {
        await Car.findAll({
            where: { userId: req.params.id }
        }).then(
            (carsFound) => { cars = carsFound });
    }
    catch (err) {
        return res.status(404).send({ message: "Not found" + namesTransportTypes });
    }

    return res.status(200).send({ message: cars });
})

router.use("/auth", authRouter);

module.exports = router;
