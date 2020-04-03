const router = require('express').Router();
const authRouter = require('./auth');
const carRouter = require('./cars');
const userRouter = require('./user');
const { authorize } = require("../services/authorize");
const Role = require("../helpers/role");

router.use("/auth", authRouter);
router.use("/cars", authorize(Role.User, Role.Admin, Role.AppAdmin), carRouter);
router.use("/user", authorize(Role.User, Role.Admin, Role.AppAdmin), userRouter);

module.exports = router;