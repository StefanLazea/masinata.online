const router = require('express').Router();
const User = require("../models").User;
const UserController = require("../controllers/user");
const { authorize } = require("../services/authorize");
const Role = require("../helpers/role");

router.get("/details/:id", authorize([Role.User, Role.Admin, Role.AppAdmin]), UserController.getDetailsById);

router.put("/details/:id", authorize([Role.User, Role.Admin, Role.AppAdmin]), UserController.updateDetailsById);

router.get("/details", authorize([Role.User, Role.Admin, Role.AppAdmin]), UserController.getAllUsersData);

module.exports = router;