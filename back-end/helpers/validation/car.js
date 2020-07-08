const Joi = require('@hapi/joi');

let schemaCreation = Joi.object({
    model: Joi.string().min(3).required(),
    brand: Joi.string().min(3).required(),
    type: Joi.string().min(3).required(),
    licence_plate: Joi.string().min(6).max(7).required(),
    mileage: Joi.string().pattern(new RegExp('^[0-9]+$')).max(10).required().messages({
        "string.empty": `"mileage" should be formed with numbers`
    }),
    vin: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().messages({
        "string.empty": `"vin" should be formed only with letters and numbers`
    }),
    engine_type: Joi.string().min(3).allow(''),
    engine_capacity: Joi.string().min(3).required(),
    year: Joi.string().pattern(new RegExp('^[0-9]+$')).max(10).required().messages({
        "string.empty": `"mileage" should be formed with numbers`
    }),
    pollution_grade: Joi.string().min(3).allow(''),
    avatar_photo: Joi.string().allow(''),
    eco: Joi.boolean(),
    userId: Joi.string(),
    garageId: Joi.string().allow(null),
});

let options = { abortEarly: false };

const validateCreation = (form) => {
    const { error, value } = schemaCreation.validate(form, options);
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

const validateUpdate = (userDetails) => {
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
    validateCreation,
    validateUpdate,
}
