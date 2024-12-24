import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import { useContext } from "react";
import { SellerContext } from "../../Context/Context";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
export default function SellerAlert() {
  const { updateProfile } = useContext(SellerContext);
  const handleUpdateQrCode = (picture) => {
    const data = new FormData();
    data.append("qrCode", picture);
    updateProfile(data);
  };
  return (
    <div>
      <Alert
        // variant="outlined"
        action={
          <Button
            onChange={(e) => handleUpdateQrCode(e.target.files[0])}
            component="label"
            role={undefined}
            variant="text"
            color="warning"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput type="file" />
          </Button>
        }
        severity="warning"
      >
        <AlertTitle>Warning</AlertTitle>
        Complete your profile by uploading your qr code to post your product
      </Alert>
    </div>
  );
}
