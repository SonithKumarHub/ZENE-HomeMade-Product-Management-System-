const mongoose = require("mongoose");
const buyerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    profile: {
      type: String,
      default: "buyer.jpg", // Replace with your default image URL
    },
    status: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("buyer", buyerSchema);
