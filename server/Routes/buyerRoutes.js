const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
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
} = require("../Controllers/buyerController");
const { VerifyBuyerToken } = require("../Middleware/authBuyer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads/buyer");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();

    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/Register", Register);
router.post("/submitFeedback", submitFeedback);
router.post("/Login", Login);
router.get("/getProfile", VerifyBuyerToken, getProfile);
router.get("/viewAllProducts", viewAllProducts);
router.get("/viewSingleProduct/:id", viewSingleProduct);
router.get("/viewAllCategories", viewAllCategories);
router.put(
  "/updateProfile",
  VerifyBuyerToken,
  upload.single("profile"),
  updateProfile
);
router.post("/requestForProduct", VerifyBuyerToken, requestForProduct);
router.get("/viewAllRequests", VerifyBuyerToken, viewAllRequests);
router.put("/cancelMyRequest/:id", VerifyBuyerToken, cancelMyRequest);
router.put("/payForRequest/:id", VerifyBuyerToken, payForRequest);
router.put("/ratingForRequest/:id", VerifyBuyerToken, ratingForRequest);
module.exports = router;
