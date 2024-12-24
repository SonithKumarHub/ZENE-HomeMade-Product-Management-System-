import { Box } from "@mui/material";
import React from "react";
import PageBanner from "../Components/Banner/PageBanner";
import AboutContent from "../Components/Home/AboutContent";
import Services from "../Components/Home/Services";

export default function About() {
  return (
    <Box>
      <Box>
        <PageBanner title="About Us" />
      </Box>
      <Box>
        <AboutContent />
      </Box>
      <Box>
        <Services />
      </Box>
    </Box>
  );
}
