const router = require('express').Router();
const UserController = require("../controllers/user");
const { authorize } = require("../services/authorize");
const Role = require("../helpers/role");

router.get("/details/:id", authorize([Role.User, Role.Admin, Role.AppAdmin]), UserController.getDetailsById);
router.put("/details/:id", authorize([Role.User, Role.Admin, Role.AppAdmin]), UserController.updateDetailsById);
router.get("/details", authorize([Role.User, Role.Admin, Role.AppAdmin]), UserController.getAllUsersData);
router.get("/admin/:id", authorize([Role.User, Role.Admin, Role.AppAdmin]), UserController.getAdminDetailsById);
router.get("/admins", authorize([Role.User, Role.Admin, Role.AppAdmin]), UserController.getAllAdmins);
router.delete("/:id", authorize([Role.User, Role.Admin, Role.AppAdmin]), UserController.deleteUser);

module.exports = router;