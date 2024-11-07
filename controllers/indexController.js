import productModel from "../models/product-model.js";
import usersModel from "../models/users-model.js";

export const productDisplay = async (req, res) => {
  try {
    // Getting products
    const products = await productModel.find();

    res.render("shop", { products });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      success: false,
      request: "Request failed",
      message: "Server Error",
      error: error.message,
    });
  }
};

// Cart display
export const cartDisplay = async (req, res) => {
  try {
    const userCarts = await usersModel
      .findOne({ email: req.user.email })
      .populate("cart");

    // Let grouping the element on the name of their product
    const groupProducts = userCarts.cart.reduce((acc, curr) => {
      const productId = curr._id.toString();

      // Check if product is already in it or not
      if (!acc[productId]) {
        // Setting the product id
        acc[productId] = {
          // Convert doc to plain text
          ...curr.toObject(),
          image: curr.image
            ? Buffer.from(curr.image.buffer).toString("base64") // Convert ArrayBuffer to Buffer, then to base64
            : null, // Handle case where image might not exist
          quantity: 1,
        };
      } else {
        // Increament if already exist
        acc[productId].quantity += 1;
      }
      return acc;
    }, {});

    // Converting group products back to object
    const uniqueProducts = Object.values(groupProducts);

    // Total price
    const totalPrice = uniqueProducts.reduce((sum, product) => {
      return sum + product.price * product.quantity;
    }, 0);
    // Returning result
    return res
      .status(200)
      .render("cart", { userCarts: uniqueProducts, totalPrice });

    // Error
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      request: "Request Failed!",
      message: "Server Error",
      error: error,
    });
  }
};

// ! like display
export const likeDisplay = async (req, res) => {
  try {
    let userLikes = await usersModel
      .findOne({ email: req.user.email })
      .populate("like");

    // Returning result
    return res.status(200).render("like", { userLikes: userLikes.like });

    // Error
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      request: "Request Failed!",
      message: "Server Error",
      error: error,
    });
  }
};
