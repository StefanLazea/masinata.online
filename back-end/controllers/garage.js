const Garage = require('../models').Garage;
const GarageWithCars = require('../models').GarageCars;


const getGarages = async (req, res) => {
    try {
        await Garage.findAll().then((garages) => { return res.status(200).send(garages); });
    }
    catch (err) {
        return res.status(409).send({ message: "No elements found in the database" });
    }
}

const createGarage = async (req, res) => {
    let garage = {
        name: req.body.name
    };

    try {
        await Garage.create(garage);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }

    return res.status(200).send({ message: garage.name + " successfully created!" })
}

module.exports = {
    getGarages,
    createGarage
}