const router = require('express').Router();
const { authorize } = require("../services/authorize");
const Role = require("../helpers/role");
const CarController = require("../controllers/car");


router.get("/", authorize([Role.User, Role.Admin, Role.AppAdmin]), CarController.getAllCars);
router.post("/", authorize([Role.User, Role.Admin, Role.AppAdmin]), CarController.createCar);
router.get("/:id", authorize([Role.User, Role.Admin, Role.AppAdmin]), CarController.getCarById);
router.put("/:id", authorize([Role.User, Role.Admin, Role.AppAdmin]), CarController.updateCarById);
router.delete("/:id", authorize([Role.User, Role.Admin, Role.AppAdmin]), CarController.deleteCarById);
router.get("/user/:id", authorize([Role.User, Role.Admin, Role.AppAdmin]), CarController.getCarsByUserId);
router.post("/add/garage", authorize([Role.User, Role.Admin, Role.AppAdmin]), CarController.addGarageToCar);
router.get("/garage/:id", authorize([Role.User, Role.Admin, Role.AppAdmin]), CarController.getCarsFromGarage);
router.get("/image/:id", authorize([Role.User, Role.Admin, Role.AppAdmin]), CarController.getCarImage);
router.get("/admin/:id", authorize([Role.Admin, Role.AppAdmin]), CarController.getCarsByAdminId);

module.exports = router; 