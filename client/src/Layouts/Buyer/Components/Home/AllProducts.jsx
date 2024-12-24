import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { TextField, Paper } from "@mui/material";
export default function AllProducts({ categories, products, host }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const productFilter = () => {
      let allProducts = products;

      if (search !== "") {
        allProducts = allProducts.filter((item) =>
          item?.title?.toLowerCase().includes(search?.toLowerCase())
        );
      }

      if (selectedCategory !== "All") {
        allProducts = allProducts.filter(
          (item) => item?.categoryId?._id === selectedCategory
        );
      }

      setFilteredProducts(allProducts);
    };

    productFilter();
  }, [search, selectedCategory, products]);

  console.log(filteredProducts);

  return (
    <div>
      <div className="category-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-7 col-lg-8 col-md-10">
              <div className="section-tittle mb-50">
                <h2>Shop with us</h2>
                <p>Browse from {products?.length} latest items</p>
              </div>
            </div>
          </div>
          <div className="row">
            {/*? Left content */}
            <div className="col-xl-4 col-lg-3 col-md-4">
              {/* Job Category Listing start */}
              <div className="category-listing mb-50">
                {/* single one */}
                <div className="single-listing">
                  {/* Select City items start */}
                  <div className="select-job-items2">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Filter by category
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Filter by category"
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        value={selectedCategory}
                      >
                        <MenuItem value={"All"}>All</MenuItem>
                        {categories?.map((category, index) => (
                          <MenuItem value={category?._id} key={index}>
                            {category?.title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>
              {/* Job Category Listing End */}
            </div>
            <div className="col-xl-8 col-lg-3 col-md-4">
              {/* Job Category Listing start */}
              <div className="category-listing mb-50">
                {/* single one */}
                <div className="single-listing">
                  {/* Select City items start */}
                  <div className="select-job-items2">
                    <TextField
                      onChange={(e) => setSearch(e.target.value)}
                      value={search}
                      type="search"
                      label="Search product here"
                      fullWidth
                    />
                  </div>
                </div>
              </div>
              {/* Job Category Listing End */}
            </div>
            {/*?  Right content */}
            <div className="col-xl-12 col-lg-9 col-md-8">
              {/*? New Arrival Start */}
              <div className="new-arrival new-arrival2">
                <div className="row">
                  {filteredProducts?.length > 0 ? (
                    filteredProducts?.map((item, index) => (
                      <div
                        key={index}
                        className="col-xl-4 col-lg-3 col-md-6 col-sm-6"
                      >
                        <Paper
                          elevation={10}
                          className="single-new-arrival mb-50 text-center wow fadeInUp"
                          data-wow-duration="1s"
                          data-wow-delay=".1s"
                        >
                          <div className="popular-img">
                            <img
                              src={`${host}/uploads/buyer/getImagesFromSeller/${item?.picture}`}
                              alt
                            />
                          </div>
                          <div className="popular-caption">
                            <Link to={`/ProductDetails/${item?._id}`}>
                              <h3 style={{ fontWeight: "600" }}>
                                {item?.title}
                              </h3>
                            </Link>
                            <h6>{item?.categoryId?.title}</h6>
                            {/* <div className="rating mb-10">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                            </div> */}
                            <h5>
                              ₹ {item?.price}/{item?.unitOfMeasure}
                            </h5>
                          </div>
                        </Paper>
                      </div>
                    ))
                  ) : (
                    <Typography>No products found!</Typography>
                  )}
                </div>
              </div>
              {/*? New Arrival End */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
