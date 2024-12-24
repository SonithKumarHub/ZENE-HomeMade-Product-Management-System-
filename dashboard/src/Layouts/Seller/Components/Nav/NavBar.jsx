import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
import DvrIcon from "@mui/icons-material/Dvr";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { SellerContext } from "../../Context/Context";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../../Assets/logo.png";
import { Avatar } from "@mui/material";
import AccountMenu from "./AccountMenu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const drawerWidth = 300;

export default function NavBar() {
  const { activeOption, setActiveOption, LogoutSeller, seller } =
    useContext(SellerContext);
  const navOptions = [
    { title: "Dashboard", icon: <HomeIcon />, path: "/Dashboard" },
    { title: "Products", icon: <Inventory2Icon />, path: "/Products" },
    { title: "Orders", icon: <DvrIcon />, path: "/Orders" },
    { title: "Profile", icon: <AccountCircleIcon />, path: "/Profile" },
  ];
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        elevation={1}
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "white",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Avatar src={logo} />
            <Typography
              variant="overline"
              className="section-tittle"
              sx={{ color: "black", fontWeight: "600", fontSize: "20px" }}
            >
              HandMade
            </Typography>
          </Box>
          <Box>
            <AccountMenu />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: { sm: drawerWidth, xs: drawerWidth - 210 },
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: { sm: drawerWidth, xs: drawerWidth - 210 },
            // boxSizing: "border-box",
            backgroundColor: "#f5f6fa",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List sx={{ p: 2 }}>
            {navOptions.map((text, index) => (
              <ListItem
                sx={{
                  backgroundColor: activeOption == text?.path && "#1e5eff",
                  color: activeOption == text?.path ? "white" : "grey",
                  borderRadius: activeOption == text?.path && "10px",
                  cursor:
                    !seller?.qrCode && text.title == "Products"
                      ? "not-allowed"
                      : "pointer",
                }}
                key={index}
                disablePadding
              >
                <ListItemButton
                  disabled={!seller?.qrCode && text.title == "Products" && true}
                  component={Link}
                  to={text?.path}
                >
                  <ListItemIcon
                    sx={{
                      color: activeOption == text?.path && "white",
                    }}
                  >
                    {text?.icon}
                  </ListItemIcon>
                  <ListItemText
                    sx={{ display: { xs: "none", sm: "contents" } }}
                    primary={
                      <Typography sx={{ fontWeight: "400" }}>
                        {text?.title}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Toolbar />
        <Box>
          <List
            sx={{
              overflow: "auto",
              position: "fixed",
              bottom: 0,
              width: { xs: "16%", sm: "19.5%" },
              p: 2,
            }}
          >
            <ListItem
              sx={{
                backgroundColor: "#1e5eff",
                color: "white",
                borderRadius: "10px",
              }}
              disablePadding
            >
              <ListItemButton onClick={LogoutSeller}>
                <ListItemIcon
                  sx={{
                    color: "white",
                  }}
                >
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{ display: { xs: "none", sm: "contents" } }}
                  primary={
                    <Typography sx={{ fontWeight: "400" }}>Logout</Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
