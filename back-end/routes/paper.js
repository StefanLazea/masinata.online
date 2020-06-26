const router = require('express').Router();
const { authorize } = require("../services/authorize");
const Role = require("../helpers/role");
const PaperController = require("../controllers/paper");

router.get("/car/:id", authorize([Role.User, Role.Admin, Role.AppAdmin]), PaperController.getPapersForCar);
//for admin use
router.get("/", authorize([Role.User, Role.Admin, Role.AppAdmin]), PaperController.getPapersForCar);
router.post("/", authorize([Role.User, Role.Admin, Role.AppAdmin]), PaperController.createPaperForCar);
router.put("/:type", authorize([Role.User, Role.Admin, Role.AppAdmin]), PaperController.updatePaper);
router.get("/renew/:type/car/:id", authorize([Role.User, Role.Admin, Role.AppAdmin]), PaperController.getPaperDetailsForCar);
router.put("/renew/:type/car/:id", authorize([Role.User, Role.Admin, Role.AppAdmin]), PaperController.renewPaper);
router.delete("/:type/car/:id", authorize([Role.User, Role.Admin, Role.AppAdmin]), PaperController.getPaperDetailsForCar);

module.exports = router;