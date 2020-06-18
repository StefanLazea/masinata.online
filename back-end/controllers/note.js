const Note = require('../models').Note;

const getNotesForCar = async (req, res) => {
    let notes;
    try {
        await Note.findAll({
            where: { carId: req.params.id }
        }).then(
            (notesFound) => { notes = notesFound });
    }
    catch (err) {
        return res.status(404).send({ message: "Not found" });
    }

    return res.status(200).send(notes);
}

const createNote = async (req, res) => {
    const note = {
        title: req.body.title,
        distance: req.body.distance,
        description: req.body.description,
        type: req.body.type,
        urgent: req.body.urgent,
        carId: req.body.carId
    }

    try {
        await Note.create(note);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }

    return res.status(200).send({ message: note.title + " successfully created!" })
}

module.exports = {
    getNotesForCar,
    createNote,
}