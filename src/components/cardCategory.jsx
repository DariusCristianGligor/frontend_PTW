import React, { Component } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);
const theme = createTheme({
  spacing: 4,
  background: {
    default: deepOrange[900],
    paper: deepOrange[900],
  },
});
export default function BasicCard({ object, handleDelete, id }) {
  return (
    <Card
      sx={{
        minWidth: 310,
        maxWidth: 310,
        maxHeight: 220,
        minHeight: 220,
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {object.name}
        </Typography>

        <Typography variant="body2">{object.description}</Typography>
      </CardContent>
      <div className="x">
        <CardActions>
          <Button
            size="small"
            align-self="flex-end"
            onClick={() => {
              handleDelete(id);
            }}
          >
            <DeleteIcon />
            Delete
          </Button>
        </CardActions>
      </div>
    </Card>
  );
}
