import React from "react";
import { useContext } from "react";
import { AdminContext } from "../Context/Context";
import { useEffect } from "react";
import { Box } from "@mui/material";
import Breadcrumbs from "../Components/Banner/Breadcrumbs";
import ProductsTable from "../Components/ProductsTable";

export default function Products() {
  const { allProducts, getAllProducts, updateProduct, host } =
    useContext(AdminContext);
  useEffect(() => {
    getAllProducts();
  }, []);
  console.log(allProducts);
  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ p: 2 }}>
        <Breadcrumbs title={"Products"} />
      </Box>
      <Box sx={{ p: 2 }}>
        <ProductsTable allProducts={allProducts} host={host} />
      </Box>
    </Box>
  );
}
