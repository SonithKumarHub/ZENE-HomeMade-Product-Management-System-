import { Box } from "@mui/material";
import React, { useContext, useEffect } from "react";
import Services from "../Components/Home/Services";
import PageBanner from "../Components/Banner/PageBanner";
import AllProducts from "../Components/Home/AllProducts";
import { BuyerContext } from "../Context/Context";

export default function Products() {
  const { viewAllCategories, viewAllProducts, categories, products, host } =
    useContext(BuyerContext);
  useEffect(() => {
    viewAllCategories();
    viewAllProducts();
  }, []);
  // console.log(categories);
  // console.log(products);
  return (
    <Box>
      <Box>
        <PageBanner title={"Products"} />
      </Box>
      <Box>
        <AllProducts categories={categories} products={products} host={host} />
      </Box>
      <Box>
        <Services />
      </Box>
    </Box>
  );
}
