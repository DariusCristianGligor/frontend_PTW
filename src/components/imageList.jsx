import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { v4 as uuidv4 } from "uuid";
function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}
export default function QuiltedImageList({ height, width, itemData }) {
  return (
    <ImageList
      sx={{ width: width, height: height }}
      variant="quilted"
      cols={4}
      rowHeight={121}
    >
      {itemData.map((item) => (
        <ImageListItem
          key={uuidv4()}
          cols={item.cols || 2}
          rows={item.rows || 2}
        >
          <img src={`data:image/*;base64,${item}`} />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
