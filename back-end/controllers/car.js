const Car = require('../models').Car;
const Garage = require('../models').Garage;
const TokenService = require("../services/token");

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

    return res.status(200).send(cars);
};

const getAllCars = async (req, res) => {
    let carsFound;
    try {
        await Car.findAll().then((cars) => carsFound = cars);
    }
    catch (err) {
        return res.status(409).send({ message: "No elements found in the database", err });
    }
    return res.status(200).send(carsFound);
};

const createCar = async (req, res) => {
    let car = {
        model: req.body.model,
        brand: req.body.brand,
        type: req.body.type,
        licence_plate: req.body.licence_plate,
        vin: req.body.vin,
        engine_type: req.body.engine_type,
        year: req.body.year,
        pollution_grade: req.body.pollution_grade,
        eco: req.body.eco,
        userId: req.body.user_id,
        garageId: req.body.garage_id,
    }

    try {
        await Car.create(car);
    } catch (err) {
        return res.status(500).send({ message: err });
    }
    return res.status(200).send({ message: "Car created successfully" })
}

const addGarageToCar = async (req, res) => {
    const carWithGarage = {
        garageId: req.body.garage_id
    }
    await Car.update(
        carWithGarage,
        {
            where:
                { id: req.body.car_id }
        }
    ).then(() => { return res.status(200).send({ message: "Added the garage to car!" }) });
};

const getCarsFromGarage = async (req, res) => {
    console.log(req.params.id);
    await Car.findAll({
        include: [{
            model: Garage,
            where: { id: req.params.id }
        }]
    }).then(cars => {
        return res.status(200).send(cars);
    });

    return res.status(500).send({ message: "Something went wrong" });
};

const getCarById = async (req, res) => {
    let carFound = await Car.findByPk(req.params.id);
    if (!carFound) {
        return res.status(404).send({ message: "Car not found" });
    }
    return res.status(200).send({ message: carFound });
}

const updateCarById = async (req, res) => {
    let car = {
        model: req.body.model,
        brand: req.body.brand,
        type: req.body.type,
        licence_plate: req.body.licence_plate,
        vin: req.body.vin,
        engine_type: req.body.engine_type,
        pollution_grade: req.body.pollution_grade,
        year: req.body.year,
        eco: req.body.eco,
    }
    try {
        await Car.update(
            car,
            {
                where:
                    { id: req.params.id }
            }
        );

        return res.status(200).send({ message: "Car details updated successfully!" });
    } catch (err) {
        return res.status(500).send({ message: "Something went wrong" });
    }
};

const deleteCarById = async (req, res) => {
    let carFound = await Car.findByPk(req.params.id);
    if (!carFound) {
        return res.status(404).send({ message: "Car not found" });
    }
    await carFound.destroy().then(() => { return res.send({ message: "Car deleted" }) });
};

module.exports = {
    getCarsByUserId,
    getAllCars,
    createCar,
    addGarageToCar,
    getCarsFromGarage,
    updateCarById,
    getCarById,
    deleteCarById,
}