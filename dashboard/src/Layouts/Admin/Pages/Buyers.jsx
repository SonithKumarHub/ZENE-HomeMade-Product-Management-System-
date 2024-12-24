import { Box } from "@mui/material";
import React from "react";
import Breadcrumbs from "../Components/Banner/Breadcrumbs";
import { useContext } from "react";
import { AdminContext } from "../Context/Context";
import { useEffect } from "react";
import BuyersTable from "../Components/BuyersTable";

export default function Buyers() {
  const { getAllBuyers, allBuyers, host } = useContext(AdminContext);
  useEffect(() => {
    getAllBuyers();
  }, []);
  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ p: 2 }}>
        <Breadcrumbs title={"Buyers"} />
      </Box>
      <Box sx={{ p: 2 }}>
        <BuyersTable allBuyers={allBuyers} host={host} />
      </Box>
    </Box>
  );
}
