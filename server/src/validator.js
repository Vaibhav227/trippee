import Joi from "joi"




const validator = (schema) => (payload) =>
    schema.validate(payload, { abortEarly: false });


const signupSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(10).required(),
    username: Joi.string().alphanum()
        .min(3)
        .max(30)
        .required().required(),
    phone: Joi.number().integer(),
    age: Joi.number()
        .integer()
        .min(18),

})
export const validateSignup = validator(signupSchema);