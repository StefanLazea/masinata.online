const router = require('express').Router();
const Garage = require("../models").Garage;
const { authorize } = require("../services/authorize");
const Role = require("../helpers/role");
const GarageController = require("../controllers/garage");


router.get("/", authorize([Role.User, Role.Admin, Role.AppAdmin]), GarageController.getGarages);
router.post("/", authorize([Role.User, Role.Admin, Role.AppAdmin]), GarageController.createGarage);

module.exports = router;