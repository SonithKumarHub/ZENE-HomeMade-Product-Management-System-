import React from "react";

export default function Services() {
  return (
    <div>
      <div className="categories-area section-padding40 gray-bg">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div
                className="single-cat mb-50 wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay=".2s"
              >
                <div className="cat-icon">
                  <img
                    src="../assets/img/icon/services1.svg"
                    alt="Fast & Free Delivery"
                  />
                </div>
                <div className="cat-cap">
                  <h5>Fast & Free Delivery</h5>
                  <p>
                    Enjoy free delivery on all your orders, no matter the size
                    or value.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div
                className="single-cat mb-50 wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay=".2s"
              >
                <div className="cat-icon">
                  <img
                    src="../assets/img/icon/services2.svg"
                    alt="Handpicked Products"
                  />
                </div>
                <div className="cat-cap">
                  <h5>Handpicked Products</h5>
                  <p>
                    Every item on our platform is carefully selected to ensure
                    quality and uniqueness.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div
                className="single-cat mb-30 wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay=".4s"
              >
                <div className="cat-icon">
                  <img
                    src="../assets/img/icon/services3.svg"
                    alt="Customer Support"
                  />
                </div>
                <div className="cat-cap">
                  <h5>24/7 Customer Support</h5>
                  <p>
                    Our friendly support team is here to help you 24/7 with any
                    queries or issues.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div
                className="single-cat wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay=".5s"
              >
                <div className="cat-icon">
                  <img
                    src="../assets/img/icon/services4.svg"
                    alt="Sustainable Packaging"
                  />
                </div>
                <div className="cat-cap">
                  <h5>Sustainable Packaging</h5>
                  <p>
                    We prioritize eco-friendly packaging to reduce environmental
                    impact and promote sustainability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
