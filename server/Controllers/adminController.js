const adminSchema = require("../Models/Admin");
const buyerSchema = require("../Models/Buyer");
const sellerSchema = require("../Models/Seller");
const categorySchema = require("../Models/Category");
const productSchema = require("../Models/Product");
const feedbackSchema = require("../Models/Feedback");

const secretKey = "handMadeProductManagementSystem";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const check = await adminSchema.findOne({ email });
    if (check) {
      res.json({ success: false, message: "Email already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = await new adminSchema({
        name,
        email,
        password: hashedPassword,
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
    const admin = await adminSchema.findOne({ email });
    if (!admin) {
      console.log("Email not found");
      res.json({ success: false, message: "Invalid credential!" });
    } else {
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        console.log("Password is incorrect");
        res.json({ success: false, message: "Invalid credential!" });
      } else {
        const token = jwt.sign(admin.id, secretKey);
        res.json({ success: true, message: "Login successfully", token });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const getProfile = async (req, res) => {
  try {
    const admin = await adminSchema.findById(req.admin);
    if (!admin) {
      console.log("Admin not found");
      res.json({ success: false, message: "Admin not found" });
    } else {
      res.json({
        success: true,
        message: "Profile fetched successfully",
        admin,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const updateProfile = async (req, res) => {
  try {
    const admin = await adminSchema.findById(req.admin);
    if (!admin) {
      res.json({ success: false, message: "Account not found!" });
    } else {
      const { name, email, npassword } = req.body;
      const profile = req?.file?.filename;
      const updatedAdmin = {};
      if (name) updatedAdmin.name = name;
      if (email) updatedAdmin.email = email;
      if (profile) updatedAdmin.profile = profile;
      if (npassword) {
        const hashedPassword = await bcrypt.hash(npassword, 10);
        updatedAdmin.password = hashedPassword;
      }
      await adminSchema.findByIdAndUpdate(
        req.admin,
        { $set: updatedAdmin },
        { new: true }
      );
      res.json({ success: true, message: "Profile updated successfully" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const getAllBuyers = async (req, res) => {
  try {
    const buyers = await buyerSchema.find();
    res.json({
      success: true,
      buyers,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const updateBuyerStatus = async (req, res) => {
  try {
    let check = await buyerSchema.findById(req.params.id);
    if (check) {
      const { status } = req.body;
      const updatedBuyer = {};
      if (status) {
        updatedBuyer.status = status;
      }
      await buyerSchema.findByIdAndUpdate(
        req.params.id,
        {
          $set: updatedBuyer,
        },
        { new: true }
      );
      res.json({
        success: true,
        message: "Buyer status updated successfully",
      });
    } else {
      res.json({ success: false, message: "Buyer not found" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

const getAllSellers = async (req, res) => {
  try {
    const sellers = await sellerSchema.find();
    res.json({
      success: true,
      sellers,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const updateSellerStatus = async (req, res) => {
  try {
    let check = await sellerSchema.findById(req.params.id);
    if (check) {
      const { status } = req.body;
      const updatedSeller = {};
      if (status) {
        updatedSeller.status = status;
      }
      await sellerSchema.findByIdAndUpdate(
        req.params.id,
        {
          $set: updatedSeller,
        },
        { new: true }
      );
      res.json({
        success: true,
        message: "Seller status updated successfully",
      });
    } else {
      res.json({ success: false, message: "Seller not found" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const insertCategory = async (req, res) => {
  try {
    const { title } = req.body;
    const check = await categorySchema.findOne({ title });
    if (check) {
      res.json({ success: false, message: "Category already exists" });
    } else {
      const newCategory = await new categorySchema({
        title,
        status: "Available",
      }).save();
      res.json({ success: true, message: "New category added successfully" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const getAllCategory = async (req, res) => {
  try {
    const categories = await categorySchema.find();
    res.json({
      success: true,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await feedbackSchema.find();
    res.json({
      success: true,
      feedbacks,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const updateCategory = async (req, res) => {
  try {
    let check = await categorySchema.findById(req.params.id);
    if (check) {
      const { title, status } = req.body;
      const updatedCategory = {};
      if (title) {
        updatedCategory.title = title;
      }
      if (status) {
        updatedCategory.status = status;
      }
      await categorySchema.findByIdAndUpdate(
        req.params.id,
        {
          $set: updatedCategory,
        },
        { new: true }
      );
      res.json({
        success: true,
        message: "Category updated successfully",
      });
    } else {
      res.json({ success: false, message: "category not found" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const getAllProducts = async (req, res) => {
  try {
    const products = await productSchema
      .find()
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
const updateProduct = async (req, res) => {
  try {
    var checkProduct = await productSchema.findById(req.params.id);
    if (!checkProduct) {
      res.json({ success: false, message: "Product not found!" });
    } else {
      const { status } = req.body;
      const updatedProductInfo = {};
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
        message: "Product status updated!",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
// const getAllBookings = async (req, res) => {
//   try {
//     const allBookings = await bookingSchema
//       .find()
//       .populate("customerId")
//       .populate({
//         path: "serviceId",
//         populate: {
//           path: "companyId",
//         },
//       });
//     const bookings = allBookings?.filter((item) => item?.status != "Cancelled");
//     res.json({
//       success: true,
//       bookings,
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Some internal error!" });
//   }
// };
// const getCounts = async (req, res) => {
//   try {
//     const customers = await customerSchema.find({ status: "Active" });
//     const companies = await companySchema.find({ status: "Active" });
//     const services = await serviceSchema.find({ status: "Available" });
//     const allBookings = await bookingSchema.find();
//     const bookings = allBookings?.filter((item) => item?.status != "Cancelled");
//     res.json({
//       success: true,
//       customers: customers.length,
//       companies: companies.length,
//       services: services.length,
//       bookings: bookings.length,
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Some internal error!" });
//   }
// };
module.exports = {
  Register,
  Login,
  getProfile,
  updateProfile,
  getAllBuyers,
  updateBuyerStatus,
  getAllSellers,
  updateSellerStatus,
  insertCategory,
  getAllCategory,
  updateCategory,
  getAllFeedbacks,
  getAllProducts,
  updateProduct,
};
