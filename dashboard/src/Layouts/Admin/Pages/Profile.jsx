import { Box } from "@mui/material";
import React, { useContext } from "react";
import Breadcrumbs from "../Components/Banner/Breadcrumbs";
import ProfileContent from "../Components/Profile/ProfileContent";
import { AdminContext } from "../Context/Context";
import { useEffect } from "react";

export default function Profile() {
  const { getProfile, admin } = useContext(AdminContext);
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ p: 2 }}>
        <Breadcrumbs title="Profile" />
      </Box>
      <Box sx={{ px: 2 }}>
        <ProfileContent admin={admin} />
      </Box>
    </Box>
  );
}
