import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Box, Grid, Skeleton } from "@mui/material";
import { useGetPhotosQuery } from "./pexelsApiSlice";
import { Star } from "@mui/icons-material";

function srcset(image, width, height, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function Photos() {
  const { data, error, isLoading, isError } = useGetPhotosQuery();

  if (isLoading) {
    return (
      <Box
        sm={12}
        md={9}
        lg={6}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <ImageList gap={3}>
          {[...Array(20)].map(
            (_, index) => (
              console.log("index :>> ", index),
              (
                <ImageListItem key={index}>
                  <Skeleton
                    variant="rectangular"
                    sx={{ bgcolor: "grey.900" }}
                    width={250}
                    height={200}
                  />
                  <ImageListItemBar
                    title={<Skeleton />}
                    subtitle={<Skeleton />}
                    position="top"
                  />
                </ImageListItem>
              )
            )
          )}
        </ImageList>
      </Box>
    );
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} md={9} lg={6}>
        <ImageList
          sx={{
            //   Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
            transform: "translateZ(0)",
          }}
          gap={3}
        >
          {data.photos.map((item, index) => {
            //this is make the first image bigger than the 4 others
            const cols = index % 5 === 0 ? 2 : 1;
            const rows = index % 5 === 0 ? 2 : 1;

            console.log("cols,rows :>> ", cols, rows);
            return (
              <ImageListItem key={item.id} cols={cols} rows={rows}>
                <img
                  {...srcset(item.src.original, 250, 200, rows, cols)}
                  alt={item.alt}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={item.alt}
                  subtitle={<span>by: {item.photographer}</span>}
                  position="top"
                  actionIcon={
                    <IconButton
                      sx={{ color: "white" }}
                      aria-label={`star ${item.alt}`}
                    >
                      {item.liked ? <Star /> : <StarBorderIcon />}
                    </IconButton>
                  }
                  actionPosition="left"
                />
              </ImageListItem>
            );
          })}
        </ImageList>
      </Grid>
    </Grid>
  );
}
