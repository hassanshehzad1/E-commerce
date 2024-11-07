import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { productDisplay, cartDisplay,likeDisplay } from "../controllers/indexController.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

// Register
router.get("/index/register", (req, res) => {
  res.render("register");
});

// Login
router.get("/index/login", (req, res) => {
  res.render("login");
});

// Shop
router.get("/index/shop", isLoggedIn, productDisplay);

// Cart
router.get("/index/cart", isLoggedIn, cartDisplay);

// Likes
router.get("/index/like", isLoggedIn, likeDisplay);
export default router;
