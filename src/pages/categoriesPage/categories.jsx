import React, { Component, useEffect, useState } from "react";
import List2 from "../../components/listCategory";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
const useStyles = makeStyles({
  buttonAdd: {
    boorder: "3",
    float: "right",
    position: "sticky",
    borderRadius: 50,
  },
});
const Categories = () => {
  const history = useHistory();
  const handleAddCategory = () => {
    let path = `addcategory`;
    history.push(path);
  };
  const classes = useStyles();
  return (
    <div className="bg">
      <Box mt={2}>
        <Button
          className={classes.buttonAdd}s
          type="submit"
          color="primary"
          variant="contained"
          endIcon={<AddIcon />}
          sx={{
            width: 180,
          }}
          onClick={handleAddCategory}
        >
          ADD Category
        </Button>
      </Box>
      <List2 />
    </div>
  );
};
export default Categories;
