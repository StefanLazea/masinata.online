const Garage = require('../models').Garage;

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

    if (req.body.name === "" || req.body.name === null) {
        return res.status(400).send({ message: "Garage name should not be empty" });
    }

    try {
        await Garage.create(garage);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }

    return res.status(200).send({ message: garage.name + " successfully created!" })
}

const getGaragesByUserId = async (req, res) => {
    try {
        await Garage.findAll({
            where: { userId: req.params.id }
        }).then(
            (garages) => { return res.status(200).send(garages) });
    }
    catch (err) {
        return res.status(404).send({ message: "Not found" });
    }
};

module.exports = {
    getGarages,
    createGarage,
    getGaragesByUserId
}