import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import Breadcrumbs from "../Components/Banner/Breadcrumbs";
import Insert from "../Components/Product/Insert";
import ViewAll from "../Components/Product/ViewAll";
import { useEffect } from "react";
import { useContext } from "react";
import { SellerContext } from "../Context/Context";

export default function Products() {
  const { viewAllCategory, viewAllProducts, allCategories, allProducts, host } =
    useContext(SellerContext);
  useEffect(() => {
    viewAllProducts();
    viewAllCategory();
  }, []);
  const [show, setShow] = useState(false);
  const [selectedSProduct, setSelectedSProduct] = useState(null);

  const handleChangeShow = () => {
    setShow(!show);
    setSelectedSProduct(null);
  };
  // console.log(selectedSProduct);
  return (
    <div>
      <Box sx={{ p: 2 }}>
        <Breadcrumbs title="Products" />
      </Box>
      <Box sx={{ p: 2 }}>
        <Insert
          categories={allCategories}
          data={selectedSProduct}
          show={show}
          setShow={setShow}
        />
      </Box>
      <Box sx={{ p: 2, mb: 3 }}>
        <Button
          onClick={handleChangeShow}
          color={show ? "error" : "primary"}
          sx={{ float: "right" }}
        >
          {show ? "Cancel" : "Insert New"}
        </Button>
      </Box>
      <Box sx={{ p: 2 }}>
        <ViewAll
          products={allProducts}
          setSelectedSProduct={setSelectedSProduct}
          show={show}
          setShow={setShow}
          host={host}
        />
      </Box>
    </div>
  );
}
