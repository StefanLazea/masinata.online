const Garage = require('../models').Garage;
const GarageWithCars = require('../models').GarageCars;


const getGarages = (req, res) => { }

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