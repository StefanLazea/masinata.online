const router = require('express').Router();
const authRouter = require('./auth');
const carRouter = require('./car');
const userRouter = require('./user');
const garageRouter = require('./garage');
const notesRouter = require("./note");
const { authorize } = require("../services/authorize");
const Role = require("../helpers/role");

router.use("/auth", authRouter);
router.use("/cars", authorize(Role.User, Role.Admin, Role.AppAdmin), carRouter);
router.use("/user", authorize(Role.User, Role.Admin, Role.AppAdmin), userRouter);
router.use("/garages", authorize(Role.User, Role.Admin, Role.AppAdmin), garageRouter);
router.use("/notes", authorize(Role.User, Role.Admin, Role.AppAdmin), notesRouter);


module.exports = router;