const User = require("../models").User;
const Role = require("../helpers/role");

const getDetailsById = async (req, res) => {
    let userDetails = await User.findOne({
        attributes: [
            "id",
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
    ).then(res.status(200).send({ message: "User details updated successfully!" }));
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

const getAllAdmins = async (req, res) => {
    try {
        const users = await User.findAll({
            where: { role: Role.AppAdmin }
        });
        return res.status(200).send(users);
    } catch (err) {
        return res.status(404).send({ message: "Not found" });
    }
}

const getAdminDetailsById = async (req, res) => {
    let userDetails = await User.findOne({
        attributes: [
            "email",
            "lastname",
            "firstname",
            "address",
            "phone"
        ], where: { id: req.params.id }
    });

    if (userDetails != null) {
        return res.status(200).send(userDetails);
    }
    return res.status(400).send({ "message": "Something went wrong with the data recieved." })
}

module.exports = {
    getDetailsById,
    updateDetailsById,
    getAllUsersData,
    getAllAdmins,
    getAdminDetailsById,
}