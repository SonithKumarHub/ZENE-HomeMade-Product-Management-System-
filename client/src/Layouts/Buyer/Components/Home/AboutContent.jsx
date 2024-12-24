import React from "react";
import one from "../../Assets/team1.jpg";
import two from "../../Assets/team2.jpg";

export default function AboutContent() {
  return (
    <div>
      <div className="about-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="section-tittle mb-60 text-center pt-10">
                <h2>Our Story</h2>
                <p className="pera">
                  What began as a passion for unique, handmade creations quickly
                  evolved into a thriving community of artisans and shoppers.
                  Our founders, inspired by the creativity of local makers, set
                  out to build a platform where quality, craftsmanship, and
                  individuality are celebrated. Today, we connect talented
                  sellers with discerning buyers, all driven by a shared love
                  for authentic, handmade goods.
                </p>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="about-img pb-bottom">
                <img src={one} alt="Our Team" className="w-100" />
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="section-tittle mb-60 text-center pt-10">
                <h2>Journey Start From</h2>
                <p className="pera">
                  Our journey began in a small, vibrant community where people
                  embraced the beauty of handmade products. Recognizing the
                  potential of these unique creations, we decided to build a
                  marketplace that not only showcases them but also supports the
                  artisans behind each piece. From humble beginnings, we've
                  grown into a platform that champions creativity and
                  sustainability.
                </p>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="about-img pb-bottom">
                <img src={two} alt="Journey Start" className="w-100" />
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="section-tittle mb-60 text-center pt-10">
                <h2>2020</h2>
                <p className="pera">
                  In 2020, amidst a world of change, we launched our platform to
                  bring handmade treasures to the digital age. Despite the
                  challenges, our commitment to supporting small businesses and
                  promoting ethical consumerism never wavered. Today, we
                  continue to grow, connecting makers and buyers who value
                  quality, creativity, and the personal touch of handmade
                  products.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
