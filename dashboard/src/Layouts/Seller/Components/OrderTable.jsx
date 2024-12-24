import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { Avatar, Box, Typography } from "@mui/material";

export default function OrderTable({ allOrders, host }) {
  return (
    <TableContainer component={Paper} elevation={0}>
      <Table sx={{ minWidth: 650 }} aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="center">Product</TableCell>
            <TableCell align="center">Buyer</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allOrders?.length > 0 ? (
            allOrders
              .slice()
              .reverse()
              .map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {moment(row?.createdAt).fromNow()}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <Avatar
                        src={`${host}/uploads/seller/${row?.productId?.picture}`}
                        variant="square"
                      />
                      <Typography variant="body2">
                        {row?.productId?.title} * {row?.quantity}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <Avatar
                        src={`${host}/uploads/seller/getImagesFromBuyer/${row?.buyerId?.profile}`}
                        variant="square"
                      />
                      <Typography variant="body2">
                        {row?.buyerId?.name} | {row?.buyerId?.phone}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>₹{row?.totalAmount}</TableCell>
                </TableRow>
              ))
          ) : (
            <TableCell colSpan={5} align="center" sx={{ color: "red" }}>
              No orders available!
            </TableCell>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
