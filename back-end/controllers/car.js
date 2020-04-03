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

const saveCarForUser = (req, res) => {
    res.send({ message: "aoolo" })
}

module.exports = {
    getCarsByUserId,
    getAllCars,
    saveCarForUser
}