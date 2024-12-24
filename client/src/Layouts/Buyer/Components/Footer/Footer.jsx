import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BuyerContext } from "../../Context/Context";

export default function Footer() {
  const { buyer } = useContext(BuyerContext);
  return (
    <div>
      <footer>
        {/* Footer Start*/}
        <div className="footer-area footer-padding">
          <div className="container-fluid ">
            <div className="row d-flex justify-content-between">
              <div className="col-xl-3 col-lg-3 col-md-8 col-sm-8">
                <div className="single-footer-caption mb-50">
                  <div className="single-footer-caption mb-30">
                    {/* logo */}
                    <div className="footer-logo mb-35">
                      <Link to="/">
                        <img src="../assets/img/logo/logo2_footer.png" alt />
                      </Link>
                    </div>
                    <div className="footer-tittle">
                      <div className="footer-pera">
                        <p>
                          Suspendisse varius enim in eros elementum tristique.
                          Duis cursus, mi quis viverra ornare, eros dolor
                          interdum nulla.
                        </p>
                      </div>
                    </div>
                    {/* social */}
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-4">
                <div className="single-footer-caption mb-50">
                  <div className="footer-tittle">
                    <h4>Quick links</h4>
                    <ul>
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li>
                        <Link to="/About">About</Link>
                      </li>
                      <li>
                        <Link to="/Products">Products</Link>
                      </li>
                      {!buyer && (
                        <li>
                          <Link to="/Login">Login</Link>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-4">
                <div className="single-footer-caption mb-50">
                  <div className="footer-tittle">
                    {buyer && (
                      <>
                        <h4>Account</h4>
                        <ul>
                          <li>
                            <Link to="/Profile">Profile</Link>
                          </li>
                          <li>
                            <Link to="/Orders">Orders</Link>
                          </li>
                          {/* <li>
                        <Link to="#">Privacy Policy</Link>
                      </li> */}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-4">
                <div className="single-footer-caption mb-50">
                  <div className="footer-tittle">
                    {/* <h4>Pertners</h4>
                    <ul>
                      <li>
                        <Link to="#">Image Licensin</Link>
                      </li>
                      <li>
                        <Link to="#">Style Guide</Link>
                      </li>
                      <li>
                        <Link to="#">Privacy Policy</Link>
                      </li>
                    </ul> */}
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4">
                <div className="single-footer-caption mb-50">
                  <div className="footer-tittle">
                    {/* <h4>Get in touch</h4>
                    <ul>
                      <li>
                        <Link to="#">(89) 982-278 356</Link>
                      </li>
                      <li>
                        <Link to="#">demo@colorlib.com</Link>
                      </li>
                      <li>
                        <Link to="#">67/A, Colorlib, Green road, NYC</Link>
                      </li>
                    </ul> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* footer-bottom area */}
        <div className="footer-bottom-area">
          <div className="container">
            <div className="footer-border">
              <div className="row d-flex align-items-center">
                <div className="col-xl-12 ">
                  <div className="footer-copy-right text-center">
                    <p>
                      {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                      Copyright © All rights reserved HPMS
                      {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer End*/}
      </footer>
    </div>
  );
}
