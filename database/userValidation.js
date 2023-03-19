const Joi = require('joi');


const userSignUp = data => {
    let schema = Joi.object({
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).required(),
        email: Joi.string().email().required().min(5),
        password: Joi.string().min(6).required()
    })

    return schema.validate(data);
};

const userSignIn = data => {
    let schema = Joi.object({
        email: Joi.string().email().required().min(2),
        password: Joi.string().required().min(6)
    })

    return schema.validate(data);
};

module.exports = {
    userSignUp,
    userSignIn
}