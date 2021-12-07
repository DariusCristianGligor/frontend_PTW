import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Rating } from "@mui/material";
import QuiltedImageList from "./imageList";
import httpServices from "../services/httpServices";
import { Box } from "@mui/system";
export default function ActionAreaCard({ width, height, object }) {
  const [urlPhotos, setUrlPhotos] = React.useState([]);
  React.useEffect(async () => {
    const { data: urlPhotos } = await httpServices.get(
      `${process.env.REACT_APP_ENDPOINT}/WrapperStringPathReview/${object.id}`
    );
    setUrlPhotos(urlPhotos);
    console.log(urlPhotos);
  }, []);

  return (
    <Card sx={{ width: 700, height: { height } }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            UserName
          </Typography>
          <Box m={1}>
            <Rating name="read-only" value={object.stars} readOnly />
          </Box>
          <Box m={1}>
            <Typography variant="body2">
              Description: {object.description}
            </Typography>
          </Box>
          <QuiltedImageList
            height={262}
            width={"100%"}
            itemData={urlPhotos}
          ></QuiltedImageList>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
