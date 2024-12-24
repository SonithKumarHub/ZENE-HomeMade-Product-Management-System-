const jwt = require("jsonwebtoken");
const secretKey = "handMadeProductManagementSystem";

const VerifyBuyerToken = async (req, res, next) => {
  let token = req.header("auth-token");
  if (!token) {
    return res.json({
      success: false,
      message: "Please authenticate using valid token",
    });
  }
  try {
    const buyerId = jwt.verify(token, secretKey);
    req.buyer = buyerId;
    next();
  } catch (err) {
    return res.json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { VerifyBuyerToken };
