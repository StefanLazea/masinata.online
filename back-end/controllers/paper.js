const Paper = require('../models').Paper;
const path = require("path");
const fs = require("fs");

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
    // todo check if dates are the same
    let checkResp = await checkIfCarHasDocumentOfType(req.body.type, req.body.car_id);
    console.log(checkResp)
    if (checkResp) {
        return res.status(409).send({ message: "Pentru a reinnoi in aplicatie " + req.body.type + " bifati reinoire!" })
    }

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
        expirationDate: req.body.expirationDate,
        period: req.body.period,
        cost: req.body.cost,
        carId: req.body.car_id,
        companyName: req.body.company_name,
        beginDate: req.body.beginDate,
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
    let paperFound = await checkIfCarHasDocumentOfType(req.params.type, req.params.id)
    if (paperFound) {
        return res.status(200).sendFile(paperFound.document);
    }
    return res.status(404).send({ message: "No elements found in the database" });
}

const checkForPaper = async (req, res) => {
    let types = ['ITP', 'RCA', 'Rovigneta'];
    let response = {};
    for (let index in types) {
        let found = await checkIfCarHasDocumentOfType(types[index], req.params.id);
        if (found) {
            response[types[index]] = 1;
        } else {
            response[types[index]] = 0;
        }
    }

    res.status(200).send(response);
}

const checkIfCarHasDocumentOfType = (documentType, id) => {
    try {
        let found = Paper.findOne({
            where: { type: documentType, carId: id }
        }).then((paper) => found = paper);
        return found;
    } catch (err) {
        return null;
    }
}

//TODO
const getPaperDetailsForCar = async (req, res) => {
    let paper;
    try {
        await Paper.findOne({
            where: { type: req.params.type, carId: req.params.id }
        }).then(
            (paperFound) => { paper = paperFound });
    }
    catch (err) {
        return res.status(404).send({ message: "Not found" });
    }

    return res.status(200).send(papers);
}

const saveDocument = (file, specifiName) => {
    let location = "";

    let relativeLocation = "../private/docs/" + specifiName + ".png";
    location = path.resolve(__dirname, relativeLocation);

    file.mv(location, err => {
        if (err) {
            console.log(err);
            return { message: "A aparut o eroare la incarcarea imaginii!" };
        }
    });

    return location;
}


/**
 * Todo
 * check for ui body
 * check for error in the savingResult function
 * create another entry in the database with renew field?? (this will brake the image getting) -> with rca -> renew rca
 *
 * 
 * todo 26.05
 * when new renew is on, create new entry in the db 
 * the old one just update the fields: document and type with OLD-RCA
 */
const renewPaper = async (req, res) => {
    console.log(res.body, req.files)
    let hasOldDoc = await checkIfCarHasDocumentOfType(req.params.type, req.params.id);
    let savingResult;
    if (hasOldDoc) {
        const endDate = hasOldDoc.expirationDate.toISOString().slice(0, 10);
        let historyFileLocation = path.resolve(__dirname, "../private/docs/OLD-" + req.body.type + "-" + req.body.car_id + "-" + endDate + ".png");
        fs.renameSync(hasOldDoc.document, historyFileLocation);

        if (req.files) {
            var event = new Date(req.body.expirationDate);

            let date = JSON.stringify(event)
            date = date.slice(1, 11)
            console.log(date)
            savingResult = saveDocument(req.files.document, req.body.type + "-" + req.body.car_id + "-" + date);
        }

    }


    return res.send("ok")

}

const updatePaper = (req, res) => {

}

module.exports = {
    getPapersForCar,
    createPaperForCar,
    getPaperByTypeForCar,
    getPaperDetailsForCar,
    renewPaper,
    checkForPaper,
    updatePaper,
}