// import modules
import express from "express";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import flash from "connect-flash";
import dotEnv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
dotEnv.config();

// Importing files
import userRoutes from "./routes/userRoutes.js";
import ownerRoutes from "./routes/ownerRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import indexRoute from "./routes/indexRoute.js";
import connectWIthMong from "./config/db/conn.js";
import flashMiddle from "./middlewares/flashMiddle.js";

// Connect with dbs
connectWIthMong();

// express object
const app = express();

// Create a filename and dirname in varaibles
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// View engines
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());

// Express session
app.use(
  expressSession({
    secret: process.env.SECRET_EXPRESS_SESSION_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flashMiddle);

// Express routes
app.use("/", indexRoute);
app.use("/user", userRoutes);
app.use("/owner", ownerRoutes);
app.use("/product", productRoutes);

// Listening
app.listen(3000, () => {
  console.log(`Your app in development mode is runnning on port 3000`);
});
