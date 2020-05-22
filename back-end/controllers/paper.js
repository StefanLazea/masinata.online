const Paper = require('../models').Paper;
const path = require("path");

const getPapersForCar = (req, res) => {

}

const createPaperForCar = async (req, res) => {

    let paper = {
        details: req.body.details,
        type: req.body.type,
        expirationDate: req.body.expiration_date,
        period: req.body.period,
        cost: req.body.cost,
        carId: req.body.car_id,
        companyName: req.body.company_name,
        beginDate: req.body.begin_date,
        document: req.body.document,
    }

    try {
        await Paper.create(paper);
    } catch (err) {
        return res.status(500).send({ message: err });
    }
    return res.status(200).send({ message: "Document added successfully" })

}


module.exports = {
    getPapersForCar,
    createPaperForCar
}