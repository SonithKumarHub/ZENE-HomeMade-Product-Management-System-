import React, { useContext, useEffect } from "react";
import { AdminContext } from "../Context/Context";
import { Box } from "@mui/material";
import Breadcrumbs from "../Components/Banner/Breadcrumbs";
import FeedbackTable from "../Components/FeedbackTable";

export default function Feedbacks() {
  const { getAllFeedbacks, allFeedbacks } = useContext(AdminContext);
  useEffect(() => {
    getAllFeedbacks();
  }, []);
  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ p: 2 }}>
        <Breadcrumbs title={"Feedbacks"} />
      </Box>
      <Box sx={{ p: 2 }}>
        <FeedbackTable allFeedbacks={allFeedbacks} />
      </Box>
    </Box>
  );
}
