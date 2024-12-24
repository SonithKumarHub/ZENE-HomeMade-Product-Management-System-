import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect } from "react";
import { useContext } from "react";
import { AdminContext } from "../Context/Context";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function InsertCategory({ data, setShow, setSelectedCategory }) {
  const { insertCategory, updateCategory } = useContext(AdminContext);
  const [formInfo, setFormInfo] = React.useState({
    title: "",
    status: "",
  });
  useEffect(() => {
    if (data) {
      setFormInfo(data);
    }
  }, [data]);

  const handleChange = (event) => {
    setFormInfo({ ...formInfo, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(formInfo);
    if (data) {
      updateCategory(data?._id, formInfo);
      setSelectedCategory(null);
    } else {
      insertCategory(formInfo);
    }
    setShow(false);
    setFormInfo({ title: "" });
  };
  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Box component={"form"} onSubmit={handleSubmit} sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              required
              value={formInfo?.title}
              onChange={handleChange}
              fullWidth
              label="Enter Category Title"
              name="title"
            />
          </Grid>
          {data && (
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formInfo?.status}
                  label="Status"
                  name="status"
                  onChange={handleChange}
                >
                  <MenuItem value={"Available"}>Available</MenuItem>
                  <MenuItem value={"Unavailable"}>Unavailable</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          )}
          <Grid item xs={4}>
            <Button type="submit" fullWidth variant="contained" sx={{ p: 2 }}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
