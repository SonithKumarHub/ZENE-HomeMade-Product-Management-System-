import React from "react";
import { Box, Grid, Paper, Typography, Stack } from "@mui/material";
import RevenueIcon from "@mui/icons-material/MonetizationOn";
import OrdersIcon from "@mui/icons-material/ShoppingCart";
import ActiveSessionsIcon from "@mui/icons-material/PeopleAlt";
import TotalSessionsIcon from "@mui/icons-material/Group";

export default function Counts() {
  const stats = [
    {
      value: "$10,540",
      label: "Total Revenue",
      percentage: "22.45%",
      icon: <RevenueIcon color="primary" fontSize="large" />,
    },
    {
      value: "$1,056",
      label: "Orders",
      percentage: "22.45%",
      icon: <OrdersIcon color="primary" fontSize="large" />,
    },
    {
      value: "$56",
      label: "Active Sessions",
      percentage: "2.45%",
      icon: <ActiveSessionsIcon color="primary" fontSize="large" />,
    },
    {
      value: "$56",
      label: "Total Sessions",
      percentage: "0.45%",
      icon: <TotalSessionsIcon color="primary" fontSize="large" />,
    },
  ];

  return (
    <Box sx={{ p: 0 }}>
      <Grid container spacing={1}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} xl={3} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderTopRightRadius: index == 3 && "20px",
                borderBottomRightRadius: index == 3 && "20px",
                borderBottomLeftRadius: index == 0 && "20px",
                borderTopLeftRadius: index == 0 && "20px",
              }}
            >
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={8}>
                  <Typography variant="h5" sx={{ fontWeight: "600" }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="subtitle1">{stat.label}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Stack
                    alignItems="center"
                    sx={{
                      backgroundColor: "#ecf2ff",
                      p: 2,
                      borderRadius: "50%",
                    }}
                  >
                    {stat.icon}
                  </Stack>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
