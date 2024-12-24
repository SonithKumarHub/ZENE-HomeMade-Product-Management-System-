import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Avatar, Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { SellerContext } from "../../Context/Context";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ProfileContent({ seller }) {
  const { updateProfile, host } = useContext(SellerContext);
  const [sellerData, setSellerData] = useState({
    name: "",
    phone: "",
    profile: null,
    qrCode: null,
    npassword: "",
    cpassword: "",
  });
  const [sellerDataError, setSellerDataError] = useState({});

  useEffect(() => {
    setSellerData({
      name: seller?.name || "",
      phone: seller?.phone || "",
      profile: seller?.profile || null,
      qrCode: seller?.qrCode || null,
      email: seller?.email || "",
    });
  }, [seller]);

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = sellerData.name ? "" : "Name is required.";
    tempErrors.phone = sellerData.phone ? "" : "Phone number is required.";

    if (sellerData.npassword && sellerData.npassword !== sellerData.cpassword) {
      tempErrors.cpassword = "Passwords do not match.";
    }

    setSellerDataError(tempErrors);

    return Object.values(tempErrors).every((x) => x === "");
  };

  const update = () => {
    if (validate()) {
      const formData = new FormData();
      formData.append("name", sellerData.name);
      formData.append("phone", sellerData.phone);
      if (sellerData.profile) formData.append("profile", sellerData.profile);
      if (sellerData.qrCode) formData.append("qrCode", sellerData.qrCode);
      if (sellerData.npassword)
        formData.append("npassword", sellerData.npassword);

      // Call updateProfile API with formData
      updateProfile(formData);
      setSellerData({
        name: seller?.name,
        phone: seller?.phone,
      });
    }
  };

  return (
    <Box
      sx={{
        p: { xs: 1, sm: 3 },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{ width: { xs: "100%", sm: "80%" }, pt: 5, borderRadius: "20px" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Avatar
                src={`${host}/uploads/seller/${seller?.profile}`}
                alt="profile"
                component={Paper}
                elevation={3}
                sx={{ width: 100, height: 100 }}
              />

              <Avatar
                variant="square"
                src={`${host}/uploads/seller/${seller?.qrCode}`}
                alt="qrCode"
                component={Paper}
                elevation={3}
                sx={{ width: 100, height: 100 }}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: "90%", p: 2 }}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <TextField
                    value={sellerData?.name}
                    onChange={(e) =>
                      setSellerData({
                        ...sellerData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    label="Enter Name"
                    name="name"
                    helperText={sellerDataError?.name}
                    error={!!sellerDataError?.name}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    value={sellerData?.phone}
                    onChange={(e) =>
                      setSellerData({
                        ...sellerData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    label="Enter Contact Number"
                    name="phone"
                    helperText={sellerDataError?.phone}
                    error={!!sellerDataError?.phone}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    label="Upload Profile Picture"
                    name="profile"
                    type="file"
                    onChange={(e) =>
                      setSellerData({
                        ...sellerData,
                        profile: e.target.files[0],
                      })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    label="Upload Qr Code"
                    name="qrCode"
                    type="file"
                    onChange={(e) =>
                      setSellerData({
                        ...sellerData,
                        qrCode: e.target.files[0],
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={sellerData?.email}
                    disabled
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    label="Enter Email ID"
                    name="email"
                    helperText="Email cannot be changed"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={(e) =>
                      setSellerData({
                        ...sellerData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    fullWidth
                    label="Enter New Password"
                    name="npassword"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={(e) =>
                      setSellerData({
                        ...sellerData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    fullWidth
                    label="Confirm Password"
                    name="cpassword"
                    helperText={sellerDataError?.cpassword}
                    error={!!sellerDataError?.cpassword}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    onClick={update}
                    fullWidth
                    variant="contained"
                    sx={{ p: 1, mb: 3 }}
                  >
                    Update
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
