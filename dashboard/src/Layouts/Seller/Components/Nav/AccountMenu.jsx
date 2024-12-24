import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { SellerContext } from "../../Context/Context";

export default function AccountMenu() {
  const { seller, host } = useContext(SellerContext);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        p: 1,
        gap: 1,
      }}
    >
      <Typography sx={{ fontWeight: "600", color: "black" }}>
        {seller?.name}
      </Typography>
      <Avatar src={`${host}/uploads/seller/${seller?.profile}`} />
    </Box>
  );
}
