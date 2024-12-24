import { Box } from "@mui/material";
import React, { useContext, useEffect } from "react";
import HomeBanner from "../Components/Home/HomeBanner";
import NewArrivals from "../Components/Home/NewArrivals";
import CollectionBanner from "../Components/Home/CollectionBanner";
import Services from "../Components/Home/Services";
import { BuyerContext } from "../Context/Context";

export default function Home() {
  const { host, viewAllProducts, products } = useContext(BuyerContext);
  useEffect(() => {
    viewAllProducts();
  }, []);
  const arrivals = products?.slice().reverse().slice(0, 3);
  return (
    <Box>
      <Box sx={{ p: 4 }}>
        <HomeBanner />
      </Box>
      <Box>
        <NewArrivals products={arrivals} host={host} />
      </Box>
      <Box sx={{ p: 4 }}>
        <CollectionBanner />
      </Box>
      <Box>
        <Services />
      </Box>
    </Box>
  );
}
