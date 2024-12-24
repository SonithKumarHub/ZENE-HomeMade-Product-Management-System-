import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Avatar, Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../Context/Context";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ProfileContent({ admin }) {
  const { updateProfile, host } = useContext(AdminContext);
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    profile: null,
    qrCode: null,
    npassword: "",
    cpassword: "",
  });
  const [adminDataError, setAdminDataError] = useState({});

  useEffect(() => {
    setAdminData({
      name: admin?.name || "",
      email: admin?.email || "",
    });
  }, [admin]);

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = adminData.name ? "" : "Name is required.";
    tempErrors.email = adminData.email ? "" : "Email number is required.";

    if (adminData.npassword && adminData.npassword !== adminData.cpassword) {
      tempErrors.cpassword = "Passwords do not match.";
    }

    setAdminDataError(tempErrors);

    return Object.values(tempErrors).every((x) => x === "");
  };

  const update = () => {
    if (validate()) {
      const formData = new FormData();
      formData.append("name", adminData.name);
      formData.append("email", adminData.email);
      if (adminData.profile) formData.append("profile", adminData.profile);
      if (adminData.qrCode) formData.append("qrCode", adminData.qrCode);
      if (adminData.npassword)
        formData.append("npassword", adminData.npassword);

      // Call updateProfile API with formData
      updateProfile(formData);
      setAdminData({
        name: admin?.name,
        email: admin?.email,
      });
    }
  };

  return (
    <Box
      sx={{
        // p: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper sx={{ width: "100%", pt: 5, borderRadius: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Avatar
                src={`${host}/uploads/admin/${admin?.profile}`}
                alt="profile"
                component={Paper}
                elevation={3}
                sx={{ width: 100, height: 100 }}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: "90%", p: 2 }}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={adminData?.name}
                    onChange={(e) =>
                      setAdminData({
                        ...adminData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    label="Enter Name"
                    name="name"
                    helperText={adminDataError?.name}
                    error={!!adminDataError?.name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={adminData?.email}
                    onChange={(e) =>
                      setAdminData({
                        ...adminData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    label="Enter Enter"
                    name="email"
                    type="email"
                    helperText={adminDataError?.email}
                    error={!!adminDataError?.email}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    label="Upload Profile Picture"
                    name="profile"
                    type="file"
                    onChange={(e) =>
                      setAdminData({
                        ...adminData,
                        profile: e.target.files[0],
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    onChange={(e) =>
                      setAdminData({
                        ...adminData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    fullWidth
                    label="Enter New Password"
                    name="npassword"
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    onChange={(e) =>
                      setAdminData({
                        ...adminData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    fullWidth
                    label="Confirm Password"
                    name="cpassword"
                    helperText={adminDataError?.cpassword}
                    error={!!adminDataError?.cpassword}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
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
