import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import Services from "../Components/Home/Services";
import loginBg from "../../../assets/img/gallery/popular-imtes1.png";
import { Link } from "react-router-dom";
import { BuyerContext } from "../Context/Context";
export default function Register() {
  const { Register } = useContext(BuyerContext);
  const [formInfo, setFormInfo] = useState({ email: "", password: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    Register(formInfo);
  };
  return (
    <Box
      sx={{
        backgroundColor: "#f7f7fd",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pb: 5,
        pt: 5,
        p: 5,
      }}
    >
      <Paper
        elevation={5}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "60%",
          height: "60vh",
          borderRadius: "20px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            p: 5,
          }}
        >
          <Box
            component={"form"}
            onSubmit={handleSubmit}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              p: 2,
            }}
          >
            <h1
              className="section-tittle text-center "
              style={{ mb: 3, fontWeight: "600" }}
            >
              Sign Up as a Buyer
            </h1>
            <TextField
              autoFocus
              required
              onChange={(e) =>
                setFormInfo({ ...formInfo, [e.target.name]: e.target.value })
              }
              fullWidth
              label="Enter Name"
              name="name"
              value={formInfo?.name}
              sx={{ mb: 1 }}
            />
            <TextField
              required
              onChange={(e) =>
                setFormInfo({ ...formInfo, [e.target.name]: e.target.value })
              }
              fullWidth
              label="Enter Contact Number"
              name="phone"
              value={formInfo?.phone}
              sx={{ mb: 1 }}
            />
            <TextField
              required
              onChange={(e) =>
                setFormInfo({ ...formInfo, [e.target.name]: e.target.value })
              }
              fullWidth
              label="Enter Email ID"
              name="email"
              type="email"
              value={formInfo?.email}
              sx={{ mb: 1 }}
            />
            <TextField
              required
              onChange={(e) =>
                setFormInfo({ ...formInfo, [e.target.name]: e.target.value })
              }
              fullWidth
              label="Enter Password"
              name="password"
              value={formInfo?.password}
              sx={{ mb: 1 }}
            />
            <Button
              sx={{ p: 1, backgroundColor: "#9f78ff" }}
              fullWidth
              variant="contained"
              color="secondary"
              className="btn"
              type="submit"
            >
              Submit
            </Button>
            <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
              <Typography>
                Already have an account?{" "}
                <Link style={{ color: "black" }} to={"/Login"}>
                  Sign In
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          className="single-product location-img"
          sx={{
            width: "100%",
            // backgroundColor: "#9f78ff",
            borderTopRightRadius: "20px",
            borderBottomRightRadius: "20px",
            backgroundImage: `url(${loginBg})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></Box>
      </Paper>
    </Box>
  );
}
