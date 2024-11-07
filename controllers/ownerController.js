import owner_valid_scheme from "../helpers/owner_valid_schema.js";
import ownerModel from "../models/owner-model.js";
export const ownerController = async (req, res) => {
  try {
    // Check if any owner exist
    const alreadyOwner = await ownerModel.find();
    if (alreadyOwner.length > 0)
      return res.status(409).send({
        success: false,
        request: " request failed!",
        message: "You are not authorized for this action",
      });

    // Valid on joi schema
    const result = await owner_valid_scheme.validateAsync(req.body);
    // Hashing the password
    const hashPass = await encryptPass(result.password);
    result.password = hashPass;

    // Adding owner in dbs
    const owner = await ownerModel.create(result);

    // Sendig response
    res.status(201).send({
      success: true,
      request: "Request Fulfilled",
      message: "Owner created successfully",
      owner,
    });

    // Handling error
  } catch (error) {
    // Joi validation Error
    if (error.isJoi) {
      console.error("Validation Error:", error.message);
      return res.status(422).send({
        success: false,
        request: "Request failed!",
        message: "Please provide valid details",
        error: error.message,
      });
    }

    // Server error
    console.error(`Server Error ${error.message}`);
    res.status(500).send({
      success: false,
      request: "Request failed!",
      message: "Server Error",
      error: error.message,
    });
  }
};
