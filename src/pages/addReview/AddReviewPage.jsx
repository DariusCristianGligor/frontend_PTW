import { Container, Typography, Button } from "@mui/material";
import React, { Component, useState, useEffect } from "react";
import httpServices from "../../services/httpServices";
import Select2 from "../../components/select";
import MyTextField from "../../components/textField";
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { styled } from "@mui/material/styles";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import WovenImageList from "../../components/listImageForAddPlace";
import _ from "lodash";
import AddIcon from "@mui/icons-material/Add";
import UploadIcon from "@mui/icons-material/Upload";
import Rating from "@mui/material/Rating";
const AddReview = ({ placeId }) => {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState([]);
  const [description, setDescription] = useState([]);
  console.log("placeId:", placeId);
  const [value, setValue] = React.useState(2);
  const [costOfPlace, setCostOfPlace] = useState([
    { name: "Cheap", id: "Cheap" },
    { name: "Affordable", id: "Affordable" },
    { name: "Expensive", id: "Expensive" },
  ]);
  const [selectedCostOfPlace, setSelectedCostOfPlace] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${process.env.REACT_APP_ENDPOINT}/Auth/user`,
        {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const resp = await response.json();
      console.log(resp);
    })();
  });
  const Input = styled("input")({
    display: "none",
  });
  const saveFile = (e) => {
    console.log("aaaaaaa");
    setImages([]);
    setFile(e.target.files);
  };
  const uploadFile = async (e) => {
    history.push("/places");
    console.log(file);
    console.log(
      `I upload:${description}, rating:{${value}},placeId:${placeId} ,${selectedCostOfPlace}`
    );
    const formData = new FormData();
    formData.append("Description", description);
    formData.append("Stars", value);
    formData.append("PlaceId", placeId);
    formData.append("CostOfPlace", selectedCostOfPlace);
    _.forEach(file, (f) => {
      formData.append("Image", f);
    });

    console.log(formData);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    try {
      const res = await httpServices.post(
        `${process.env.REACT_APP_ENDPOINT}/reviews`,
        formData,
        config
      );
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };
  const history = useHistory();
  return (
    <div className="bg">
      <Container>
        <Box m={2}>
          <Typography
            variant="h6"
            color="textprimary"
            component="h2"
            gutterBottom
          >
            Create a new Review
          </Typography>
        </Box>
        <form onSubmit={uploadFile}>
          <Box m={2}>
            <Select2
              disabled={false}
              options={costOfPlace}
              width={"100%"}
              name={"CostOfPlace"}
              value={"CostOfPlace"}
              label="Cost of place"
              onChange={(e) => {
                console.log(e.target.value);
                setSelectedCostOfPlace(e.target.value);
              }}
            />
          </Box>
          <Box m={2}>
            <MyTextField
              onChangeTextField={(a) => {
                console.log("description:", a);
                setDescription(a);
              }}
              label="Description"
              name="Description"
              variant="outlined"
              color="primary"
              multiline={true}
              rows={2}
              min={5}
              max={100}
              errorMessaje={
                "The description length should be between 5 and 100 characters"
              }
              required={true}
            />
          </Box>
          <Box m={2}>
            <Typography component="legend">Rating</Typography>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </Box>
          <Box m={2}>
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                onChange={saveFile}
              />
              <Button
                variant="contained"
                component="span"
                sx={{
                  width: 150,
                }}
                endIcon={<UploadIcon />}
              >
                Upload
              </Button>
            </label>
          </Box>
          {images.length > 0 ? (
            <Box m={2}>
              <WovenImageList
                height={280}
                width={"100%"}
                itemData={images}
              ></WovenImageList>
            </Box>
          ) : (
            ""
          )}
          <Box m={2}>
            <Button
              onClick={() => {
                if (images.length == 0) {
                  let k = file.length;
                  let z = [];
                  for (let x = 0; x < k; x++) {
                    z = [...z, URL.createObjectURL(file[x])];
                    console.log(x);
                  }
                  setImages(z);
                  console.log(images);
                } else {
                  setImages([]);
                }
              }}
              color="primary"
              variant="contained"
              endIcon={<PhotoCamera />}
              sx={{
                width: 150,
              }}
            >
              Photos
            </Button>
          </Box>
          <Box m={2}>
            <Button
              onClick={() => {
                // history.push("/places");
              }}
              type="submit"
              color="primary"
              variant="contained"
              endIcon={<AddIcon />}
              sx={{
                width: 150,
              }}
            >
              ADD Review
            </Button>
          </Box>
        </form>
      </Container>
    </div>
  );
};
export default AddReview;
