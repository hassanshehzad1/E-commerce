import joi from "joi";

const product_valid_schema = joi.object({
  name: joi.string().required().messages({
    "string.base": "Product name must be a string",
    "string.empty": "product name is required",
  }),
  image: joi.binary().optional(),
  price: joi.number().min(0).required().messages({
    "number.base": "Product price must be a number",
    "number.min": "Product price must be at least 0",
    "any.required": "Product price is required",
  }),
  brand: joi.string().optional(),
  discountprice: joi.number().min(0).default(0),
  bgcolor: joi.string().optional(),
  panelcolor: joi.string().optional(),
  textcolor: joi.string().optional(),
});

export default product_valid_schema;
