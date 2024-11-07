import express from "express";
import { ownerController } from "../controllers/ownerController.js";

const router = express.Router();

// Development route
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  router.post("/create", ownerController);
}

router.get("/create/product", (req, res) => {
  res.render("createProducts");
});

export default router;
