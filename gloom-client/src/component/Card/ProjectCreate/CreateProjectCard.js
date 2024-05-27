import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { authMe } from "../../../service/user";
import { getUserProject } from "../../../service/project";

const CreateProjectCard = (props) => {
	const {handleModalOpen} = props;
  return (
    <Box
      className="card_p_wrapped"
      sx={{
        width: 300,
        cursor: "pointer",
        margin: 2,
        "& :hover": {
          opacity: 0.7,
        },
      }}
      onClick={() => {
        handleModalOpen();
      }}
    >
      <Card
        className="real_card"
        variant="outlined"
        sx={{
          borderRadius: 3,
          flexDirection: "column",
          height: 200,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CardContent>
          <Typography
            textAlign={"center"}
            sx={{ fontWeight: "bold" }}
            color="initial"
          >
            เริ่มต้นโครงงานใหม่
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateProjectCard;
