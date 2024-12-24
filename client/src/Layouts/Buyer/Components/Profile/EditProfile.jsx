import { Box, Button, IconButton, Tooltip } from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext } from "react";
import { BuyerContext } from "../../Context/Context";
import { useEffect } from "react";

export default function EditProfile() {
  const { buyer, updateProfile } = useContext(BuyerContext);
  const [open, setOpen] = React.useState(false);
  const [updatedBuyer, setUpdatedBuyer] = React.useState(null);
  const [updatedBuyerError, setUpdatedBuyerError] = React.useState({
    name: "",
    phone: "",
    profile: "",
    npassword: "",
    cpassword: "",
  });

  useEffect(() => {
    setUpdatedBuyer({
      name: buyer?.name,
      phone: buyer?.phone,
    });
  }, [buyer, open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!updatedBuyer?.name) {
      errors.name = "Name cannot be empty";
    }

    if (!updatedBuyer?.phone) {
      errors.phone = "Contact number cannot be empty";
    }

    if (updatedBuyer?.cpassword !== updatedBuyer?.npassword) {
      errors.cpassword = "Password does not match";
    }

    if (Object.keys(errors).length === 0) {
      console.log(updatedBuyer);
      const data = new FormData();
      data.append("name", updatedBuyer.name);
      data.append("phone", updatedBuyer.phone);
      if (updatedBuyer?.profile) {
        data.append("profile", updatedBuyer.profile);
      }
      if (updatedBuyer?.cpassword) {
        data.append("npassword", updatedBuyer.npassword);
      }
      updateProfile(data);
      handleClose();
    } else {
      setUpdatedBuyerError(errors);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name == "profile") {
      setUpdatedBuyer((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
    setUpdatedBuyer((prev) => ({
      ...prev,
      [name]: value,
    }));
    setUpdatedBuyerError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  return (
    <Box>
      <Box>
        <Tooltip title="Edit Profile" arrow placement="top">
          <IconButton
            onClick={handleClickOpen}
            sx={{ float: "right" }}
            color="primary"
          >
            <EditIcon sx={{ fontSize: "20px" }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        component={"form"}
        onSubmit={handleSubmit}
      >
        <DialogTitle>Update Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>Update your profile</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            value={updatedBuyer?.name || ""}
            onChange={handleInputChange}
            label="Enter your name"
            fullWidth
            variant="standard"
            error={!!updatedBuyerError?.name}
            helperText={updatedBuyerError?.name}
          />
          <TextField
            autoFocus
            margin="dense"
            name="phone"
            value={updatedBuyer?.phone || ""}
            onChange={handleInputChange}
            label="Enter your contact number"
            fullWidth
            type="number"
            variant="standard"
            error={!!updatedBuyerError?.phone}
            helperText={updatedBuyerError?.phone}
          />
          <TextField
            autoFocus
            margin="dense"
            name="profile"
            onChange={(e) =>
              setUpdatedBuyer((prev) => ({
                ...prev,
                [e.target.name]: e.target.files[0],
              }))
            }
            label="Upload your profile picture"
            fullWidth
            type="file"
            InputLabelProps={{ shrink: true }}
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            name="npassword"
            onChange={handleInputChange}
            label="New Password"
            fullWidth
            type="password"
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            name="cpassword"
            onChange={handleInputChange}
            label="Confirm Password"
            fullWidth
            type="password"
            variant="standard"
            error={!!updatedBuyerError?.cpassword}
            helperText={updatedBuyerError?.cpassword}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Update</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
