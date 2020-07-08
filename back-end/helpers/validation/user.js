const Joi = require('@hapi/joi');

let isAdmin;
let schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().messages({
        "string.empty": `"password" should be formed with letters and numbers`
    }),
    repeat_password: Joi.any().valid(Joi.ref('password')).required().messages({
        "any.only": `"repeat_password" should match password field`
    }),
    companyName: isAdmin === true ? Joi.string().min(3) : Joi.string().allow('')
});

let userDetailsSchema = Joi.object({
    lastname: Joi.string().alphanum().min(3).max(20).required(),
    firstname: Joi.string().alphanum().min(3).max(20).required(),
    address: Joi.string().min(3).required(),
    phone: Joi.string().pattern(new RegExp('^[0-9]+$')).max(10).required()
});

let options = { abortEarly: false };

const validateUser = (credentials, isPaperAdmin) => {
    isAdmin = isPaperAdmin;
    const { error, value } = schema.validate(credentials, options);
    let errors = {};
    if (error) {
        error.details.forEach((errorItem) => {
            let message = errorItem.message;
            key = message.split('"')[1];
            message = message.split('"').join("");
            errors[key] = message;
        })
        return errors;
    }
}

const validateUserDetails = (userDetails) => {
    const { error, value } = userDetailsSchema.validate(userDetails, options);
    let errors = {};
    if (error) {
        error.details.forEach((errorItem) => {
            let message = errorItem.message;
            key = message.split('"')[1];
            message = message.split('"').join("");
            errors[key] = message;
        })
        return errors;
    }
}

module.exports = {
    validateUser,
    validateUserDetails,
}
