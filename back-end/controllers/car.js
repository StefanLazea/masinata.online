const Car = require('../models').Car;
const Garage = require('../models').Garage;
const path = require("path");
const Validator = require('../helpers/validation/car');

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

const getCarImage = async (req, res) => {
    let carFound = await Car.findByPk(req.params.id);
    if (!carFound) {
        return res.status(404).send({ message: "Car not found" });
    }
    if (carFound.avatar_photo === "") {
        return res.status(404).send({ message: "Image not found" });
    }

    return res.sendFile(carFound.avatar_photo);
}

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
    let location = "";
    if (req.files) {
        let image = req.files.avatar_photo;
        let relativeLocation = "../private/images/" + req.body.vin + ".png";
        location = path.resolve(__dirname, relativeLocation);

        image.mv(location, err => {
            if (err) {
                console.log(err);
                return res.status(500).send({ message: "A aparut o eroare la incarcarea imaginii!" })
            }
        });
    }

    let car = {
        model: req.body.model,
        brand: req.body.brand,
        type: req.body.type,
        licence_plate: req.body.licence_plate,
        mileage: req.body.mileage,
        vin: req.body.vin,
        engine_type: req.body.engine_type,
        engine_capacity: req.body.engine_capacity,
        year: req.body.year,
        pollution_grade: req.body.pollution_grade,
        avatar_photo: location,
        eco: req.body.eco,
        userId: req.body.user_id,
        garageId: req.body.garage_id,
    }

    let error = Validator.validateCar(car);
    if (error) {
        return res.status(400).send(error)
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
    let carsFound;
    try {
        await Car.findAll({
            include: [{
                model: Garage,
                where: { id: req.params.id }
            }]
        }).then((cars) => carsFound = cars);
    }
    catch (err) {
        return res.status(409).send({ message: "No elements found in the database", err });
    }
    return res.status(200).send(carsFound);
};

const getCarById = async (req, res) => {
    let carFound = await Car.findByPk(req.params.id);
    if (!carFound) {
        return res.status(404).send({ message: "Car not found" });
    }
    return res.status(200).send({ message: carFound });
}

const updateCarById = async (req, res) => {
    console.log(req.body)
    let car = {
        model: req.body.model,
        brand: req.body.brand,
        type: req.body.type,
        licence_plate: req.body.licence_plate,
        mileage: req.body.mileage,
        vin: req.body.vin,
        engine_type: req.body.engine_type,
        engine_capacity: req.body.engine_capacity,
        year: req.body.year,
        pollution_grade: req.body.pollution_grade,
        eco: req.body.eco,
        userId: req.body.userId,
        garageId: req.body.garageId,
    }

    let error = Validator.validateCar(car);
    if (error) {
        return res.status(400).send(error)
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

const getCarsByAdminId = async (req, res) => {
    let carsFound;
    try {
        await Car.findAll({
            include: [{
                model: Garage,
                where: { adminId: req.params.id }
            }]
        }).then((cars) => carsFound = cars);
    }
    catch (err) {
        return res.status(409).send({ message: "No elements found in the database", err });
    }
    return res.status(200).send(carsFound);
}

module.exports = {
    getCarsByUserId,
    getAllCars,
    getCarImage,
    getCarById,
    getCarsFromGarage,
    createCar,
    addGarageToCar,
    updateCarById,
    deleteCarById,
    getCarsByAdminId,
}