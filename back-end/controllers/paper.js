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
    let location = "";
    if (req.files) {
        let image = req.files.document;
        let relativeLocation = "../private/docs/" + req.body.type + "-" + req.body.car_id + ".png";
        location = path.resolve(__dirname, relativeLocation);

        image.mv(location, err => {
            if (err) {
                console.log(err);
                return res.status(500).send({ message: "A aparut o eroare la incarcarea imaginii!" })
            }
        });
    }

    let paper = {
        details: req.body.details,
        type: req.body.type,
        expirationDate: req.body.expiration_date,
        period: req.body.period,
        cost: req.body.cost,
        carId: req.body.car_id,
        companyName: req.body.company_name,
        beginDate: req.body.begin_date,
        document: location,
        renew: req.body.renew
    }

    try {
        await Paper.create(paper);
    } catch (err) {
        return res.status(500).send({ message: err });
    }
    return res.status(200).send({ message: "Document added successfully" })

}


const getPaperByTypeForCar = async (req, res) => {
    let paperFound;
    try {
        await Paper.findOne({
            where: { type: req.params.type, car_id: req.params.id }
        }).then((paper) => paperFound = paper);
    }
    catch (err) {
        return res.status(409).send({ message: "No elements found in the database" });
    }
    res.sendFile(paperFound.document);
}

module.exports = {
    getPapersForCar,
    createPaperForCar,
    getPaperByTypeForCar
}