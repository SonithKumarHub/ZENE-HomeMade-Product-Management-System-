import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BuyerContext } from "../../Context/Context";
import { Typography } from "@mui/material";

export default function NavBar() {
  const { buyer, LogoutBuyer } = useContext(BuyerContext);
  return (
    <div>
      <header>
        <div className="header-area ">
          <div className="main-header header-sticky">
            <div className="container-fluid">
              <div className="menu-wrapper d-flex align-items-center justify-content-between">
                <div className="header-left d-flex align-items-center">
                  <div className="logo">
                    <Link to="/">
                      <img src="../assets/img/logo/logo.png" alt />
                    </Link>
                  </div>
                  <div className="main-menu  d-none d-lg-block">
                    <nav>
                      <ul id="navigation">
                        <li>
                          <Link to="/">Home</Link>
                        </li>
                        <li>
                          <Link to="/About">About</Link>
                        </li>
                        <li>
                          <Link to="/Contact">Contact</Link>
                        </li>
                        <li>
                          <Link to="/Products">Products</Link>
                        </li>

                        {/* <li>
                          <Link to="/Contact">Contact</Link>
                        </li> */}
                        {buyer && (
                          <li>
                            <Link>More</Link>
                            <ul className="submenu">
                              <li>
                                <Link to="/Profile">Profile</Link>
                              </li>
                              <li>
                                <Link to="/Orders">Orders</Link>
                              </li>
                            </ul>
                          </li>
                        )}
                        {!buyer && (
                          <li>
                            <Link to="/Login">Login</Link>
                          </li>
                        )}
                      </ul>
                    </nav>
                  </div>
                </div>
                {buyer && (
                  <div className="header-right1 d-flex align-items-center">
                    <div className="search d-none d-md-block">
                      <ul
                        className="d-flex align-items-center"
                        style={{ gap: 10 }}
                      >
                        <li>
                          <Typography variant="h6" sx={{ fontWeight: "600" }}>
                            Hy, {buyer?.name}
                          </Typography>
                        </li>
                        <li>
                          <div className="card-stor">
                            <li onClick={LogoutBuyer}>
                              <Link>Logout</Link>
                            </li>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
                <div className="col-12">
                  <div className="mobile_menu d-block d-lg-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
