const router = require('express').Router();
const { authorize } = require("../services/authorize");
const Role = require("../helpers/role");
const PaperController = require("../controllers/paper");

router.get("/", authorize([Role.User, Role.Admin, Role.AppAdmin]), PaperController.getPapersForCar);
router.post("/", authorize([Role.User, Role.Admin, Role.AppAdmin]), PaperController.createPaperForCar);
module.exports = router;