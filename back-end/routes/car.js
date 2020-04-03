const router = require('express').Router();
const Car = require("../models").Car;
const { authorize } = require("../services/authorize");
const Role = require("../helpers/role");
const CarController = require("../controllers/car");


router.get("/", authorize([Role.User, Role.Admin, Role.AppAdmin]), CarController.getAllCars);
router.post("/", authorize([Role.User, Role.Admin, Role.AppAdmin]), CarController.saveCarForUser);
router.get("/user/:id", authorize([Role.User, Role.Admin, Role.AppAdmin]), CarController.getCarsByUserId);

module.exports = router;