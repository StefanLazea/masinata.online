const router = require('express').Router();
const Car = require("../models").Car;
const { authorize } = require("../services/authorize");
const Role = require("../helpers/role");

router.get("/user/:id", authorize([Role.User, Role.Admin, Role.AppAdmin]), async (req, res) => {
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

    return res.status(200).send({ cars: cars });
});

router.get("/", authorize([Role.User]), async (req, res) => {
    let carsFound;
    try {
        await Car.findAll().then((cars) => carsFound = cars);
    }
    catch (err) {
        return res.status(409).send({ message: "No elements found in the database" });
    }
    return res.status(200).send(carsFound);
})

module.exports = router;