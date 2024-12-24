import React from "react";
import { Box } from "@mui/material";
import OrderNotFound from "./OrderNotFound";
import OrderCard from "./OrderCard";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function MyOrders({ orders }) {
  const filtered = orders.slice().reverse();
  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item xs={10}>
            {filtered?.length > 0 ? (
              filtered.map((item, index) => (
                <OrderCard order={item} key={index} />
              ))
            ) : (
              <OrderNotFound />
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
