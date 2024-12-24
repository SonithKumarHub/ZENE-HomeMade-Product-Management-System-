import React, { useContext } from "react";
import { BuyerContext } from "../../Context/Context";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
export default function ProductDetails({ host, singleProduct }) {
  const { buyer } = useContext(BuyerContext);
  return (
    <div>
      <div className="directory-details pt-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="gallery-img">
                <div className="row">
                  <div className="col-lg-5">
                    <img
                      src={`${host}/uploads/buyer/getImagesFromSeller/${singleProduct?.picture}`}
                      className="mb-30"
                      alt
                    />
                  </div>
                  <div className="col-lg-7 mt-3">
                    <div className="small-tittle mb-20">
                      <h2>{singleProduct?.title}</h2>
                    </div>
                    <div className="small-tittle mb-20">
                      <h2>
                        ₹{singleProduct?.price} per{" "}
                        {singleProduct?.unitOfMeasure}
                      </h2>
                    </div>
                    <div className="small-tittle ">
                      <h3>Description</h3>
                    </div>
                    <p>{singleProduct?.description}</p>
                    <div className="small-tittle pt-5">
                      <h5>posted by</h5>
                      <div className="card p-3 d-flex justify-content-between align-items-center ">
                        <div>
                          <img
                            src={`${host}/uploads/buyer/getImagesFromSeller/${singleProduct?.sellerId?.profile}`}
                            style={{ width: "70px" }}
                            alt="profile"
                          />
                        </div>
                        <div className="d-flex flex-column align-items-center text-center">
                          <h3>{singleProduct?.sellerId?.name}</h3>
                          <h6>
                            {buyer ? (
                              singleProduct?.sellerId?.phone
                            ) : (
                              <Tooltip
                                placement="bottom"
                                arrow
                                title="Login to view full contact information"
                              >
                                {singleProduct?.sellerId?.phone.slice(0, 4) +
                                  "****" +
                                  singleProduct?.sellerId?.phone.slice(8, 10)}
                              </Tooltip>
                            )}
                            {buyer && " | "}
                            {buyer && singleProduct?.sellerId?.email}
                          </h6>
                        </div>
                      </div>
                    </div>
                    {buyer && (
                      <div className="pt-5 w-100">
                        <Link
                          to={`/RequestProduct/${singleProduct?._id}`}
                          className="btn w-100"
                        >
                          Request
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
