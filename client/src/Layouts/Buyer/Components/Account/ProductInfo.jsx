import React from "react";
import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
export default function ProductInfo({ singleProduct, host }) {
  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Grid
            sm={2}
            xs={12}
            item
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 1,
            }}
          >
            <img
              style={{ width: "100%" }}
              src={`${host}/uploads/buyer/getImagesFromSeller/${singleProduct?.picture}`}
              alt=""
            />
          </Grid>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 1,
            }}
            sm={6}
            xs={12}
            item
          >
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <h4>
                        {singleProduct?.title} ({" "}
                        {singleProduct?.categoryId?.title} )
                      </h4>
                    </TableCell>
                    <TableCell>
                      <h4>
                        ₹{singleProduct?.price}/{singleProduct?.unitOfMeasure}
                      </h4>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <h4>Seller</h4>
                    </TableCell>
                    <TableCell>
                      <h4>{singleProduct?.sellerId?.name}</h4>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <h4>Contact Number</h4>
                    </TableCell>
                    <TableCell>
                      <h4>{singleProduct?.sellerId?.phone}</h4>
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
