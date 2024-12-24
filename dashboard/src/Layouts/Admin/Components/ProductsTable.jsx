import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { Avatar, Box, Button, Tooltip, Typography } from "@mui/material";
import { useContext } from "react";
import { AdminContext } from "../Context/Context";
export default function ProductsTable({ allProducts, host }) {
  const { updateProduct } = useContext(AdminContext);
  console.log(allProducts);
  const handleUpdate = (id, status) => {
    updateProduct(id, { status });
  };
  return (
    <TableContainer component={Paper} elevation={0}>
      <Table sx={{ minWidth: 650 }} aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Seller</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allProducts?.length > 0 ? (
            allProducts
              ?.slice()
              .reverse()
              .map((row, index) => (
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
                    <Avatar
                      sx={{ width: 80, height: 80 }}
                      src={`${host}/uploads/admin/getImagesFromSeller/${row?.sellerId?.profile}`}
                    />
                    <Typography color="text.secondary" variant="body2">
                      {row?.sellerId?.name} | {row?.sellerId?.phone}
                    </Typography>
                    <Typography color="text.secondary" variant="caption">
                      {moment(row?.createdAt).fromNow()}
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Avatar
                      sx={{ width: 100, height: 100 }}
                      variant="square"
                      src={`${host}/uploads/admin/getImagesFromSeller/${row?.picture}`}
                    />
                    <Typography color="text.secondary" variant="body2">
                      {row?.title} ( {row?.categoryId?.title} )
                    </Typography>
                  </TableCell>
                  <TableCell>
                    ₹{row?.price}/{row?.unitOfMeasure}
                    <br />
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography variant="caption">
                        Revenue : ₹{row?.adminAmount}
                      </Typography>
                      <Typography variant="caption">
                        Transaction Id: {row?.transactionId}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {row?.status == "Available" ? (
                      <Button
                        onClick={() => handleUpdate(row?._id, "Blocked")}
                        color="error"
                        variant="contained"
                      >
                        Block
                      </Button>
                    ) : (
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Box>
                          <Button
                            onClick={() => handleUpdate(row?._id, "Available")}
                            color="success"
                            variant="contained"
                            disabled={
                              row?.status == "Unavailable" ? true : false
                            }
                          >
                            Activate
                          </Button>
                        </Box>
                        <Box>
                          <Typography variant="caption" color={"error"}>
                            {row?.status == "Unavailable"
                              ? "Product Unavailable!"
                              : ""}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </TableCell>
                </TableRow>
              ))
          ) : (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                colSpan={5}
                align="center"
                sx={{
                  backgroundColor: "#ff000017",
                  color: "grey",
                  fontWeight: "600",
                }}
              >
                No products Found!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
