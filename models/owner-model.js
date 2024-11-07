import mongoose from "mongoose";

const ownerSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Please input your fullname"],
      maxlength: 15,
      trim: true,
      minlength: 10,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please input your email address"],
      unique: true,
    },
    password: {
      type: String,
      minlength: 8,
      required: [true, "Password is required"],
    },
    age: {
      type: Number,
      trim: true,
      required: [true, "Input your age"],
    },
    dob: {
      type: String,
      required: [true, "Please input your date of birth"],
    },
    location: {
      type: String,
      default: "USA",
    },
    products: {
      type: Array,
      default: [],
    },
    pic: String,
    gstpk: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("owner", ownerSchema);
