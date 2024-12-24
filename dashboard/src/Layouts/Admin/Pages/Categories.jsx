import { Box, Button } from "@mui/material";
import React from "react";
import Breadcrumbs from "../Components/Banner/Breadcrumbs";
import { useContext } from "react";
import { AdminContext } from "../Context/Context";
import { useEffect } from "react";
import CategoryTable from "../Components/CategoryTable";
import { useState } from "react";
import InsertCategory from "../Components/InsertCategory";

export default function Categories() {
  const { getAllCategory, allCategories, host } = useContext(AdminContext);
  const [show, setShow] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  useEffect(() => {
    getAllCategory();
  }, []);
  const handleChange = () => {
    if (show) {
      setShow(false);
      setSelectedCategory(null);
    } else {
      setShow(true);
    }
  };
  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ p: 2 }}>
        <Breadcrumbs title={"Categories"} />
      </Box>
      <Box sx={{ p: 2 }}>
        <Button
          color={show ? "error" : "primary"}
          sx={{ float: "right" }}
          onClick={handleChange}
        >
          {show ? "Cancel" : "Insert"}
        </Button>
      </Box>
      {show && (
        <Box sx={{ p: 2 }}>
          <InsertCategory
            data={selectedCategory}
            setShow={setShow}
            setSelectedCategory={setSelectedCategory}
          />
        </Box>
      )}
      <Box sx={{ p: 2 }}>
        <CategoryTable
          show={show}
          setShow={setShow}
          allCategories={allCategories}
          setSelectedCategory={setSelectedCategory}
        />
      </Box>
    </Box>
  );
}
