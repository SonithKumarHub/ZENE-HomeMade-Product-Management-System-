const express = require("express");
const connectMongoDb = require("./db");
const cors = require("cors");
connectMongoDb();
const app = express();
app.use(express.json());
app.use(cors());
// buyer
app.use("/buyer", require("./Routes/buyerRoutes"));
app.use("/uploads/buyer", express.static("./Uploads/buyer"));
app.use(
  "/uploads/buyer/getImagesFromSeller",
  express.static("./Uploads/seller")
);
// app.use("/uploads/buyer/getImagesFromAdmin", express.static("./Uploads/admin"));
//seller
app.use("/seller", require("./Routes/sellerRoutes"));
app.use("/uploads/seller", express.static("./Uploads/seller"));
app.use(
  "/uploads/seller/getImagesFromBuyer",
  express.static("./Uploads/buyer")
);

//admin
app.use("/admin", require("./Routes/adminRoutes"));
app.use("/uploads/admin", express.static("./Uploads/admin"));
app.use("/uploads/admin/getImagesFromBuyer", express.static("./Uploads/buyer"));
app.use(
  "/uploads/admin/getImagesFromSeller",
  express.static("./Uploads/seller")
);

const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
