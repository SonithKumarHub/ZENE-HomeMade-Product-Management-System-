import { Box } from "@mui/material";
import React from "react";
import PageBanner from "../Components/Banner/PageBanner";
import MyOrders from "../Components/Orders/MyOrders";
import { useContext } from "react";
import { BuyerContext } from "../Context/Context";
import { useEffect } from "react";

export default function Orders() {
  const { orders, viewAllRequests } = useContext(BuyerContext);
  useEffect(() => {
    viewAllRequests();
  }, []);
  return (
    <Box>
      <Box>
        <PageBanner title={"Order History"} />
      </Box>
      <Box>
        <MyOrders orders={orders} />
      </Box>
    </Box>
  );
}
