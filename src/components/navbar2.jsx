import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import { makeStyles } from "@mui/styles";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useHistory } from "react-router-dom";
import CategoryIcon from "@mui/icons-material/Category";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState("Home");
  const useStyles = makeStyles({
    navBar: {
      background: "linear-gradient(45deg,#D3D3D3,#D3D3D3)",
    },
  });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const history = useHistory();
  const classes = useStyles();
  return (
    <BottomNavigation
      color={"primary"}
      className={classes.navBar}
      sx={{ width: "100%" }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        label="Home"
        value="Home"
        icon={<HomeIcon />}
        onClick={() => history.push("/home")}
      />
      <BottomNavigationAction
        label="Places"
        value="place"
        icon={<AddPhotoAlternateIcon />}
        onClick={() => history.push("/places")}
      />
      <BottomNavigationAction
        label="Review"
        value="review"
        icon={<LocationOnIcon />}
        onClick={() => history.push("/reviews")}
      />
      <BottomNavigationAction
        label="Category"
        value="Category"
        icon={<CategoryIcon />}
        onClick={() => history.push("/categories")}
      />
      <BottomNavigationAction
        label="Login"
        value="login"
        icon={<LoginIcon />}
        onClick={() => history.push("/login")}
      />
      <BottomNavigationAction
        label="Register"
        value="register"
        icon={<AppRegistrationIcon />}
        onClick={() => history.push("/register")}
      />
    </BottomNavigation>
  );
}
