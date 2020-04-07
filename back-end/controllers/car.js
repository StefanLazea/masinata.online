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
        return res.status(404).send({ message: "Not found" });
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
    let car = {
        model: req.body.model,
        brand: req.body.brand,
        type: req.body.type,
        licence_plate: req.body.licence_plate,
        vin: req.body.vin,
        engine_type: req.body.engine_type,
        year: req.body.year,
        eco: req.body.eco,
        user_id: req.body.user_id,
        garage_id: req.body.garage_id
    }
    // return res.send({ car })
    try {
        await Car.create(car);
    } catch (err) {
        return res.status(500).send({ message: err });
    }
    return res.status(200).send({ message: "Car created successfully" })
}

module.exports = {
    getCarsByUserId,
    getAllCars,
    saveCarForUser
}