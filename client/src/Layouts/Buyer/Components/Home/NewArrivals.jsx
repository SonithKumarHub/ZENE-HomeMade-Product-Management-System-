import React from "react";
import { Link } from "react-router-dom";
export default function NewArrivals({ products, host }) {
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
                <h2>
                  new
                  <br />
                  arrival
                </h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {products?.map((product, index) => (
              <div key={index} className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                <div
                  className="single-new-arrival mb-50 text-center wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay=".1s"
                >
                  <div className="popular-img">
                    <img
                      style={{ height: "35vh", width: "100%" }}
                      src={`${host}/uploads/buyer/getImagesFromSeller/${product?.picture}`}
                      alt
                    />
                  </div>
                  <div className="popular-caption">
                    <Link to={`/ProductDetails/${product?._id}`}>
                      <h3 style={{ fontWeight: "600" }}>{product?.title}</h3>
                    </Link>
                    <h5>
                      ₹ {product?.price}/{product?.unitOfMeasure}
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Button */}
          <div className="row justify-content-center">
            <div className="room-btn">
              <Link to="/Products" className="border-btn">
                Browse More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
