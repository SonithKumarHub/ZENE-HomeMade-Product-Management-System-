import { Box } from "@mui/material";
import React from "react";
import PageBanner from "../Components/Banner/PageBanner";
import ProfileContent from "../Components/Profile/ProfileContent";

export default function Profile() {
  return (
    <Box>
      <Box>
        <PageBanner title={"Profile"} />
      </Box>
      <Box>
        <ProfileContent />
      </Box>
    </Box>
  );
}
