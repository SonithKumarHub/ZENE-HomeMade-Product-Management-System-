import React from "react";
import { Container, Box, Typography, Breadcrumbs } from "@mui/material";
import { styled } from "@mui/system";
import bg from "../../Assets/bgBanner.jpg";
import { Link } from "react-router-dom";
const HeaderContainer = styled(Box)(({ theme }) => ({
  background: `url(${bg}) center center/cover no-repeat`,
  padding: theme.spacing(5, 0),
  marginBottom: theme.spacing(5),
  textAlign: "center",
  color: "white",
  animation: "fadeIn 0.1s",
  visibility: "visible",
  backgroundAttachment: "fixed",
}));

const PageBanner = ({ title }) => {
  return (
    <HeaderContainer className="wow fadeIn" data-wow-delay="0.1s">
      <Container>
        <Box py={5}>
          <h1
            className="section-tittle text-center"
            style={{ fontWeight: "900", fontSize: "40px" }}
          >
            {title}
          </h1>
          <Breadcrumbs
            aria-label="breadcrumb"
            className="animated slideInDown"
            sx={{
              justifyContent: "center",
              display: "flex",
              mt: 2,
              color: "white",
            }}
          >
            <Link
              component={Typography}
              variant="h2"
              className="section-tittle text-center"
              to="/"
              underline="hover"
              style={{
                // color: "white",
                textDecoration: "none",
                fontWeight: "900",
                fontSize: "14px",
              }}
            >
              Home
            </Link>
            <h2
              className="section-tittle text-center"
              variant="h2"
              style={{ fontWeight: "600" }}
            >
              {title}
            </h2>
          </Breadcrumbs>
        </Box>
      </Container>
    </HeaderContainer>
  );
};

export default PageBanner;
