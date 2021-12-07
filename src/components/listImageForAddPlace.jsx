import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { v4 as uuidv4 } from "uuid";
export default function WovenImageList({ width, height, itemData }) {
  return (
    <ImageList
      sx={{ width: { width }, height: { height } }}
      variant="woven"
      cols={3}
      gap={8}
    >
      {itemData.map((item) => (
        <ImageListItem key={uuidv4()}>
          <img
            src={item}
            srcSet={`${item}?w=161&fit=crop&auto=format&dpr=2 2x`}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
