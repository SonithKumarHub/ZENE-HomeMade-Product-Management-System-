import React from "react";
import PageBanner from "../Components/Banner/PageBanner";
import { Box } from "@mui/material";
import ContactContent from "../Components/Home/ContactContent";
export default function Contact() {
  return (
    <Box>
      <Box>
        <PageBanner title="Contact Us" />
      </Box>
      <Box>
        <ContactContent />
      </Box>
    </Box>
  );
}
