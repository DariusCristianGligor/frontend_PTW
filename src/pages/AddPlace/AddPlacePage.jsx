import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Container, Typography, Button } from "@mui/material";
import React, { Component, useState, useEffect } from "react";
import httpServices from "../../services/httpServices";
import Select2 from "../../components/select";
import MyTextField from "../../components/textField";
import MultipleSelectCheckmarks from "../../components/multiSelect";
import Box from "@material-ui/core/Box";
import { styled } from "@mui/material/styles";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import AddIcon from "@mui/icons-material/Add";
import UploadIcon from "@mui/icons-material/Upload";
import WovenImageList from "./../../components/listImageForAddPlace";
const AddPlace = () => {
  const [images, setImages] = useState([]);
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState();
  const [disabledCity, setDisabledCity] = useState(true);
  const [countries, setCountries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [file, setFile] = useState([]);
  const paperStyle = {
    padding: "30px 20px",
    width: 600,
    height: 500,
    margin: "20px auto",
  };
  const history = useHistory();
  const Input = styled("input")({
    display: "none",
  });

  useEffect(async () => {
    const { data: countries } = await httpServices.get(
      `${process.env.REACT_APP_ENDPOINT}/countries`
    );
    setCountries(countries);
    const { data: categories } = await httpServices.get(
      `${process.env.REACT_APP_ENDPOINT}/categories/all`
    );
    setCategories(categories);
    console.log(countries);
  }, []);
  const handleCountry = async (id) => {
    setDisabledCity(false);
    console.log(id);
    const { data: cities } = await httpServices.get(
      `${process.env.REACT_APP_ENDPOINT}/cities/${id}`
    );
    setCities(cities);
  };
  const saveFile = (e) => {
    console.log("aaaaaaa");
    console.log("i selected", setSelectedCategories);
    setImages([]);
    setFile(e.target.files);
  };
  // const handleCategories = (categoriess) => {
  //   setImages([]);
  //   console.log("i selcted:", categoriess);
  //   setSelectedCategories(categoriess);
  //   console.log(
  //     "I selected this categoryyyyyyyyyyyyyyyyyy",
  //     selectedCategories
  //   );
  // };
  const uploadFile = async (e) => {
    history.push("/places");
    console.log("my file is:", file);
    const formData = new FormData();
    _.forEach(file, (f) => {
      formData.append("Images", f);
    });
    const body = JSON.stringify(selectedCategories);

    formData.append("Name", name);
    formData.append("Address", address);
    formData.append("CityId", city);
    formData.append(
      "Categories",
      new Blob([body], { type: "application/json" })
    );
    console.log(selectedCategories.length);
    console.log(formData);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    try {
      const res = await httpServices.post(
        `${process.env.REACT_APP_ENDPOINT}/places`,
        formData,
        config
      );
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <Container>
      <Box m={2}>
        <Typography
          variant="h6"
          color="textprimary"
          component="h2"
          gutterBottom
        >
          Create a new Place
        </Typography>
      </Box>
      <form onSubmit={uploadFile}>
        <Box m={2}>
          <MyTextField
            onChangeTextField={(n) => {
              setName(n);
            }}
            label="Name"
            width={"500"}
            name="name"
            variant="outlined"
            color="primary"
            min={5}
            max={20}
            errorMessaje={"The name length should be between 5 and 20"}
            multiline={false}
            required={true}
          />
        </Box>
        <Box m={2}>
          <Select2
            disabled={false}
            options={countries}
            width={"100%"}
            name={"Country"}
            value={"Country"}
            label="Country"
            onChange={(e) => {
              handleCountry(e.target.value);
            }}
          />
        </Box>
        <Box m={2}>
          <Select2
            disabled={disabledCity}
            options={cities}
            width={"100%"}
            value={"County"}
            label="County"
            onChange={(e) => {
              console.log("idCity:", e.target.value);
              setCity(e.target.value);
            }}
          />
        </Box>
        <Box m={2}>
          <MyTextField
            onChangeTextField={(a) => {
              console.log("addressa:", a);
              setAddress(a);
            }}
            label="Address"
            name="Address"
            variant="outlined"
            color="primary"
            multiline={true}
            rows={2}
            min={5}
            max={100}
            errorMessaje={"The address length should be between 5 and 20"}
            required={true}
          />
        </Box>
        <Box m={2}>
          <MultipleSelectCheckmarks
            options={categories}
            width={"100%"}
            handleOptions={(e) => {
              console.log(e);
              setSelectedCategories(e);
            }}
            value={"Categories"}
            label="Categories"
            disabled={false}
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
              height={350}
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
      </form>
    </Container>

  );
};
export default AddPlace;
