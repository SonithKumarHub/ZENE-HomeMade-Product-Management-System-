import React from "react";
import { Box, Typography } from "@mui/material";
import picture from "../../Assets/noOrderFound.jpg";
export default function OrderNotFound() {
  return (
    <Box sx={{ p: 5 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img src={picture} style={{ width: 250 }} alt="" />
        <h5 style={{ fontWeight: "600" }}>No orders found!</h5>
      </Box>
    </Box>
  );
}
