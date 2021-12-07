import React, { Component, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import httpServices from "../../services/httpServices";
import Select2 from "../../components/select";
import MultipleSelectCheckmarks from "../../components/multiSelect";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Box } from "@mui/system";
import { Grid, Paper, Avatar, Button } from "@material-ui/core";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { makeStyles } from "@mui/styles";
import Input from "@mui/material/Input";
const ariaLabel = { "aria-label": "description" };
const paperStyle = {
  padding: "30px 20px",
  width: "50vh",
  height: 430,
  margin: "20px auto",
};
const headerStyle = { margin: 0 };
const avatarStyle = { backgroundColor: "#3385ff" };
const marginTop = { marginTop: 5 };
const HomeForm = ({
  setSearchTerm,
  setCity,
  setSelectedCategories,
  searchTerm,
}) => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [disableds, setDisableds] = useState([true, true, true]);

  useEffect(async () => {
    console.log("disabled:", disableds[0]);
    async function fetchData() {
      const { data: countries } = await httpServices.get(
        `${process.env.REACT_APP_ENDPOINT}/countries`
      );
    }
    fetchData();
    const { data: countries } = await httpServices.get(
      `${process.env.REACT_APP_ENDPOINT}/countries`
    );
    setCountries(countries);
  }, []);
  const handleChangeCountries = async (event) => {
    console.log("renderrrrrr");
    disableds[0] = false;
    setDisableds(disableds);
    console.log(event.target.value);
    const { data: cities } = await httpServices.get(
      `${process.env.REACT_APP_ENDPOINT}/cities/${event.target.value}`
    );
    setCities(cities);
    console.log(cities);
  };
  const handleChangeCities = async (event) => {
    console.log("am ales orasul:", event.target.value);
    disableds[1] = false;
    setDisableds(disableds);
    console.log(disableds);
    const { data: categories } = await httpServices.get(
      `${process.env.REACT_APP_ENDPOINT}/categories/all`
    );
    setCategories(categories);
    console.log(categories);
  };
  const handleCategories = () => {
    console.log("aaaaaaaaaaaa");

    if (disableds[2] === true) {
      disableds[2] = false;
      setDisableds(disableds);
    }
    console.log(disableds[2]);
  };
  const useStyles = makeStyles({
    buttonSearch: {
      background: "linear-gradient(45deg,#b7d7eb,#b7d7eb)",
      float: "right",
    },
  });
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className="bg">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        style={{ minHeight: "86vh" }}
      >
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            {/* <Avatar style={avatarStyle}>
            // <SearchOutlinedIcon />
          </Avatar> */}
            <h2 style={headerStyle}>Find a place</h2>
          </Grid>
          <List
            sx={{
              width: "100%",
              maxWidth: "100%",
              spacing: 10,
            }}
            style={marginTop}
          >
            <ListItem>
              <Select2
                width={245}
                options={countries}
                value={"Countries"}
                label="Countries"
                onChange={(event) => handleChangeCountries(event)}
              />
            </ListItem>
            <ListItem>
              <Select2
                width={245}
                disabled={disableds[0]}
                options={cities}
                value={"County"}
                label="County"
                onChange={(event) => {
                  setCity(event.target.value);
                  handleChangeCities(event);
                }}
              />
            </ListItem>
            <ListItem position="relative">
              <MultipleSelectCheckmarks
                options={categories}
                handleOptions={handleCategories}
                value={"Categories"}
                label="Categories"
                width={245}
                handleOptions={(e) => {
                  setSelectedCategories(e);
                }}
                disabled={disableds[1]}
              ></MultipleSelectCheckmarks>
            </ListItem>
            <ListItem>
              <Input
                disabled={disableds[1]}
                onChange={(e) => {
                  console.log(e.target.value);
                  setSearchTerm(e.target.value);
                  console.log(searchTerm);
                }}
                placeholder="Search a place"
                inputProps={ariaLabel}
              />
            </ListItem>
          </List>
          <Box mr={5}>
            <Button
              className={classes.buttonSearch}
              endIcon={<SearchOutlinedIcon />}
              onClick={() => {
                history.push("/places");
              }}
            >
              Search
            </Button>
          </Box>
        </Paper>
      </Grid>
    </div>
  );
};
export default HomeForm;
