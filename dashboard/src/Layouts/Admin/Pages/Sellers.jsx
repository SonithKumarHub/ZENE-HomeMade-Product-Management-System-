import { Box } from "@mui/material";
import React from "react";
import Breadcrumbs from "../Components/Banner/Breadcrumbs";
import SellerTable from "../Components/SellerTable";
import { useContext } from "react";
import { AdminContext } from "../Context/Context";
import { useEffect } from "react";

export default function Sellers() {
  const { getAllSellers, allSellers, host } = useContext(AdminContext);
  useEffect(() => {
    getAllSellers();
  }, []);
  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ p: 2 }}>
        <Breadcrumbs title={"Sellers"} />
      </Box>
      <Box sx={{ p: 2 }}>
        <SellerTable allSellers={allSellers} host={host} />
      </Box>
    </Box>
  );
}
