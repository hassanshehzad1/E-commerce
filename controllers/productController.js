import product_valid_schema from "../helpers/product_valid_schema.js";
import productModel from "../models/product-model.js";
import usersModel from "../models/users-model.js";

export const createProduct = async (req, res) => {
  try {
    //Image does not exist
    if (req.file) {
      req.body.image = req.file.buffer;
    } else {
      req.body.image = null;
    }

    // Joi validation
    const result = await product_valid_schema.validateAsync(req.body);

    // Adding the products in dbs
    const product = await productModel.create(result);
    return res.status(201).redirect("/owner/create/product");

    // Errors
  } catch (error) {
    // Handling joi error
    if (error.isJoi) {
      req.flash("error", "Please Enter a valid details");
      return res.status(422).redirect("/product/create");
    }

    // Servers errors
    console.error("Server Error", error.message);
    return res.status(500).send({
      success: false,
      request: "Request Failed",
      messsage: "Server error   ",
      error: error.message,
    });
  }
};

//! Add to car
export const addToCart = async (req, res) => {
  try {
    const _id = req.params.productId;

    // Finding user
    const user = await usersModel.findOne({ email: req.user.email });
    user.cart.push(_id);
    await user.save();
    req.flash("success", "Product in cart added successfully");
    res.status(201).redirect("/index/shop");

    // Error
  } catch (error) {
    console.error(error);
    req.flash("error", "Error! Product does not added to cart");
    res.status(500).redirect("/index/shop");
  }
};

//! Add to Like
export const addToLike = async (req, res) => {
  try {
    const _id = req.params.productId;

    // Finding user
    const user = await usersModel.findOne({ email: req.user.email });
    user.like.push(_id);
    await user.save();
    req.flash("success", "Product in wishlist added successfully");
    res.status(201).redirect("/index/shop");

    // Error
  } catch (error) {
    console.error(error);
    req.flash("error", "Error! Product does not added to cart");
    res.status(500).redirect("/index/shop");
  }
};
