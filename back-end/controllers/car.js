const Car = require('../models').Car;

const getCarsByUserId = async (req, res) => {
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
};

const getAllCars = async (req, res) => {
    let carsFound;
    try {
        await Car.findAll().then((cars) => carsFound = cars);
    }
    catch (err) {
        return res.status(409).send({ message: "No elements found in the database" });
    }
    return res.status(200).send(carsFound);
};

const saveCarForUser = async (req, res) => {
    console.log(req.body)

    let car = {
        model: req.body.model,
        brand: req.body.brand,
        type: req.body.type,
        license: req.body.license,
        vin: req.body.vin,
        engine_type: req.body.engine_type,
        year: req.body.year,
        eco: req.body.eco,
        userId: req.body.user_id
    }
    try {
        Car.create(car);
    } catch (err) {
        res.send(err);
        return;
    }

    return res.status(201).send({ message: "Car created successfully" })


}

module.exports = {
    getCarsByUserId,
    getAllCars,
    saveCarForUser
}