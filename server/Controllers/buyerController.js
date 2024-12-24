const buyerSchema = require("../Models/Buyer");
const feedbackSchema = require("../Models/Feedback");
const categorySchema = require("../Models/Category");
const productSchema = require("../Models/Product");
const requestSchema = require("../Models/Request");

const secretKey = "handMadeProductManagementSystem";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { response } = require("express");

const submitFeedback = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const newFeedback = await new feedbackSchema({
      name,
      email,
      subject,
      message,
    }).save();
    res.json({
      success: true,
      message: "Thank you for your valuable feedback",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const Register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const check = await buyerSchema.findOne({ email });
    if (check) {
      res.json({ success: false, message: "Email already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newBuyer = await new buyerSchema({
        name,
        email,
        phone,
        password: hashedPassword,
        status: "Active",
      }).save();
      res.json({ success: true, message: "Registered successfully" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const buyer = await buyerSchema.findOne({ email });
    if (!buyer) {
      console.log("Email not found");
      res.json({ success: false, message: "Invalid credential!" });
    } else {
      const isMatch = await bcrypt.compare(password, buyer.password);
      if (!isMatch) {
        console.log("Password is incorrect");
        res.json({ success: false, message: "Invalid credential!" });
      } else {
        if (buyer.status == "Blocked") {
          res.json({ success: false, message: "Your account is blocked!" });
        } else {
          const token = jwt.sign(buyer.id, secretKey);
          res.json({ success: true, message: "Logged in successfully", token });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const getProfile = async (req, res) => {
  try {
    const buyer = await buyerSchema.findById(req.buyer);
    if (!buyer) {
      console.log("Buyer not found");
      res.json({ success: false, message: "Buyer not found" });
    } else {
      res.json({
        success: true,
        message: "Profile fetched successfully",
        buyer,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const updateProfile = async (req, res) => {
  try {
    const buyer = await buyerSchema.findById(req.buyer);
    if (!buyer) {
      res.json({ success: false, message: "Account not found!" });
    } else {
      const { name, phone, npassword } = req.body;
      const profile = req?.file?.filename;
      const updatedBuyer = {};
      if (name) updatedBuyer.name = name;
      if (phone) updatedBuyer.phone = phone;
      if (profile) updatedBuyer.profile = profile;
      if (npassword) {
        const hashedPassword = await bcrypt.hash(npassword, 10);
        updatedBuyer.password = hashedPassword;
      }
      await buyerSchema.findByIdAndUpdate(
        req.buyer,
        { $set: updatedBuyer },
        { new: true }
      );
      res.json({ success: true, message: "Profile updated successfully" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const viewAllCategories = async (req, res) => {
  try {
    const categories = await categorySchema.find({ status: "Available" });
    res.json({
      success: true,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

const viewAllProducts = async (req, res) => {
  try {
    const products = await productSchema
      .find({ status: "Available" })
      .populate("categoryId")
      .populate("sellerId");
    res.json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const viewSingleProduct = async (req, res) => {
  try {
    const product = await productSchema
      .findById(req.params.id)
      .populate("categoryId")
      .populate("sellerId");
    if (!product) {
      res.json({ success: false, message: "Product not found!" });
    } else {
      res.json({
        success: true,
        product,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

const requestForProduct = async (req, res) => {
  try {
    const {
      productId,
      name,
      phone,
      email,
      quantity,
      totalAmount,
      message,
      location,
      city,
      pinCode,
      address,
    } = req.body;
    const buyerId = req.buyer;
    const newRequest = await new requestSchema({
      buyerId,
      productId,
      name,
      phone,
      email,
      quantity,
      totalAmount,
      message,
      location,
      city,
      pinCode,
      address,
      status: "Requested",
    }).save();
    res.json({ success: true, message: "Request sent successfully!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const viewAllRequests = async (req, res) => {
  try {
    const requests = await requestSchema.find({ buyerId: req.buyer }).populate({
      path: "productId",
      populate: [
        { path: "sellerId" }, // Populating the sellerId inside productId
        { path: "categoryId" }, // Populating the categoryId inside productId
      ],
    });
    res.json({
      success: true,
      requests,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

const cancelMyRequest = async (req, res) => {
  try {
    var request = await requestSchema.findById(req.params.id);
    if (!request) {
      res.json({ success: false, message: "Request not found!" });
    } else {
      const updatedRequest = {};
      updatedRequest.status = "Cancelled";
      request = await requestSchema.findByIdAndUpdate(
        req.params.id,
        { $set: updatedRequest },
        { new: true }
      );
      res.json({ success: true, message: "Request has been cancelled!" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const payForRequest = async (req, res) => {
  try {
    var request = await requestSchema.findById(req.params.id);
    if (!request) {
      res.json({ success: false, message: "Request not found!" });
    } else {
      const { transactionId } = req.body;
      const updatedRequest = {};
      if (transactionId) updatedRequest.transactionId = transactionId;
      updatedRequest.paymentStatus = "Payment Initiated";
      request = await requestSchema.findByIdAndUpdate(
        req.params.id,
        { $set: updatedRequest },
        { new: true }
      );
      response.json({ success: true, message: "Payment has been initiated!" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const ratingForRequest = async (req, res) => {
  try {
    var request = await requestSchema.findById(req.params.id);
    if (!request) {
      res.json({ success: false, message: "Request not found!" });
    } else {
      const { feedback, rating } = req.body;
      const updatedRequest = {};
      if (feedback) updatedRequest.feedback = feedback;
      if (rating) updatedRequest.rating = rating;
      request = await requestSchema.findByIdAndUpdate(
        req.params.id,
        { $set: updatedRequest },
        { new: true }
      );
      response.json({
        success: true,
        message: "Thank you for your valuable feedback!",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

module.exports = {
  Register,
  Login,
  getProfile,
  updateProfile,
  submitFeedback,
  viewAllCategories,
  viewAllProducts,
  viewSingleProduct,
  requestForProduct,
  viewAllRequests,
  cancelMyRequest,
  payForRequest,
  ratingForRequest,
};
