import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../Context/Context";

export default function AccountMenu() {
  const { admin, host } = useContext(AdminContext);
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
        {admin?.name}
      </Typography>
      <Avatar src={`${host}/uploads/admin/${admin?.profile}`} />
    </Box>
  );
}
