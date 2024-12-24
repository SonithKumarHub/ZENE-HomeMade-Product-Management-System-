import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { Avatar, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { AdminContext } from "../Context/Context";

export default function BuyersTable({ allBuyers, host }) {
  const { updateBuyerStatus } = useContext(AdminContext);
  console.log(allBuyers);
  const handleUpdate = (id, status) => {
    updateBuyerStatus(id, { status });
  };
  return (
    <TableContainer component={Paper} elevation={0}>
      <Table sx={{ minWidth: 650 }} aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Buyer</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allBuyers.length > 0 ? (
            allBuyers.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  backgroundColor:
                    row?.status == "Active" ? "#2e7d321a" : "#ff000017",
                }}
              >
                <TableCell component="th" scope="row">
                  {moment(row?.createdAt).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Avatar
                    src={`${host}/uploads/admin/getImagesFromBuyer/${row?.profile}`}
                  />
                  <Typography color="text.secondary" variant="body2">
                    {row?.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  {row?.phone} | {row?.email}
                </TableCell>
                <TableCell>{row?.status}</TableCell>
                <TableCell>
                  {row?.status == "Active" ? (
                    <Button
                      onClick={() => handleUpdate(row?._id, "Blocked")}
                      color="error"
                      variant="contained"
                    >
                      Block
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleUpdate(row?._id, "Active")}
                      color="success"
                      variant="contained"
                    >
                      UnBlock
                    </Button>
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
                No Buyers Found!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
