const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "seller",
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: String,
      require: true,
    },
    unitOfMeasure: {
      type: String,
      require: true,
    },
    picture: {
      type: String,
      require: true,
    },
    adminAmount: {
      type: String,
      require: true,
    },
    transactionId: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("product", productSchema);
