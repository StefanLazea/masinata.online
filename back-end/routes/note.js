const router = require('express').Router();
const { authorize } = require("../services/authorize");
const Role = require("../helpers/role");
const NoteController = require("../controllers/note");

router.get("/car/:id", authorize([Role.User, Role.Admin, Role.AppAdmin]), NoteController.getNotesForCar);

module.exports = router;