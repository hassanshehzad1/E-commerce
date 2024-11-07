import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    unique: true,
    trim: true,
  },
  image: {
    type: Buffer,
    default: null,
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: 0,
  },
  brand: {
    type: String,
  },
  discountprice: {
    type: Number,
    default: 0,
  },
  bgcolor: String,
  panelcolor: String,
  textcolor: String,
});

export default mongoose.model("product", productSchema);
