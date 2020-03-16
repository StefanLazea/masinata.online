const router = require('express').Router();
const User = require("../models").User;
const { authorize } = require("../services/authorize");
const Role = require("../helpers/role");

router.get("/details/:id", authorize([Role.User, Role.Admin, Role.AppAdmin]), async (req, res) => {
    let userDetails = await User.findOne({
        attributes: [
            "role",
            "lastname",
            "firstname",
            "address",
            "phone"
        ], where: {
            id: req.params.id
        }
    });

    if (userDetails != null) {
        return res.status(200).send(userDetails);
    }
    return res.status(400).send({ "message": "Data unclear" })

});

module.exports = router;