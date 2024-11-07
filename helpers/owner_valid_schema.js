import joi from "joi";
const owner_valid_scheme = joi.object({
  fullname: joi
    .string()
    .min(10)
    .max(15)
    .trim()
    .required()
    .messages({ "string.empty": " Please input your fullname" }),

  email: joi.string().required().messages({
    "string.empty": "Please input your email address",
    "string.email": "Please provide a valid email address",
  }),
  password: joi.string().min(8).required().messages({
    "string.empty": "Password is required",
    "String.min": "Password must be at least 8 characters long",
  }),
  age: joi.number().min(0).required().messages({
    "number.base": "Input your age",
    "any.required": "Age is required",
  }),
  dob: joi.string().required().messages({
    "string.empty": "Please input your date of birth",
    "any.required": "Dob is required",
  }),
  location: joi.string().default("USA"),
  products: joi.array().default([]),
  pic: joi.string().optional(),
});

export default owner_valid_scheme;
