// Using joi schema for users

import joi from "joi";

const user_valid_schema = joi.object({
  fullname: joi.string().min(10).max(20).trim().required().messages({
    "string.base": "Fullname must be a string",
    "string.empty": "Please input your full name",
    "string.min": "Full name must be at least 10 characters long",
    "string.max": "Full name must be at most 15 characters long",
  }),
  email: joi.string().email().required().messages({
    "string.email": "Please input valid email address",
    "any.required": "Email is required",
  }),
  password: joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters long",
    "any.required": "Password is required",
  }),
  age: joi.number().integer().required().messages({
    "number.base": "Age must be a number",
    "any.required": "Age must be required",
  }),
  dob: joi.string().required().messages({
    "string.empty": "Please input your date of birth",
    "any.required": "Date of birth is required",
  }),
  location: joi.string().default("USA").messages({
    "string.base": "Location must be a string",
  }),
  cart: joi.array().items(joi.any()).default([]),
  like: joi.array().items(joi.any()).default([]),
  orders: joi.array().items(joi.any()).default([]),
  tel: joi.number().required().messages({
    "number.base": "Contact details must be a number",
    "any.required": "Please enter your contact details",
  }),
  pic: joi.string().optional(),
});
export default user_valid_schema;
