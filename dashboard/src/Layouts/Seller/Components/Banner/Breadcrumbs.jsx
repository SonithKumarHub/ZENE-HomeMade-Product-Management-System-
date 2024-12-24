import { Box, Typography } from "@mui/material";
import React from "react";

export default function Breadcrumbs({ title }) {
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: "600" }}>
        {title}
      </Typography>
    </Box>
  );
}
