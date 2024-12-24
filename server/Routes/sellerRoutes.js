const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
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
} = require("../Controllers/sellerController");
const { VerifySellerToken } = require("../Middleware/authSeller");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads/seller");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();

    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/Register", Register);
router.post("/Login", Login);
router.get("/getProfile", VerifySellerToken, getProfile);
router.put("/updateProfile", VerifySellerToken, upload.any(), updateProfile);
router.get("/viewAllCategory", VerifySellerToken, viewAllCategory);
//product
router.post(
  "/insertProduct",
  VerifySellerToken,
  upload.single("picture"),
  insertProduct
);
router.put(
  "/updateProduct/:id",
  VerifySellerToken,
  upload.single("picture"),
  updateProduct
);
router.get("/viewAllProducts", VerifySellerToken, viewAllProducts);
router.get("/getAllRequests", VerifySellerToken, getAllRequests);
router.put("/updatedStatus/:id", VerifySellerToken, updatedStatus);
module.exports = router;
