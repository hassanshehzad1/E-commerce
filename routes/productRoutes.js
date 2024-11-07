import express from "express";
const router = express.Router();
import {
  createProduct,
  addToCart,
  addToLike,
} from "../controllers/productController.js";

// Upload using multer
import upload from "../middlewares/multer.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

// Create a product
router.post("/create", upload.single("image"), createProduct);

// Add to cart
router.get("/addtocart/:productId", isLoggedIn, addToCart);
// Add to like
router.get("/addtolike/:productId", isLoggedIn, addToLike);
export default router;
