const sellerSchema = require("../Models/Seller");
const categorySchema = require("../Models/Category");
const productSchema = require("../Models/Product");
const requestSchema = require("../Models/Request");

const secretKey = "handMadeProductManagementSystem";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const check = await sellerSchema.findOne({ email });
    if (check) {
      res.json({ success: false, message: "Email already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newSeller = await new sellerSchema({
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
    const seller = await sellerSchema.findOne({ email });
    if (!seller) {
      console.log("Email not found");
      res.json({ success: false, message: "Invalid credential!" });
    } else {
      const isMatch = await bcrypt.compare(password, seller.password);
      if (!isMatch) {
        console.log("Password is incorrect");
        res.json({ success: false, message: "Invalid credential!" });
      } else {
        if (seller.status == "Blocked") {
          res.json({ success: false, message: "Your account is blocked!" });
        } else {
          const token = jwt.sign(seller.id, secretKey);
          res.json({ success: true, message: "Login successfully", token });
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
    const seller = await sellerSchema.findById(req.seller);
    if (!seller) {
      console.log("Seller not found");
      res.json({ success: false, message: "Seller not found" });
    } else {
      res.json({
        success: true,
        message: "Profile fetched successfully",
        seller,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const updateProfile = async (req, res) => {
  try {
    const seller = await sellerSchema.findById(req.seller);
    if (!seller) {
      return res
        .status(404)
        .json({ success: false, message: "Account not found!" });
    } else {
      const { name, phone, npassword } = req.body;
      const updatedSeller = {};

      if (req.files && req.files.length > 0) {
        req.files.forEach((file) => {
          if (file.fieldname === "qrCode") {
            updatedSeller.qrCode = file.filename;
          }
          if (file.fieldname === "profile") {
            updatedSeller.profile = file.filename;
          }
        });
      }

      // Update basic fields
      if (name) updatedSeller.name = name;
      if (phone) updatedSeller.phone = phone;

      // Handle password update if provided
      if (npassword) {
        const hashedPassword = await bcrypt.hash(npassword, 10);
        updatedSeller.password = hashedPassword;
      }
      // Perform the update
      await sellerSchema.findByIdAndUpdate(
        req.seller,
        { $set: updatedSeller },
        { new: true }
      );

      res.json({ success: true, message: "Profile updated successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Some internal error!" });
  }
};

const viewAllCategory = async (req, res) => {
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
const insertProduct = async (req, res) => {
  try {
    const {
      title,
      categoryId,
      description,
      price,
      unitOfMeasure,
      adminAmount,
      transactionId,
    } = req.body;
    const picture = req?.file?.filename;
    const check = await productSchema.findOne({
      sellerId: req.seller,
      title: title,
      categoryId: categoryId,
    });
    if (check) {
      res.json({
        success: false,
        message: "Product already exists!",
      });
    } else {
      const checkForTransactionId = await productSchema.findOne({
        transactionId,
      });
      if (checkForTransactionId) {
        res.json({
          success: false,
          message: "Transaction already exists!",
        });
      } else {
        const newProduct = await new productSchema({
          title,
          categoryId,
          sellerId: req.seller,
          description,
          price,
          unitOfMeasure,
          picture,
          adminAmount,
          transactionId,
          status: "Pending",
        }).save();
        res.json({
          success: true,
          message: "New Product inserted!",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const updateProduct = async (req, res) => {
  try {
    var checkProduct = await productSchema.findById(req.params.id);
    if (!checkProduct) {
      res.json({ success: false, message: "Product not found!" });
    } else {
      const {
        title,
        categoryId,
        description,
        price,
        unitOfMeasure,
        adminAmount,
        transactionId,
        status,
      } = req.body;
      const picture = req?.file?.filename;
      const updatedProductInfo = {};
      if (title) updatedProductInfo.title = title;
      if (categoryId) updatedProductInfo.categoryId = categoryId;
      if (description) updatedProductInfo.description = description;
      if (price) updatedProductInfo.price = price;
      if (unitOfMeasure) updatedProductInfo.unitOfMeasure = unitOfMeasure;
      if (adminAmount) updatedProductInfo.adminAmount = adminAmount;
      if (transactionId) updatedProductInfo.transactionId = transactionId;
      if (picture) updatedProductInfo.picture = picture;
      if (status) updatedProductInfo.status = status;
      checkProduct = await productSchema.findByIdAndUpdate(
        req.params.id,
        {
          $set: updatedProductInfo,
        },
        { new: true }
      );
      res.json({
        success: true,
        message: "Product updated!",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const viewAllProducts = async (req, res) => {
  try {
    const products = await productSchema
      .find({ sellerId: req.seller })
      .populate("categoryId");
    res.json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

const getAllRequests = async (req, res) => {
  try {
    const all = await requestSchema
      .find()
      .populate({
        path: "productId",
        populate: [
          { path: "sellerId" }, // Populating the sellerId inside productId
          { path: "categoryId" }, // Populating the categoryId inside productId
        ],
      })
      .populate("buyerId");
    const requests = all.filter(
      (request) => request?.productId?.sellerId?._id == req.seller
    );
    res.json({
      success: true,
      requests,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

const updatedStatus = async (req, res) => {
  try {
    var request = await requestSchema.findById(req.params.id);
    if (!request) {
      res.json({ success: false, message: "Request not found!" });
    } else {
      const updatedRequest = {};
      const { status, paymentStatus } = req.body;
      if (status) updatedRequest.status = status;
      if (paymentStatus) updatedRequest.paymentStatus = paymentStatus;
      request = await requestSchema.findByIdAndUpdate(
        req.params.id,
        { $set: updatedRequest },
        { new: true }
      );
      res.json({ success: true, message: "Request has been updated!" });
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
  viewAllCategory,
  viewAllProducts,
  insertProduct,
  updateProduct,
  getAllRequests,
  updatedStatus,
};
