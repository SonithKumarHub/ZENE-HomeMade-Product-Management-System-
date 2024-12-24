import { Box } from "@mui/material";
import React, { useContext, useEffect } from "react";
import PageBanner from "../Components/Banner/PageBanner";
import Services from "../Components/Home/Services";
import ProductDetails from "../Components/Home/ProductDetails";
import RelatedProducts from "../Components/Home/RelatedProducts";
import { useParams } from "react-router-dom";
import { BuyerContext } from "../Context/Context";
export default function SingleProduct() {
  const { singleProduct, viewSingleProduct, host, viewAllProducts, products } =
    useContext(BuyerContext);
  const { id } = useParams();
  useEffect(() => {
    viewSingleProduct(id);
    viewAllProducts();
  }, [id]);
  console.log(singleProduct);
  console.log(products);
  const filteredProducts = products
    ?.filter(
      (item) =>
        item.categoryId?._id == singleProduct?.categoryId?._id &&
        item?._id != id
    )
    .slice()
    .reverse()
    .slice(0, 3);
  return (
    <Box>
      <Box>
        <PageBanner title={"Product Details"} />
      </Box>
      <Box sx={{ pt: 2, pb: 4 }}>
        <ProductDetails singleProduct={singleProduct} host={host} />
      </Box>
      {filteredProducts?.length >= 2 && (
        <Box sx={{ pt: 2, pb: 4 }}>
          <RelatedProducts filteredProducts={filteredProducts} host={host} />
        </Box>
      )}
      <Box>
        <Services />
      </Box>
    </Box>
  );
}
