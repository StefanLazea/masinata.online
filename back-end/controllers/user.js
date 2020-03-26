const User = require("../models").User;

const getDetailsById = async (req, res) => {
    let userDetails = await User.findOne({
        attributes: [
            "role",
            "email",
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
    return res.status(400).send({ "message": "Something went wrong with the data recieved." })
};

const updateDetailsById = async (req, res) => {
    userDetails = {
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        address: req.body.address,
        phone: req.body.phone,
        secondAddress: req.body.second_address
    }
    await User.update(
        userDetails,
        {
            where:
                { id: req.params.id }
        }
    ).then(res.status(200).send({ message: "ok", "user": userDetails }));
};

const getAllUsersData = async (req, res) => {
    let userDetails = await User.findAll({
        attributes: [
            "role",
            "lastname",
            "firstname",
            "address",
            "phone"
        ]
    });

    if (userDetails != null) {
        return res.status(200).send(userDetails);
    }
    return res.status(400).send({ "message": "Something went wrong with the data recieved." })
};

module.exports = {
    getDetailsById,
    updateDetailsById,
    getAllUsersData
}