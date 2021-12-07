import React, { Component, useState, useEffect } from "react";
import List from "@mui/material/List";
import RecipeReviewCard from "./cardPlace";
import ListItem from "@mui/material/ListItem";
import { Container, Grid, Box } from "@mui/material";
import { Pagination } from "@mui/material";
import httpServices from "../services/httpServices";
import ActionAreaCard from "./carReview";

const ListReview = ({ placeId }) => {
  const [reviews, setReviews] = useState([]);
  const [page, SetPage] = useState(1);
  const [countPage, SetCountPage] = useState(1);
  useEffect(async () => {
    const { data: reviews } = await httpServices.get(
      `${
        process.env.REACT_APP_ENDPOINT
      }/Reviews/${placeId}?page=${page}&pageSize=${10}`
    );
    setReviews(reviews);
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    console.log("reviews:", reviews);
  }, []);
  const loadCountPage = async () => {
    const { data: numberOfReviews } = await httpServices.get(
      `${process.env.REACT_APP_ENDPOINT}/Reviews/numberOfReviews${placeId}`
    );
    // /categories?_page=${page}
    if (Math.floor(numberOfReviews / 10) === numberOfReviews / 10)
      SetCountPage(Math.floor(numberOfReviews / 10));
    else {
      SetCountPage(Math.floor(numberOfReviews / 10) + 1);
    }
    console.log("we have", countPage);
  };
  useEffect(async () => {
    loadCountPage();
    //loadreviews();
    console.log(reviews);
  }, [page]);
  return (
    <Container>
      <List
        sx={{
          width: "100%",
          maxWidth: 700,
          spacing: 4,
        }}
      >
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ListItem key={review.id}>
              <ActionAreaCard
                object={review}
                width={700}
                height={400}
              ></ActionAreaCard>
            </ListItem>
          ))
        ) : (
          <ListItem key={"x1"}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              direction="column"
            >
              <p>Without Reviews</p>
            </Grid>
          </ListItem>
        )}
      </List>
      {reviews.length > 0 ? (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Pagination
            count={countPage}
            color="primary"
            variant="outlined"
            onChange={(event, value) => SetPage(value)}
          />
        </Grid>
      ) : (
        " "
      )}
    </Container>
  );
};
export default ListReview;
