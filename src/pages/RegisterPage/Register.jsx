import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import httpServices from "../../services/httpServices";
import Alert from "@mui/material/Alert";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Redirect } from "react-router-dom";
const Register = () => {
  const history = useHistory();
  const paperStyle = { padding: "30px 20px", width: 500, margin: "20px auto" };
  const headerStyle = { margin: 0 };
  const marginTop = { marginTop: 5 };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [usernameErrors, setUsernameErrors] = useState();
  const [passwordErrors, setPasswordErrors] = useState();
  const [emailErrors, setEmailErrors] = useState();
  const [phoneErrors, setPhoneErrors] = useState();
  const [terms, setTerms] = useState();
  const [confirmPasswordErrors, setConfirmPasswordErrors] = useState();
  const [type, setType] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const handleUsername = (e) => {
    console.log(e);
    setUsernameErrors(true);
    setUsername(e);
    if (e.length <= 4) {
      setUsernameErrors("Username lenght should be longer then 4 characters.");
    }
    if (e.length > 4) {
      setUsernameErrors(false);
      if (passwordErrors === false);
    }
  };
  const handlePhoneNumber = (e) => {
    console.log(e);
    setPhoneErrors(true);
    setPhone(e);
    if (/^\d*(\.\d+)?$/.test(phone)) {
      setPhoneErrors(false);
      if (passwordErrors === false);
    } else {
      setPhoneErrors("Invalid phone number.");
    }
  };
  const handleEmail = (e) => {
    console.log(e);
    setEmailErrors(true);
    setEmail(e);
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e)) {
      setEmailErrors(false);
      if (passwordErrors === false);
    } else {
      setEmailErrors("Email invalid");
    }
  };
  const handlePassword = (e) => {
    console.log(e);
    setPassword(e);
    setPasswordErrors(true);

    if (e.length <= 8) {
      setPasswordErrors("Password lenght should be longer then 8 characters.");
    } else {
      setPasswordErrors(false);
      if (e != confirmPassword) {
        setConfirmPasswordErrors(
          "Password lenght should be longer then 8 characters and identical with password"
        );
      } else {
        setConfirmPasswordErrors(false);
      }
    }
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e);
    setConfirmPasswordErrors(true);
    if (e != password) {
      setConfirmPasswordErrors(
        "Password lenght should be longer then 8 characters and identical with password"
      );
    } else {
      setConfirmPasswordErrors(false);
    }
  };

  const userReg = async (e) => {
    e.preventDefault();
    const response = await httpServices.post(
      `${process.env.REACT_APP_ENDPOINT}/Auth/register`,
      {
        Name: username,
        Mail: email,
        Password: password,
        PhoneNumber: phone,
      }
    );
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="bg">
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            {/* <Avatar color="primary">
            <AddCircleOutlineOutlinedIcon />
          </Avatar> */}
            <h2 style={headerStyle}>Sign Up</h2>
          </Grid>
          <form>
            <TextField
              onChange={(e) => {
                handleUsername(e.target.value);
              }}
              fullWidth
              label="Name"
              placeholder="Enter your name"
              error={usernameErrors ? true : false}
            />
            {usernameErrors ? (
              <Alert severity="error">{usernameErrors}</Alert>
            ) : (
              ""
            )}
            <TextField
              fullWidth
              label="Email"
              placeholder="Enter your email"
              onChange={(e) => {
                handleEmail(e.target.value);
              }}
              error={emailErrors ? true : false}
            />
            {emailErrors ? <Alert severity="error">{emailErrors}</Alert> : ""}
            <FormControl component="fieldset" style={marginTop}>
              <FormLabel component="legend">Account type </FormLabel>
              <RadioGroup
                aria-label="Account type"
                name="Account type"
                style={{ display: "initial" }}
              >
                <FormControlLabel
                  value="admin"
                  control={<Radio />}
                  label="Admin"
                  onClick={() => {
                    setType("Admin");
                  }}
                />
                <FormControlLabel
                  value="user"
                  control={<Radio />}
                  label="User"
                  onClick={() => {
                    setType("User");
                  }}
                />
              </RadioGroup>
            </FormControl>
            {type === true ? (
              <Alert severity="error">{"You must choose a type"}</Alert>
            ) : (
              ""
            )}
            <TextField
              fullWidth
              label="Phone Number"
              placeholder="Enter your phone number"
              onChange={(e) => {
                handlePhoneNumber(e.target.value);
              }}
              error={phoneErrors ? true : false}
            />
            {phoneErrors ? <Alert severity="error">{phoneErrors}</Alert> : ""}
            <TextField
              fullWidth
              type="password"
              label="Password"
              placeholder="Enter your password"
              onChange={(e) => {
                handlePassword(e.target.value);
              }}
              error={passwordErrors ? true : false}
            />
            {passwordErrors ? (
              <Alert severity="error">{passwordErrors}</Alert>
            ) : (
              ""
            )}
            <TextField
              fullWidth
              type="password"
              label="Confirm Password"
              placeholder="Confirm your password"
              onChange={(e) => {
                handleConfirmPassword(e.target.value);
              }}
              error={confirmPasswordErrors ? true : false}
            />
            {confirmPasswordErrors ? (
              <Alert severity="error">{confirmPasswordErrors}</Alert>
            ) : (
              ""
            )}
            <FormControlLabel
              control={<Checkbox name="checkedA" />}
              label="I accept the terms and conditions."
              onClick={() => {
                setTerms(!terms);
              }}
            />
            {!terms ? (
              <Alert severity="error">
                {"You must accept the terms and conditons. "}
              </Alert>
            ) : (
              ""
            )}
          </form>
          <Button
            type="submit"
            onClick={(e) => {
              userReg(e);
            }}
            variant="contained"
            color="primary"
            disabled={
              usernameErrors != true &&
              passwordErrors != true &&
              emailErrors != true &&
              terms != true &&
              confirmPassword != true
            }
          >
            Sign up
          </Button>
        </Paper>
      </Grid>
    </div>
  );
};

export default Register;
