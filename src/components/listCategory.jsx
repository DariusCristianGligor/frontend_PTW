import React, { Component, useState, useEffect } from "react";
import BasicCard from "./cardCategory";
import { makeStyles } from "@mui/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Pagination } from "@mui/material";
import { Grid, Box } from "@mui/material";
import httpServices from "../services/httpServices";
const List2 = () => {
  const useStyles = makeStyles({
    cardCategory: {
      background: "linear-gradient(45deg,#D3D3D3,#D3D3D3)",
    },
  });
  const [categories, setCategories] = useState([]);
  const [page, SetPage] = useState(1);
  const [countPage, SetCountPage] = useState(1);
  const loadCategories = async () => {
    const { data: categories } = await httpServices.get(
      `${process.env.REACT_APP_ENDPOINT}/categories?page=${page}&pageSize=${9}`
    );
    // /categories?_page=${page}
    setCategories(categories);
    console.log(categories);
  };
  const loadCountPage = async () => {
    const { data: numberOfCategory } = await httpServices.get(
      `${process.env.REACT_APP_ENDPOINT}/categories/numberOfCategory`
    );
    // /categories?_page=${page}
    if (Math.floor(numberOfCategory / 9) === numberOfCategory / 9)
      SetCountPage(Math.floor(numberOfCategory / 9));
    else {
      SetCountPage(Math.floor(numberOfCategory / 9) + 1);
    }
    console.log(countPage);
  };
  useEffect(async () => {
    loadCountPage();
    loadCategories();
  }, [page]);
  const handleDelete = async (categoryId) => {
    console.log(categoryId);
    const initialCategories = categories;
    try {
      const categories2 = categories.filter((x) => x.id !== categoryId);
      setCategories(categories2);
      await httpServices.delete(
        `${process.env.REACT_APP_ENDPOINT}/categories/${categoryId}`
      );
      console.log(categories2);
    } catch (ex) {
      setCategories(initialCategories);
    }
    console.log(categories);
  };
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
          maxWidth: 1000,
        }}
      >
        {categories.map((category) => (
          <Box sx={{ p: 1 }} key={category.id}>
            <BasicCard
              key={category.id}
              id={category.id}
              className={classes.cardCategory}
              object={category}
              handleDelete={(categoryId) => {
                handleDelete(categoryId);
              }}
            />
          </Box>
        ))}
      </Box>
      <Pagination
        count={countPage}
        color="primary"
        variant="outlined"
        onChange={(event, value) => SetPage(value)}
      />
    </Grid>
  );
};
export default List2;
