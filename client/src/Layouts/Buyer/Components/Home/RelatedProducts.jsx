import React from "react";
import { Link } from "react-router-dom";
import { Paper } from "@mui/material";
export default function RelatedProducts({ host, filteredProducts }) {
  return (
    <div>
      <div className="new-arrival">
        <div className="container">
          {/* Section tittle */}
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-8 col-md-10">
              <div
                className="section-tittle mb-60 text-center wow fadeInUp"
                data-wow-duration="2s"
                data-wow-delay=".2s"
              >
                <h4>Related Products</h4>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {filteredProducts?.map((product) => (
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                <div
                  className="single-new-arrival mb-50 text-center wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay=".1s"
                >
                  <div className="popular-img">
                    <img
                      src={`${host}/uploads/buyer/getImagesFromSeller/${product?.picture}`}
                      alt
                    />
                    {/* <div className="favorit-items">
                      <img src="../assets/img/gallery/favorit-card.png" alt />
                    </div> */}
                  </div>
                  <div className="popular-caption">
                    <Link to={`/ProductDetails/${product?._id}`}>
                      <h4 style={{ fontWeight: "600" }}>{product?.title}</h4>
                    </Link>
                    <h5>
                      ₹{product?.price}/{product?.unitOfMeasure}
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
