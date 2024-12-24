import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Insert from "./Insert";
import { Avatar, Button, Switch, TextField, Typography } from "@mui/material";
import moment from "moment";
import { useContext } from "react";
import { SellerContext } from "../../Context/Context";
const label = { inputProps: { "aria-label": "Switch demo" } };

export default function ViewAll({
  show,
  setShow,
  setSelectedSProduct,
  products,
  host,
}) {
  const { updateProduct } = useContext(SellerContext);
  const handleUpdate = (data) => {
    if (show) {
      setShow(false);
      setSelectedSProduct(null);
    } else {
      setSelectedSProduct(data);
      setShow(true);
    }
  };
  const handleUpdateStatus = (e, data) => {
    var status = "";
    if (e.target.checked == false) {
      status = "Unavailable";
    } else {
      status = "Available";
    }
    updateProduct(data?._id, { status });
  };
  return (
    <TableContainer component={Paper} elevation={0}>
      <Table sx={{ minWidth: 650 }} aria-label="a dense table">
        <TableHead>
          <TableRow sx={{ fontWeight: "600" }}>
            <TableCell sx={{ fontWeight: "600" }}>Product</TableCell>
            <TableCell sx={{ fontWeight: "600" }}>Description</TableCell>
            <TableCell sx={{ fontWeight: "600" }}>Price</TableCell>
            <TableCell sx={{ fontWeight: "600" }}>Picture</TableCell>
            <TableCell sx={{ fontWeight: "600" }} colSpan={2} align="center">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products?.length > 0 ? (
            products.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  backgroundColor:
                    row?.status == "Pending"
                      ? "#ffa7263b"
                      : row?.status == "Available"
                      ? "#66bb6a26"
                      : "#f4433624",
                }}
              >
                <TableCell component="th" scope="row">
                  {row?.title}
                  <br />({row?.categoryId?.title}) - {row?.status}
                  <br />
                  <small>{moment(row?.createdAt).fromNow()}</small>
                </TableCell>
                <TableCell>
                  <TextField
                    value={row?.description}
                    multiline
                    rows={2}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  ₹{row?.price} / {row?.unitOfMeasure}
                </TableCell>
                <TableCell>
                  <Avatar
                    variant="square"
                    sx={{ width: 100, height: 100 }}
                    src={`${host}/uploads/seller/${row?.picture}`}
                  />
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleUpdate(row)}>Update</Button>
                </TableCell>
                <TableCell>
                  {row?.status != "Pending" && row?.status != "Blocked" ? (
                    <Switch
                      size="small"
                      color={row?.status == "Unavailable" ? "error" : "success"}
                      onChange={(e) => handleUpdateStatus(e, row)}
                      {...label}
                      defaultChecked={row?.status == "Available" ? true : false}
                    />
                  ) : row?.status == "Blocked" ? (
                    <Typography
                      variant="caption"
                      sx={{ fontSize: "10px", color: "red" }}
                    >
                      Blocked by admin
                    </Typography>
                  ) : (
                    <Typography
                      variant="caption"
                      sx={{ fontSize: "10px", color: "orange" }}
                    >
                      Not approved
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: "#ffeded",
                  fontWeight: "600",
                  color: "grey",
                }}
                colSpan={5}
                align="center"
              >
                No products found!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
