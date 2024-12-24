import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/material";

export default function HomeBanner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="slider-active">
      <Slider {...settings}>
        <div className="single-slider slider-bg1 hero-overly slider-height d-flex align-items-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-8 col-lg-9">
                <Box sx={{ backgroundColor: "#ffffff5c", p: 4 }}>
                  <div className="hero__caption">
                    <h1>
                      Crafted with Love,
                      <br />
                      Delivered to
                      <br /> Your Doorstep
                    </h1>
                    <Link to="/Products" className="btn">
                      Shop Now
                    </Link>
                  </div>
                </Box>
              </div>
            </div>
          </div>
        </div>
        <div className="single-slider slider-bg2 hero-overly slider-height d-flex align-items-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-8 col-lg-9">
                <Box sx={{ backgroundColor: "#ffffff5c", p: 4 }}>
                  <div className="hero__caption">
                    <h1>
                      Unique <br />
                      Creations for
                      <br />
                      Every Occasion
                    </h1>
                    <Link to="/Products" className="btn">
                      Shop Now
                    </Link>
                  </div>
                </Box>
              </div>
            </div>
          </div>
        </div>
        <div className="single-slider slider-bg3 hero-overly slider-height d-flex align-items-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-8 col-lg-9">
                <Box sx={{ backgroundColor: "#ffffff5c", p: 4 }}>
                  <div className="hero__caption">
                    <h1>
                      Discover
                      <br />
                      the Art of
                      <br />
                      Handmade
                    </h1>
                    <Link to="/Products" className="btn">
                      Shop Now
                    </Link>
                  </div>
                </Box>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}
