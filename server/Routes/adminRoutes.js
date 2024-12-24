const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  Register,
  Login,
  getProfile,
  getAllBuyers,
  updateBuyerStatus,
  getAllSellers,
  updateSellerStatus,
  updateProfile,
  insertCategory,
  getAllCategory,
  updateCategory,
  getAllFeedbacks,
  getAllProducts,
  updateProduct,
} = require("../Controllers/adminController");
const { VerifyAdminToken } = require("../Middleware/authAdmin");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads/admin");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();

    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/Register", Register);
router.post("/Login", Login);
router.get("/getProfile", VerifyAdminToken, getProfile);
router.put(
  "/updateProfile",
  VerifyAdminToken,
  upload.single("profile"),
  updateProfile
);
router.get("/getAllBuyers", VerifyAdminToken, getAllBuyers);
router.put("/updateBuyerStatus/:id", VerifyAdminToken, updateBuyerStatus);
router.get("/getAllSellers", VerifyAdminToken, getAllSellers);
router.put("/updateSellerStatus/:id", VerifyAdminToken, updateSellerStatus);
router.post("/insertCategory", VerifyAdminToken, insertCategory);
router.get("/getAllCategory", VerifyAdminToken, getAllCategory);
router.get("/getAllFeedbacks", VerifyAdminToken, getAllFeedbacks);
router.put("/updateCategory/:id", VerifyAdminToken, updateCategory);
router.put("/updateProduct/:id", VerifyAdminToken, updateProduct);
router.get("/getAllProducts", VerifyAdminToken, getAllProducts);
module.exports = router;
