import { Box } from "@mui/material";
import React, { useContext } from "react";
import Breadcrumbs from "../Components/Banner/Breadcrumbs";
import ProfileContent from "../Components/Profile/ProfileContent";
import { SellerContext } from "../Context/Context";
import { useEffect } from "react";

export default function Profile() {
  const { getProfile, seller } = useContext(SellerContext);
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <Box>
      <Box sx={{ px: 2 }}>
        <Breadcrumbs title="Profile" />
      </Box>
      <Box sx={{ px: 2 }}>
        <ProfileContent seller={seller} />
      </Box>
    </Box>
  );
}
