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
import qrCode from "../../Assets/qrcode.png";
import { useContext } from "react";
import { SellerContext } from "../../Context/Context";
import { toast } from "react-toastify";
import { useEffect } from "react";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Insert({ data, show, setShow, categories }) {
  const { insertProduct, updateProduct } = useContext(SellerContext);
  const [showSubmit, setShowSubmit] = useState(false);
  const [adminAmount, setAdminAmount] = useState(0);
  const [formInfo, setFormInfo] = useState({
    category: "",
    title: "",
    picture: "",
    price: "",
    unitOfMeasure: "",
    description: "",
    transactionId: "",
  });
  useEffect(() => {
    setErrors({
      category: "",
      title: "",
      picture: "",
      price: "",
      unitOfMeasure: "",
      description: "",
      transactionId: "",
    });
    if (data) {
      setFormInfo({
        category: data?.categoryId?._id,
        title: data?.title,
        price: data?.price,
        unitOfMeasure: data?.unitOfMeasure,
        description: data?.description,
        transactionId: data?.transactionId,
      });
      setAdminAmount(data?.adminAmount);
    } else {
      setFormInfo({
        category: "",
        title: "",
        picture: "",
        price: "",
        unitOfMeasure: "",
        description: "",
        transactionId: "",
      });
      setErrors({
        category: "",
        title: "",
        picture: "",
        price: "",
        unitOfMeasure: "",
        description: "",
        transactionId: "",
      });
    }
  }, [data, show]);
  const [errors, setErrors] = useState({
    category: "",
    title: "",
    picture: "",
    price: "",
    unitOfMeasure: "",
    description: "",
    transactionId: "",
  });

  const validate = () => {
    let tempErrors = {};
    tempErrors.category = formInfo.category ? "" : "Category is required.";
    tempErrors.transactionId = formInfo.transactionId
      ? ""
      : "Transaction Id is required.";
    tempErrors.title = formInfo.title ? "" : "Title is required.";
    if (!data) {
      tempErrors.picture = formInfo.picture ? "" : "Picture is required.";
    }
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
      const productData = new FormData();
      productData.append("title", formInfo?.title);
      productData.append("categoryId", formInfo?.category);
      productData.append("description", formInfo?.description);
      productData.append("price", formInfo?.price);
      productData.append("unitOfMeasure", formInfo?.unitOfMeasure);
      productData.append("adminAmount", adminAmount);
      productData.append("transactionId", formInfo?.transactionId);
      productData.append("picture", formInfo?.picture);
      if (data) {
        updateProduct(data?._id, productData);
      } else {
        insertProduct(productData);
      }
      setShow(!show);
    } else {
      toast.error("Form validation failed!");
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
                  onChange={(e) => {
                    setErrors({ ...errors, category: "" });
                    setFormInfo({ ...formInfo, category: e.target.value });
                  }}
                >
                  {categories?.map((category, index) => (
                    <MenuItem value={category?._id} key={index}>
                      {category?.title}
                    </MenuItem>
                  ))}
                </Select>
                {errors.category && (
                  <Typography variant="caption" color="error">
                    {errors.category}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Enter Title"
                name="title"
                value={formInfo.title}
                onChange={(e) => {
                  setErrors({ ...errors, [e.target.name]: "" });
                  setFormInfo({
                    ...formInfo,
                    [e.target.name]: e.target.value,
                  });
                }}
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
                onChange={(e) => {
                  setErrors({ ...errors, [e.target.name]: "" });
                  setFormInfo({
                    ...formInfo,
                    [e.target.name]: e.target.files[0],
                  });
                }}
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
                onChange={(e) => {
                  setErrors({
                    ...errors,
                    [e.target.name]: "",
                  });
                  setFormInfo({
                    ...formInfo,
                    [e.target.name]: e.target.value,
                  });
                  const value = parseFloat(e.target.value); // Convert the input value to a number
                  if (isNaN(value) || e.target.value === "") {
                    setAdminAmount(0);
                  } else if (value < 50) {
                    setAdminAmount(10);
                  } else if (value >= 50 && value < 100) {
                    setAdminAmount(20);
                  } else if (value >= 100 && value < 200) {
                    setAdminAmount(50);
                  } else if (value >= 200 && value < 450) {
                    setAdminAmount(70);
                  } else if (value >= 450 && value < 750) {
                    setAdminAmount(80);
                  } else if (value >= 750 && value < 1000) {
                    setAdminAmount(100);
                  } else {
                    setAdminAmount(Math.floor(value * 0.1)); // Rounds down to the nearest integer
                  }
                }}
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
                  onChange={(e) => {
                    setErrors({ ...errors, [e.target.name]: "" });
                    setFormInfo({
                      ...formInfo,
                      [e.target.name]: e.target.value,
                    });
                  }}
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
                  <Typography variant="caption" color="error">
                    {errors.unitOfMeasure}
                  </Typography>
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
                onChange={(e) => {
                  setErrors({ ...errors, [e.target.name]: "" });
                  setFormInfo({
                    ...formInfo,
                    [e.target.name]: e.target.value,
                  });
                }}
                error={!!errors.description}
                helperText={errors.description}
                required
                multiline
                rows={2}
              />
            </Grid>
            {showSubmit && (
              <>
                <Grid
                  item
                  xs={4}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <img src={qrCode} style={{ width: "200px" }} alt="" />
                  <Typography variant="caption" color="text.secondary">
                    scan this qr to make payment
                  </Typography>
                </Grid>
                <Grid
                  item
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                  xs={4}
                >
                  <TextField
                    fullWidth
                    label="Enter admin amount"
                    name="adminAmount"
                    value={adminAmount}
                    required
                    disabled
                  />
                </Grid>
                <Grid
                  item
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                  xs={4}
                >
                  <TextField
                    fullWidth
                    placeholder="type upi transaction id here"
                    label="Enter transaction Id"
                    name="transactionId"
                    value={formInfo.transactionId}
                    onChange={(e) => {
                      setErrors({
                        ...errors,
                        [e.target.name]: "",
                      });
                      setFormInfo({
                        ...formInfo,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    error={!!errors.transactionId}
                    helperText={errors.transactionId}
                    required
                  />
                </Grid>
              </>
            )}
            {showSubmit ? (
              <>
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
                <Grid item xs={12}>
                  <Button
                    onClick={() => setShowSubmit(!showSubmit)}
                    fullWidth
                    variant="outlined"
                    color="error"
                    sx={{ p: 1 }}
                  >
                    Cancel
                  </Button>
                </Grid>
              </>
            ) : (
              <Grid item xs={12}>
                <Button
                  onClick={() => setShowSubmit(!showSubmit)}
                  fullWidth
                  variant="outlined"
                  sx={{ p: 1 }}
                >
                  Submit
                </Button>
              </Grid>
            )}
          </Grid>
        </Paper>
      )}
    </Box>
  );
}
