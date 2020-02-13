const router = require('express').Router();
const authRouter = require('./auth');

router.get("/hello", (req, res) => {
    res.status(200).send({ message: "Hello boss" });
})

router.use("/auth", authRouter);

module.exports = router;
