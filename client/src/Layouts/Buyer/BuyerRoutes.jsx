import React, { useEffect } from "react";
import { Box } from "@mui/material";
import NavBar from "./Components/Nav/NavBar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Footer from "./Components/Footer/Footer";
import About from "./Pages/About";
import SingleProduct from "./Pages/SingleProduct";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Context from "./Context/Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Products from "./Pages/Products";
import Profile from "./Pages/Profile";
import Orders from "./Pages/Orders";
import Contact from "./Pages/Contact";
import RequestProduct from "./Pages/RequestProduct";

export default function BuyerRoutes() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return (
    <Context>
      <Box>
        <NavBar />
      </Box>
      <Box>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/Register" element={<Register />} />
          <Route exact path="/About" element={<About />} />
          <Route exact path="/Contact" element={<Contact />} />
          <Route exact path="/Products" element={<Products />} />
          <Route exact path="/Profile" element={<Profile />} />
          <Route exact path="/Orders" element={<Orders />} />
          <Route
            exact
            path="/RequestProduct/:id"
            element={<RequestProduct />}
          />
          <Route exact path="/ProductDetails/:id" element={<SingleProduct />} />
        </Routes>
      </Box>
      <ToastContainer />
      <Box>
        <Footer />
      </Box>
    </Context>
  );
}
