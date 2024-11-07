import mongoose, { mongo, Schema } from "mongoose";

const UsersSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Please input your fullname"],
      maxlength: 20,
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
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    ],
    like: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    ],
    orders: {
      type: Array,
      default: [],
    },

    tel: {
      type: Number,
      required: [true, "Please enter your contact details"],
      unique: true,
    },
    pic: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("user", UsersSchema);
