import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Insert({ data, show, setShow }) {
  const [formInfo, setFormInfo] = useState({
    category: "",
    title: "",
    picture: "",
    price: "",
    unitOfMeasure: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    category: "",
    title: "",
    picture: "",
    price: "",
    unitOfMeasure: "",
    description: "",
  });

  const validate = () => {
    let tempErrors = {};
    tempErrors.category = formInfo.category ? "" : "Category is required.";
    tempErrors.title = formInfo.title ? "" : "Title is required.";
    tempErrors.picture = formInfo.picture ? "" : "Picture is required.";
    tempErrors.price = formInfo.price ? "" : "Price is required.";
    tempErrors.unitOfMeasure = formInfo.unitOfMeasure
      ? ""
      : "Unit of Measure is required.";
    tempErrors.description = formInfo.description
      ? ""
      : "Description is required.";

    setErrors(tempErrors);

    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form is valid and ready for submission", formInfo);
    } else {
      console.log("Form is invalid");
    }
  };

  return (
    <Box>
      {show && (
        <Paper sx={{ flexGrow: 1, p: 4 }}>
          <Box sx={{ p: 1, display: "flex", justifyContent: "center" }}>
            <Typography variant="h6" sx={{ fontWeight: "600" }}>
              {data ? "Update Product Info" : "Insert New Product"}
            </Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth error={!!errors.category}>
                <InputLabel id="demo-simple-select-label">
                  Select Category
                </InputLabel>
                <Select
                  name="category"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Select Category"
                  value={formInfo.category}
                  onChange={(e) =>
                    setFormInfo({ ...formInfo, category: e.target.value })
                  }
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                {errors.category && (
                  <Typography color="error">{errors.category}</Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Enter Title"
                name="title"
                value={formInfo.title}
                onChange={(e) =>
                  setFormInfo({
                    ...formInfo,
                    [e.target.name]: e.target.value,
                  })
                }
                error={!!errors.title}
                helperText={errors.title}
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Upload picture"
                type="file"
                name="picture"
                onChange={(e) =>
                  setFormInfo({
                    ...formInfo,
                    [e.target.name]: e.target.files[0],
                  })
                }
                InputLabelProps={{ shrink: true }}
                error={!!errors.picture}
                helperText={errors.picture}
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Enter Price"
                name="price"
                onChange={(e) =>
                  setFormInfo({
                    ...formInfo,
                    [e.target.name]: e.target.value,
                  })
                }
                type="number"
                value={formInfo.price}
                error={!!errors.price}
                helperText={errors.price}
                required
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth error={!!errors.unitOfMeasure}>
                <InputLabel id="demo-simple-select-label">
                  Select Unit Of Measure
                </InputLabel>
                <Select
                  name="unitOfMeasure"
                  value={formInfo.unitOfMeasure}
                  onChange={(e) =>
                    setFormInfo({
                      ...formInfo,
                      [e.target.name]: e.target.value,
                    })
                  }
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Select Unit Of Measure"
                >
                  <MenuItem value={"Piece"}>Piece</MenuItem>
                  <MenuItem value={"Set"}>Set</MenuItem>
                  <MenuItem value={"Dozen"}>Dozen</MenuItem>
                  <MenuItem value={"Pack"}>Pack</MenuItem>
                  <MenuItem value={"KG"}>KG</MenuItem>
                </Select>
                {errors.unitOfMeasure && (
                  <Typography color="error">{errors.unitOfMeasure}</Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                placeholder="type product description here"
                label="Enter description"
                name="description"
                value={formInfo.description}
                onChange={(e) =>
                  setFormInfo({
                    ...formInfo,
                    [e.target.name]: e.target.value,
                  })
                }
                error={!!errors.description}
                helperText={errors.description}
                required
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={handleSubmit}
                fullWidth
                variant="outlined"
                sx={{ p: 1 }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
  );
}
