import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import Breadcrumbs from "../Components/Banner/Breadcrumbs";
import Counts from "../Components/Dashboard/Counts";
import OrderTable from "../Components/OrderTable";
import SellerAlert from "../Components/Dashboard/Alert";
import { SellerContext } from "../Context/Context";

export default function Dashboard() {
  const { seller } = useContext(SellerContext);
  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ p: 2 }}>
        <Breadcrumbs title="Dashboard" />
      </Box>
      {!seller?.qrCode && (
        <Box sx={{ p: 2 }}>
          <SellerAlert />
        </Box>
      )}
      <Box sx={{ p: 2 }}>
        <Counts />
      </Box>
      <Box sx={{ p: 2 }}>
        <Typography color="text.secondary" sx={{ p: 1 }}>
          Recent Orders
        </Typography>
        <OrderTable />
      </Box>
    </Box>
  );
}
