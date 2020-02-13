const Users = require("../models").Users;

const findUserByEmail = async (email) => {
    let userFound;
    await Users.findOne({
        where: {
            email: email
        }
    }).then((user) => userFound = user);

    return userFound;
}

module.exports = {
    findUserByEmail,
}