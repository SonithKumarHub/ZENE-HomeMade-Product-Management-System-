import React from "react";
import Context from "./Context/Context";
import { Box, Toolbar } from "@mui/material";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./Components/Nav/NavBar";
import Products from "./Pages/Products";
import Orders from "./Pages/Orders";
import Profile from "./Pages/Profile";

export default function SellerRoutes() {
  const { pathname } = useLocation();
  const showNavBar =
    pathname !== "/" && pathname !== "/" && pathname !== "/Register";

  return (
    <Context>
      <Box sx={{ display: "flex" }}>
        {showNavBar && <NavBar />}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: showNavBar ? 1 : 0,
            minHeight: "100vh",
            backgroundColor: "#f5f6fa",
          }}
        >
          {showNavBar && <Toolbar />}
          <Box>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/seller/Register" element={<Register />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/Products" element={<Products />} />
              <Route path="/Orders" element={<Orders />} />
              <Route path="/Profile" element={<Profile />} />
            </Routes>
          </Box>
        </Box>
      </Box>
      <ToastContainer />
    </Context>
  );
}
