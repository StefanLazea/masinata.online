const Joi = require('@hapi/joi');

let schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().messages({
        "string.empty": `"password" should be formed with letters and numbers`
    }),
    repeat_password: Joi.any().valid(Joi.ref('password')).required().messages({
        "any.only": `"repeat_password" should match password field`
    })
});

let options = { abortEarly: false };


const validateUser = (credentials) => {
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

module.exports = {
    validateUser,
}
