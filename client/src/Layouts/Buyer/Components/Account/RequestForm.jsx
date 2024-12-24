import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Grid, TextField, Divider, Button } from "@mui/material";
import { useState } from "react";
import { useContext } from "react";
import { BuyerContext } from "../../Context/Context";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

export default function RequestForm({ price, productId }) {
  const { requestForProduct } = useContext(BuyerContext);
  const [formInfo, setFormInfo] = useState({
    name: "",
    phone: "",
    email: "",
    quantity: 1,
    message: "",
    location: "",
    city: "",
    pinCode: "",
    address: "",
  });
  const [formError, setFormError] = useState({
    name: null,
    phone: null,
    email: null,
    quantity: null,
    message: null,
    location: null,
    city: null,
    pinCode: null,
    address: null,
  });
  const handleSubmit = () => {
    requestForProduct({
      ...formInfo,
      productId,
      totalAmount: parseFloat(formInfo.quantity) * parseFloat(price),
    });
  };
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} sx={{ p: 2 }}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Enter your name"
              fullWidth
              name="name"
              onChange={(e) => {
                setFormError({ ...formError, [e.target.name]: null });
                setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
              }}
              value={formInfo.name}
              helperText={formError?.name && formError?.name}
              error={!!formError?.name}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Enter contact number"
              fullWidth
              name="phone"
              onChange={(e) => {
                setFormError({ ...formError, [e.target.name]: null });
                setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
              }}
              value={formInfo.phone}
              helperText={formError?.phone && formError?.phone}
              error={!!formError?.phone}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Enter your email Id"
              fullWidth
              name="email"
              onChange={(e) => {
                setFormError({ ...formError, [e.target.name]: null });
                setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
              }}
              value={formInfo.email}
              helperText={formError?.email && formError?.email}
              error={!!formError?.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Enter quantity"
              fullWidth
              name="quantity"
              type="number"
              onChange={(e) => {
                if (e.target.value < 1) {
                  setFormError({
                    ...formError,
                    [e.target.name]:
                      "Quantity must be greater than or equals to 1",
                  });
                } else {
                  setFormError({ ...formError, [e.target.name]: null });
                }
                setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
              }}
              value={formInfo.quantity}
              helperText={formError?.quantity && formError?.quantity}
              error={!!formError?.quantity}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Total Price"
              fullWidth
              name="totalAmount"
              disabled
              value={
                formInfo.quantity >= 1
                  ? parseFloat(formInfo.quantity) * parseFloat(price)
                  : 0
              }
              helperText={formError?.totalAmount && formError?.totalAmount}
              error={!!formError?.totalAmount}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Enter message"
              placeholder="Type your message here"
              fullWidth
              name="message"
              multiline
              rows={2}
              onChange={(e) => {
                setFormError({ ...formError, [e.target.name]: null });
                setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
              }}
              value={formInfo.message}
              helperText={formError?.message && formError?.message}
              error={!!formError?.message}
            />
          </Grid>
        </Grid>
        <Root sx={{ mt: 2 }}>
          <Divider>Shipping Address</Divider>
        </Root>
        <Grid container spacing={2} sx={{ p: 2 }}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Enter your location"
              fullWidth
              name="location"
              onChange={(e) => {
                setFormError({ ...formError, [e.target.name]: null });
                setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
              }}
              value={formInfo.location}
              helperText={formError?.location && formError?.location}
              error={!!formError?.location}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Enter your city"
              fullWidth
              name="city"
              onChange={(e) => {
                setFormError({ ...formError, [e.target.name]: null });
                setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
              }}
              value={formInfo.city}
              helperText={formError?.city && formError?.city}
              error={!!formError?.city}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Enter pin code"
              fullWidth
              name="pinCode"
              onChange={(e) => {
                setFormError({ ...formError, [e.target.name]: null });
                setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
              }}
              value={formInfo.pinCode}
              helperText={formError?.pinCode && formError?.pinCode}
              error={!!formError?.pinCode}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Enter address"
              placeholder="Type your address here"
              fullWidth
              name="address"
              multiline
              rows={2}
              onChange={(e) => {
                setFormError({ ...formError, [e.target.name]: null });
                setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
              }}
              value={formInfo.address}
              helperText={formError?.address && formError?.address}
              error={!!formError?.address}
            />
          </Grid>
        </Grid>
        <Box sx={{ p: 2 }}>
          <Button
            onClick={handleSubmit}
            sx={{ p: 1 }}
            className="button button-contactForm boxed-btn btn w-100"
            variant="outlined"
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
