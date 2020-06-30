const router = require('express').Router();
const NotificationController = require("../controllers/notification");

router.post("/subscribe", NotificationController.subscribe);

module.exports = router;