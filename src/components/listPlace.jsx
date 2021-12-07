import React, { Component, useState, useEffect } from "react";
import RecipeReviewCard from "./cardPlace";
import { Grid, Box, Pagination } from "@mui/material";
import httpServices from "../services/httpServices";
const List3 = ({ setPlaceId, searchTerm, city, selectedCategories }) => {
  const [places, setPlaces] = useState([]);
  const [page, SetPage] = useState(1);
  const [countPage, SetCountPage] = useState(1);
  useEffect(async () => {
    if (city != undefined) {
      const stringData = selectedCategories
        .map((value) => `categories=${value.id}`)
        .join("&");
      console.log(stringData);
      const { data: places } = await httpServices.get(
        `${
          process.env.REACT_APP_ENDPOINT
        }/Places/all/${city}?${stringData}&page=${page}&pageSize=${4}`
      );
      setPlaces(places);
    } else {
      const { data: places } = await httpServices.get(
        `${
          process.env.REACT_APP_ENDPOINT
        }/places/all?page=${page}&pageSize=${4}`
      );
      setPlaces(places);
      console.log("places:", places);
    }
  }, [page]);
  const loadCountPage = async () => {
    if (city != null) {
      const stringData = selectedCategories
        .map((value) => `categories=${value.id}`)
        .join("&");
      console.log(stringData);
      const { data: numberOfPlaces } = await httpServices.get(
        `${process.env.REACT_APP_ENDPOINT}/Places/allnumber/categories/${city}?${stringData}`
      );
      if (Math.floor(numberOfPlaces / 4) === numberOfPlaces / 4)
        SetCountPage(Math.floor(numberOfPlaces / 4));
      else {
        SetCountPage(Math.floor(numberOfPlaces / 4) + 1);
      }
      console.log("we have", countPage);
    } else {
      const { data: numberOfPlaces } = await httpServices.get(
        `${process.env.REACT_APP_ENDPOINT}/places/numberOfPlaces`
      );
      if (Math.floor(numberOfPlaces / 4) === numberOfPlaces / 4)
        SetCountPage(Math.floor(numberOfPlaces / 4));
      else {
        SetCountPage(Math.floor(numberOfPlaces / 4) + 1);
      }
      console.log("we have", countPage);
    }
  };
  useEffect(async () => {
    loadCountPage();
    //loadPlaces();
    console.log(places);
  }, [page]);
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
        {places
          .filter((place) => {
            if (searchTerm == "") {
              console.log("searchhhhh");
              return place;
            } else if (
              place.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return place;
            }
          })
          .map((place) => (
            <Box m={3} sx={{ p: 1 }} key={place.id}>
              <RecipeReviewCard
                setPlaceId={setPlaceId}
                key={place.id}
                object={place}
                setPlaceId={setPlaceId}
              ></RecipeReviewCard>
            </Box>
          ))}
      </Box>

      <Box mb={2}>
        <Pagination
          count={countPage}
          color="primary"
          variant="outlined"
          onChange={(event, value) => SetPage(value)}
        />
      </Box>
    </Grid>
  );
};
export default List3;
