import { Box } from "@mui/material";
import { useContext } from "react";
import { BuyerContext } from "../Context/Context";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import ProductInfo from "../Components/Account/ProductInfo";
import RequestForm from "../Components/Account/RequestForm";
import PageBanner from "../Components/Banner/PageBanner";

export default function RequestProduct() {
  const { singleProduct, viewSingleProduct, host } = useContext(BuyerContext);
  const { id } = useParams();
  useEffect(() => {
    viewSingleProduct(id);
  }, [id]);
  return (
    <Box sx={{ p: 3 }}>
      <Box>
        <PageBanner title={"Request for Product"} />
      </Box>
      {singleProduct && (
        <Box sx={{ p: 3 }}>
          <ProductInfo host={host} singleProduct={singleProduct} />
        </Box>
      )}
      <Box sx={{ p: 3 }}>
        <RequestForm
          price={singleProduct?.price}
          productId={singleProduct?._id}
        />
      </Box>
    </Box>
  );
}
