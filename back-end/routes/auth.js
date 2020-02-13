const router = require('express').Router();

router.get("/login", (req, res) => {
    res.status(200).send({ message: "iaaa" })
})
module.exports = router;