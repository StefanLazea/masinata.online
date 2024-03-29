const router = require('express').Router();
const { authorize } = require("../services/authorize");
const Role = require("../helpers/role");
const GarageController = require("../controllers/garage");

router.get("/", authorize([Role.User, Role.Admin, Role.AppAdmin]), GarageController.getGarages);
router.post("/", authorize([Role.User, Role.Admin, Role.AppAdmin]), GarageController.createGarage);
router.put("/:id", authorize([Role.User, Role.Admin, Role.AppAdmin]), GarageController.updateGarageById);
router.get("/:id", authorize([Role.User, Role.Admin, Role.AppAdmin]), GarageController.getGarageById);
router.delete("/:id", authorize([Role.User, Role.Admin, Role.AppAdmin]), GarageController.deleteGarageById);
router.get("/user/:id", authorize([Role.User, Role.Admin, Role.AppAdmin]), GarageController.getGaragesByUserId);
router.get("/admin/:id", authorize([Role.User, Role.Admin, Role.AppAdmin]), GarageController.getAllGaragesForAdmin);


module.exports = router;