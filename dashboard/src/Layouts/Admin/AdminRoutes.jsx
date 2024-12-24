import React from "react";
import Context from "./Context/Context";
import { Box, Toolbar } from "@mui/material";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./Components/Nav/NavBar";
import Profile from "./Pages/Profile";
import Buyers from "./Pages/Buyers";
import Sellers from "./Pages/Sellers";
import Categories from "./Pages/Categories";
import Feedbacks from "./Pages/Feedbacks";
import Products from "./Pages/Products";
export default function AdminRoutes() {
  const { pathname } = useLocation();
  const showNavBar =
    pathname !== "/admin" &&
    pathname !== "/Admin" &&
    pathname !== "/admin/" &&
    pathname !== "/Admin/";

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
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Buyers" element={<Buyers />} />
              <Route path="/Sellers" element={<Sellers />} />
              <Route path="/Categories" element={<Categories />} />
              <Route path="/Products" element={<Products />} />
              <Route path="/Feedbacks" element={<Feedbacks />} />
            </Routes>
          </Box>
        </Box>
      </Box>
      <ToastContainer />
    </Context>
  );
}
