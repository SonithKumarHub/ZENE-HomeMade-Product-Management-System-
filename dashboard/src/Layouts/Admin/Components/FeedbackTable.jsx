import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { Avatar, Button, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { AdminContext } from "../Context/Context";

export default function FeedbackTable({ allFeedbacks }) {
  return (
    <TableContainer component={Paper} elevation={0}>
      <Table sx={{ minWidth: 650 }} aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Message</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allFeedbacks.length > 0 ? (
            allFeedbacks.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  {moment(row?.createdAt).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography color="text.secondary" variant="body2">
                    {row?.name}
                  </Typography>
                </TableCell>
                <TableCell>{row?.email}</TableCell>
                <TableCell>{row?.subject}</TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    value={row?.message}
                    readOnly
                    multiline
                    rows={2}
                  />
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
                No Feedbacks Found!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
