const router = require('express').Router();
const { authorize } = require("../services/authorize");
const Role = require("../helpers/role");
const NoteController = require("../controllers/note");


router.post("/", authorize([Role.User, Role.Admin, Role.AppAdmin]), NoteController.createNote);
router.put("/:id", authorize([Role.User, Role.Admin, Role.AppAdmin]), NoteController.updateNote);
router.delete("/:id", authorize([Role.User, Role.Admin, Role.AppAdmin]), NoteController.deleteNote);
router.get("/car/:id", authorize([Role.User, Role.Admin, Role.AppAdmin]), NoteController.getNotesForCar);

module.exports = router;