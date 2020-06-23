const router = require('express').Router();
const authRouter = require('./auth');
const carRouter = require('./car');
const userRouter = require('./user');
const garageRouter = require('./garage');
const notesRouter = require("./note");
const papersRouter = require("./paper");
const CarController = require("../controllers/car");
const PaperController = require("../controllers/paper.js");
const MailController = require("../controllers/mail.js");
const { authorize } = require("../services/authorize");
const Role = require("../helpers/role");

router.use("/auth", authRouter);
router.use("/cars", authorize([Role.User, Role.Admin, Role.AppAdmin]), carRouter);
router.use("/user", authorize([Role.User, Role.Admin, Role.AppAdmin]), userRouter);
router.use("/garages", authorize([Role.User, Role.Admin, Role.AppAdmin]), garageRouter);
router.use("/notes", authorize([Role.User, Role.Admin, Role.AppAdmin]), notesRouter);
router.use("/papers", authorize([Role.User, Role.Admin, Role.AppAdmin]), papersRouter);

router.post("/email/password", MailController.sendForgotPasswordEmail)

router.get("/car/image/:id", CarController.getCarImage);
router.get("/paper/:type/car/:id", PaperController.getPaperByTypeForCar);
router.get("/check/paper/car/:id", PaperController.checkForPaper);

module.exports = router;