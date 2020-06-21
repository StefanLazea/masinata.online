const Note = require('../models').Note;

const getNotesForCar = async (req, res) => {
    try {
        const notesFound = await Note.findAll({
            where: { carId: req.params.id }
        });
        return res.status(200).send(notesFound);
    }
    catch (err) {
        return res.status(404).send({ message: "Not found" });
    }
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

const deleteNote = async (req, res) => {
    let noteFound = await Note.findByPk(req.params.id);
    if (!noteFound) {
        return res.status(404).send({ message: "Note not found" });
    }
    await noteFound.destroy().then(() => { return res.send({ message: "Note deleted" }) });
}

const updateNote = async (req, res) => {
    let note = {
        title: req.body.title,
        distance: req.body.distance,
        description: req.body.description,
        urgent: req.body.urgent
    }

    try {
        await Note.update(
            note,
            {
                where:
                    { id: req.params.id }
            }
        );

        return res.status(200).send({ message: "Note details updated successfully!" });
    } catch (err) {
        return res.status(500).send({ message: "Something went wrong", err });
    }
}

module.exports = {
    getNotesForCar,
    createNote,
    deleteNote,
    updateNote,
}