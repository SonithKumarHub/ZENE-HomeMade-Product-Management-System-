const mongoose = require("mongoose");
const requestSchema = new mongoose.Schema(
  {
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "buyer",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
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
    quantity: {
      type: String,
      require: true,
    },
    totalAmount: {
      type: String,
      require: true,
    },
    message: {
      type: String,
      require: true,
    },
    response: {
      type: String,
      require: true,
    },
    location: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    pinCode: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    transactionId: {
      type: String,
      require: true,
    },
    feedback: {
      type: String,
      require: true,
    },
    rating: {
      type: String,
      require: true,
    },
    paymentStatus: {
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
module.exports = mongoose.model("request", requestSchema);
