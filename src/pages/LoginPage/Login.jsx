import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import classname from "./logic.css";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Redirect } from "react-router-dom";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameErrors, setUsernameErrors] = useState();
  const [passwordErrors, setPasswordErrors] = useState();
  const [button, setButton] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const paperStyle = {
    padding: 30,
    height: "50%",
    width: 500,
    margin: "20px auto",
    display: "block",
  };

  const handleUsername = (e) => {
    console.log(e);

    setUsernameErrors(true);
    setUsername(e);
    if (e.length < 5) {
      setButton(true);
      setUsernameErrors("Email lenght should be longer then 4 characters");
    }
    if (e.length > 5) {
      setUsernameErrors(false);
      if (passwordErrors === false) setButton(false);
    }
  };
  const handlePassword = (e) => {
    console.log(e);
    setPassword(e);
    setPasswordErrors(true);
    if (e.length < 8) {
      setButton(true);
      setPasswordErrors("Password lenght should be longer then 8 characters");
    }
    if (e.length > 8) {
      setPasswordErrors(false);
      if (usernameErrors === false) setButton(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { Email: username, Password: password };
    const response = await fetch(
      `${process.env.REACT_APP_ENDPOINT}/Auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      }
    );
    setRedirect(true);
    console.log(response);
  };
  const avatarStyle = { backgroundColor: "#3385ff" };
  const btnstyle = { margin: "12px 0" };

  if (redirect) {
    return <Redirect to="/reviews" />;
  }

  return (
    <div className="bg">
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            {/* <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar> */}
            <h2>Sign In</h2>
          </Grid>
          <TextField
            onChange={(e) => {
              handleUsername(e.target.value);
            }}
            label="Email"
            placeholder="Enter email"
            fullWidth
            required
            error={usernameErrors}
          />
          {usernameErrors ? (
            <Alert severity="error">{usernameErrors}</Alert>
          ) : (
            ""
          )}
          <TextField
            onChange={(e) => {
              handlePassword(e.target.value);
            }}
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            required
            error={passwordErrors}
          />
          {passwordErrors ? (
            <Alert severity="error">{passwordErrors}</Alert>
          ) : (
            ""
          )}
          <Button
            type="submit"
            color="primary"
            onClick={(e) => handleSubmit(e)}
            variant="contained"
            style={btnstyle}
            fullWidth
            disabled={button}
          >
            Sign in
          </Button>
          <Typography>
            <Link href="#">Forgot password ?</Link>
          </Typography>
          <Typography>
            Do you have an account ?<Link href="/register">Sign Up</Link>
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
};

export default Login;
