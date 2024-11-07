import user_valid_schema from "../helpers/user_valid_schema.js";
import usersModel from "../models/users-model.js";
import { decryptPass, encryptPass } from "../utils/bcrypt.js";
import { generateToken } from "../utils/generateToken.js";

// ! Register user
export const authRegister = async (req, res) => {
  try {
    // Check to validate joi schema
    const result = await user_valid_schema.validateAsync(req.body);
    // Check if email is already registered
    const existingUser = await usersModel.findOne({ email: result.email });
    if (existingUser) {
      req.flash("error", "Email is already registered");
      res.status(409).redirect("/index/register");
    }

    // Hashing the password
    const hashPass = await encryptPass(result.password);
    result.password = hashPass;

    // Add user in dbs
    const user = await usersModel.create(result);

    // Generate token
    const token = generateToken(user);
    res.cookie("token", token);
    req.flash("success", "User registered successfully");
    res.status(201).redirect("/index/login");

    // Errors
  } catch (error) {
    //Joi error
    if (error.isJoi === true) {
      console.error(error.message);
      req.flash("error", "User is already registered");
      return res.status(422).redirect("/index/register");
    }

    console.error(error);
    req.flash("error", "Server error");
    res.status(422).redirect("/index/register");
  }
};

//! login user
export const authLogin = async (req, res) => {
  // Wrapping try catch
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      req.flash("error", "Invalid username and passsword");
      return res.status(422).redirect("/index/login");
    }
    // User
    const user = await usersModel.findOne({ email });
    if (!user) {
      req.flash("error", "Invalid username and password");
      return res.status(404).redirect("/index/login");
    }
    // Matching password
    const isPassValid = await decryptPass(user.password, password);
    if (!isPassValid) {
      req.flash("error", "Invalid username and password");
      return res.status(404).redirect("/index/login");
    }
    // Cookie
    const token = generateToken(user);
    res.cookie("token", token);
    req.flash(
      "success",
      `${user.name} resgistered successfully, Welcome to the shop`
    );
    res.status(201).redirect("/index/shop");

    // Errors
  } catch (error) {
    req.flash("error", "Invalid username and password");
    return res.status(404).redirect("/index/login");
  }
};

// ! logout user
export const authLogout = (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
};
