import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import QuiltedImageList from "./imageList";
import httpServices from "../services/httpServices";
import Button from "@mui/material/Button";

export default function RecipeReviewCard({ setPlaceId, object }) {
  const [expanded, setExpanded] = React.useState(false);
  const [value, setValue] = React.useState(2);
  const [urlPhotos, setUrlPhotos] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [urls, setUrls] = React.useState();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  React.useEffect(async () => {
    const placeId = object.id;
    console.log(placeId);
    const { data: categories } = await httpServices.get(
      `${process.env.REACT_APP_ENDPOINT}/categories/aplace/${placeId}`
    );
    console.log("categoriessssssssssssssssss:", categories);
    setCategories(categories);
    const { data: urlPhotos } = await httpServices.get(
      `${process.env.REACT_APP_ENDPOINT}/wrapperplaces/${placeId}`
    );
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    urlPhotos.forEach((element) => {
      var ex2 = new Blob([element], { type: "image/*" });
      console.log("ex2", typeof element);
      console.log(URL.createObjectURL(ex2));
      setUrls(ex2);
    });

    setUrlPhotos(urlPhotos);
    console.log(urlPhotos);
  }, []);
  const history = useHistory();
  return (
    <Card sx={{ maxWidth: 340 }}>
      <CardHeader
        action={
          <IconButton
            aria-label="add"
            onClick={() => {
              setPlaceId(object.id);
              history.push("addreview");
            }}
          >
            <AddIcon />
          </IconButton>
        }
        title={object.name}
        subheader={categories.reduce((acc, curentValue) => {
          if (acc === "") return `${curentValue.name}`;
          else return `${acc}, ${curentValue.name}`;
        }, "")}
      />
      <QuiltedImageList
        height={300}
        width={"100%"}
        itemData={urlPhotos}
      ></QuiltedImageList>
      {/* <img src={`data:image/*;base64,${urlPhotos[2]}`} /> */}
      <CardContent>
        <Box m={1}>
          <Rating name="read-only" value={object.rating} readOnly />
        </Box>
        <Box ml={22}>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              setPlaceId(object.id);
              history.push("/viewreviews");
            }}
          >
            Show more
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
