const jwt = require("jsonwebtoken");
const secretKey = "handMadeProductManagementSystem";

const VerifySellerToken = async (req, res, next) => {
  let token = req.header("auth-token");
  if (!token) {
    return res.json({
      success: false,
      message: "Please authenticate using valid token",
    });
  }
  try {
    const sellerId = jwt.verify(token, secretKey);
    req.seller = sellerId;
    next();
  } catch (err) {
    return res.json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { VerifySellerToken };
