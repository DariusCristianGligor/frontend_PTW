import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Container, Typography, Button } from "@mui/material";
import React, { Component, useState } from "react";
import { TextField } from "@mui/material";
import { withStyles } from "@material-ui/core/styles";
import httpServices from "../../services/httpServices";
import Alert from "@mui/material/Alert";
import Box from "@material-ui/core/Box";
import { useHistory } from "react-router-dom";
const styles = {
  root: {
    marginTop: 20,
    marginBottom: 20,
  },
};
const AddCAtegories = ({ classes }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    await httpServices.post(`${process.env.REACT_APP_ENDPOINT}/categories`, {
      name: title,
      description: description,
    });
    console.log(title, description);
    history.push("/categories");
  };
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleErrors, setTitleErrors] = useState("");
  const [descriptionErrors, setDescriptionErrors] = useState("");
  const [button, setButton] = useState(true);

  const handleChangeOnTitle = (t) => {
    setTitleErrors(false);
    console.log(t);
    setTitle(t);
    if (t.length < 5) {
      setButton(true);
      setTitleErrors("Title lenght should be longer then 4 characters");
    }
    if (t.length > 5) {
      setTitleErrors("");
      if (descriptionErrors === false) setButton(false);
    }
  };
  const history = useHistory();
  const handleChangeOnDescription = (t) => {
    setDescriptionErrors(false);
    console.log(t);
    setDescription(t);
    if (t.length < 5 || t.length > 80) {
      setButton(true);
      setDescriptionErrors(
        "Description lenght should be beetween ten and eighty characters"
      );
    } else {
      if (descriptionErrors === false) {
        setButton(false);
        setDescriptionErrors("");
      }
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
          Create a new Category
        </Typography>
      </Box>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Box m={2}>
          <TextField
            onChange={(e) => {
              handleChangeOnTitle(e.target.value);
            }}
            className={classes.root}
            label="Title"
            variant="outlined"
            color="primary"
            fullWidth
            required
            error={titleErrors ? true : false}
          ></TextField>
        </Box>
        {titleErrors ? <Alert severity="error">{titleErrors}</Alert> : ""}
        <Box m={2}>
          <TextField
            className={classes.field}
            onChange={(e) => {
              handleChangeOnDescription(e.target.value);
            }}
            label="Details"
            name="details"
            variant="outlined"
            className="buttonAdd"
            fullWidth
            required
            multiline
            rows={4}
            error={descriptionErrors ? true : false}
          ></TextField>
          {descriptionErrors ? (
            <Alert severity="error">{descriptionErrors}</Alert>
          ) : (
            ""
          )}
        </Box>

        <Box m={2}>
          <Button
            disabled={button}
            type="submit"
            color="primary"
            variant="contained"
            startIcon={<AddCircleOutlineOutlinedIcon />}
          >
            Add Category
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default withStyles(styles)(AddCAtegories);
