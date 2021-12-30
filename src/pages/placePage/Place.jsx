import React, { Component, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import httpServices from "../../services/httpServices";
import RecipeReviewCard from "../../components/cardPlace";
import AddIcon from "@mui/icons-material/Add";
import { Button, Container, List } from "@mui/material";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@mui/styles";
import List3 from "../../components/listPlace";
const Places = ({ setPlaceId, searchTerm, city, selectedCategories }) => {
 
  useEffect(async () => {
    console.log("search term de la homeForm", searchTerm);
    console.log("citiulllllllll:", city);
    console.log("aaaaaaaaaaaaaaaaaaxxxxxxxxxx", selectedCategories);
    // const { data: places } = await httpServices.get(
    //   `${process.env.REACT_APP_ENDPOINT}/places/all?page=${1}&pageSize=${10}`
    // );
    // console.log("aaaaaaaaaaaaaaaaaaaaaaa", places[0].id);
    // const { data: categories } = await httpServices.get(
    //   `${process.env.REACT_APP_ENDPOINT}/categories/category/${places[0].id}`
    // );
    // console.log("categoriessssssssssssssssss:", categories);
    // setCategories(categories);
    // setPlaces(places);
    // console.log(places);
  }, []);
  const useStyles = makeStyles({
    buttonAdd: {
      boorder: "3",
      float: "right",
      position: "sticky",
      borderRadius: 50,
    },
    iconAdd: {
      color: "black",
    },
  });
  const history = useHistory();
  const classes = useStyles();
  return (
    <div className="bg">
    <Container>
      <Box mt={2}>
        <Button
          onClick={() => {
            history.push("addplace");
          }}
          className={classes.buttonAdd}
          type="submit"
          color="primary"
          variant="contained"
          endIcon={<AddIcon />}
          sx={{
            width: 150,
          }}
        >
          ADD Place
        </Button>
      </Box>
      <List3
        setPlaceId={setPlaceId}
        searchTerm={searchTerm}
        city={city}
        selectedCategories={selectedCategories}
      ></List3>
    </Container>
    </div>
  );
};

export default Places;
