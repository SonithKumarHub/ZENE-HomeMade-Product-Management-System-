import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Grid,
  Box,
  Avatar,
  Chip,
  Paper,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import FeedbackIcon from "@mui/icons-material/Feedback";
import { useContext } from "react";
import { BuyerContext } from "../../Context/Context";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
export default function OrderCard({ order }) {
  const { host, cancelMyRequest } = useContext(BuyerContext);
  const { productId, totalAmount, status, quantity } = order;
  // Example handlers (you'll need to define these)
  const handleCancelOrder = (orderId) => {
    cancelMyRequest(orderId);
  };

  const handleFeedback = (orderId) => {
    console.log(`Leave feedback for order ID: ${orderId}`);
  };
  return (
    <Card
      sx={{
        mb: 2,
        p: 2,
        bgcolor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Grid container spacing={2}>
          <Grid item xs={3} display="flex" justifyContent="center">
            <Avatar
              variant="rounded"
              src={`${host}/uploads/buyer/getImagesFromSeller/${productId?.picture}`}
              alt={productId?.title}
              sx={{ width: 100, height: 100 }}
            />
          </Grid>
          <Grid item xs={9}>
            <Box mb={1}>
              <Link to={`/ProductDetails/${productId?._id}`}>
                <h4 variant="h6" component="h4" sx={{ fontWeight: 600 }}>
                  {productId?.title} ({productId?.categoryId?.title})
                </h4>
              </Link>
            </Box>
            <Box mb={1}>
              <h5 variant="body1">
                <strong>Product posted by:</strong> {productId?.sellerId?.name}{" "}
                | {productId?.sellerId?.phone}
              </h5>
            </Box>
            <Box mb={1}>
              <h5 variant="body1">
                Price per {productId?.unitOfMeasure} : ₹{productId?.price}
              </h5>
            </Box>
            <Box mb={1}>
              <h5 variant="body1">Quantity : {quantity}</h5>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Grid container justifyContent="space-between" alignItems="center">
          <h4 variant="body1">
            <strong>Total Amount:</strong> ₹{totalAmount}
          </h4>
          <h6 variant="body2">
            <strong>Status : </strong>
            <span
              style={{
                color: status === "Cancelled" ? "red" : "green",
                fontWeight: "bold",
              }}
            >
              {status}
            </span>
          </h6>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            {(status === "Requested" || status === "Accepted") && (
              <Chip
                variant="contained"
                color="error"
                component={Paper}
                elevation={3}
                icon={<CancelIcon sx={{ fontSize: "25px" }} />}
                onClick={() => handleCancelOrder(order?._id)}
                fullWidth
                sx={{ fontSize: "15px" }}
                label="Cancel Order"
              />
            )}
            {status == "Completed" && (
              <Chip
                variant="contained"
                color="warning"
                component={Paper}
                elevation={3}
                icon={<StarIcon sx={{ fontSize: "20px" }} />}
                onClick={() => handleCancelOrder(order._id)}
                fullWidth
                sx={{ fontSize: "15px" }}
                label={"Rate Order"}
              />
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
