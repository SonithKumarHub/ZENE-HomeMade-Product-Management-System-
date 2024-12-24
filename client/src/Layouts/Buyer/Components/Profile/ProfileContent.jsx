import { Avatar, Box, Button, IconButton, Paper, Tooltip } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { useContext } from "react";
import { BuyerContext } from "../../Context/Context";
import EditProfile from "./EditProfile";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  display: "flex",
  justifyContent: "center",
}));
export default function ProfileContent() {
  const { buyer, host } = useContext(BuyerContext);
  return (
    <Box sx={{ p: 5 }}>
      <Paper sx={{ p: 5, borderRadius: "30px" }} elevation={3}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Item elevation={0}>
                <Avatar
                  src={`${host}/uploads/buyer/${buyer?.profile}`}
                  sx={{ width: 150, height: 150 }}
                />
              </Item>
            </Grid>
            <Grid item xs={10}>
              <EditProfile />
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <BadgeIcon sx={{ fontSize: "25px", color: "gray" }} />
                  </ListItemAvatar>
                  <ListItemText primary="Name" secondary={buyer?.name} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <LocalPhoneIcon sx={{ fontSize: "25px", color: "gray" }} />
                  </ListItemAvatar>
                  <ListItemText primary="Phone" secondary={buyer?.phone} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <EmailIcon sx={{ fontSize: "25px", color: "gray" }} />
                  </ListItemAvatar>
                  <ListItemText primary="Email" secondary={buyer?.email} />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}
