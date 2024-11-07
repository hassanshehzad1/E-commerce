import express from "express";

// Importing files
import {
  authRegister,
  authLogin,
  authLogout,
} from "../controllers/authControllers.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
const router = express.Router();

router.get("/shop", isLoggedIn, (req, res) => {
  res.send("HEllo from shop");
});


// Regsiter user
router.post("/register", authRegister);

// Login user
router.post("/login", authLogin);

// Logout user
router.get("/logout", isLoggedIn, authLogout);
export default router;


