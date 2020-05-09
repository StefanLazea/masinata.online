const router = require('express').Router();
const { authorize } = require("../services/authorize");
const Role = require("../helpers/role");
const GarageController = require("../controllers/garage");

router.get("/", authorize([Role.User, Role.Admin, Role.AppAdmin]), GarageController.getGarages);
router.post("/", authorize([Role.User, Role.Admin, Role.AppAdmin]), GarageController.createGarage);
router.get("/user/:id", authorize([Role.User, Role.Admin, Role.AppAdmin]), GarageController.getGaragesByUserId);

module.exports = router;