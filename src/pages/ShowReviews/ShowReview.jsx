import React, { Component, useState, useEffect } from "react";
import QuiltedImageList from "../../components/imageList";
import httpServices from "../../services/httpServices";
import { Typography, Container, Box } from "@mui/material";
import { Rating } from "@mui/material";
import ListReview from "./../../components/listReview";
const ShowReviews = ({ placeId }) => {
  const [urlPhotos, setUrlPhotos] = useState([]);
  const [place, setPlace] = useState([]);
  const [categories, setCategories] = useState([]);
  const [value, setValue] = useState();
  useEffect(async () => {
    const { data: place } = await httpServices.get(
      `${process.env.REACT_APP_ENDPOINT}/places/${placeId}`
    );
    console.log("placeeeee");
    setPlace(place);
    console.log(place);
    const { data: images } = await httpServices.get(
      `${process.env.REACT_APP_ENDPOINT}/wrapperplaces/${placeId}`
    );

    setUrlPhotos(images);
    const { data: categories } = await httpServices.get(
      `${process.env.REACT_APP_ENDPOINT}/categories/aplace/${placeId}`
    );
    setCategories(categories);
    console.log(categories);
    const x = Math.ceil(place.rating);
    console.log(x);
    setValue(x);
    console.log(value);
  }, []);
  return (
    <Container>
      <Box ml={2} mt={2}>
        <Typography
          variant="h6"
          color="textprimary"
          component="h2"
          gutterBottom
        >
          Name: {place.name}
        </Typography>
      </Box>

      <Box ml={2} mt={1}>
        <Typography
          variant="h6"
          color="textprimary"
          component="h6"
          gutterBottom
        >
          Category:{" "}
          {categories.reduce((acc, curentValue) => {
            if (acc === "") return `${curentValue.name}`;
            else return `${acc}, ${curentValue.name}`;
          }, "")}
        </Typography>
      </Box>

      {urlPhotos.length > 0 ? (
        <Box m={2}>
          <QuiltedImageList
            height={300}
            width={"100%"}
            itemData={urlPhotos}
          ></QuiltedImageList>
        </Box>
      ) : (
        ""
      )}
      <Box ml={2} mt={2}>
        <Box m={1}>
          <Rating name="read-only" value={Math.ceil(place.rating)} readOnly />
        </Box>
      </Box>
      <Box>
        <ListReview placeId={placeId} />
      </Box>
    </Container>
  );
};

export default ShowReviews;
