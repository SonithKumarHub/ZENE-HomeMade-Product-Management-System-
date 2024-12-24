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

export default function CategoryTable({
  allCategories,
  host,
  show,
  setShow,
  setSelectedCategory,
}) {
  const { updateBuyerStatus } = useContext(AdminContext);
  console.log(allCategories);
  const handleUpdate = (category) => {
    setSelectedCategory(category);
    setShow(!show);
  };
  return (
    <TableContainer component={Paper} elevation={0}>
      <Table sx={{ minWidth: 650 }} aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allCategories.length > 0 ? (
            allCategories.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  backgroundColor:
                    row?.status == "Available" ? "#2e7d321a" : "#ff000017",
                }}
              >
                <TableCell component="th" scope="row">
                  {moment(row?.createdAt).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row?.title}
                </TableCell>
                <TableCell>{row?.status}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleUpdate(row)}
                    color="secondary"
                    variant="contained"
                  >
                    Update
                  </Button>
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
                No Categories Found!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
