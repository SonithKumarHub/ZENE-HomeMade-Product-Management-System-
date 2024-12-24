import { Box } from "@mui/material";
import React from "react";
import Breadcrumbs from "../Components/Banner/Breadcrumbs";
import OrderTable from "../Components/OrderTable";
import { useContext } from "react";
import { SellerContext } from "../Context/Context";
import { useEffect } from "react";

export default function Orders() {
  const { getAllRequests, allOrders, host } = useContext(SellerContext);
  useEffect(() => {
    getAllRequests();
  }, []);
  console.log(allOrders);
  return (
    <div>
      <Box sx={{ p: 2 }}>
        <Breadcrumbs title="Orders" />
      </Box>
      <Box sx={{ p: 2 }}>
        <OrderTable allOrders={allOrders} host={host} />
      </Box>
    </div>
  );
}
