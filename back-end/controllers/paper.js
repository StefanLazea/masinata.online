const Paper = require('../models').Paper;
const path = require("path");

const getPapersForCar = async (req, res) => {
    let papers;
    try {
        await Paper.findAll({
            where: { carId: req.params.id }
        }).then(
            (papersFound) => { papers = papersFound });
    }
    catch (err) {
        return res.status(404).send({ message: "Not found" });
    }

    return res.status(200).send(papers);
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