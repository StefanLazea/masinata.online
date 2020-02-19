const User = require("../models").User;

const findUserByEmail = async (email) => {
    let userFound;
    await User.findOne({
        where: {
            email: email
        }
    }).then((user) => userFound = user);

    return userFound;
}

module.exports = {
    findUserByEmail,
}