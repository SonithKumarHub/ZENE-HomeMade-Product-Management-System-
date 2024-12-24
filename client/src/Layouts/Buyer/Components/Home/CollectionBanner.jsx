import React from "react";
import { Link } from "react-router-dom";
import bg from "../../Assets/5.jpg";
export default function CollectionBanner() {
  return (
    <div>
      <section
        className="collection section-bg2 section-padding30 section-over1 ml-15 mr-15"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-9">
              <div className="single-question text-center">
                <h2
                  className="wow fadeInUp"
                  data-wow-duration="2s"
                  data-wow-delay=".1s"
                >
                  Discover Handcrafted Treasures
                </h2>
                <Link
                  to="/Products"
                  className="btn wow fadeInUp"
                  data-wow-duration="2s"
                  data-wow-delay=".4s"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
