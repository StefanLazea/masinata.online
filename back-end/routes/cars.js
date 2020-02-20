const router = require('express').Router();
const Car = require("../models").Car;
const { authorize } = require("../services/authorize");

router.get("/user/:id", authorize(), async (req, res) => {
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
})

module.exports = router;