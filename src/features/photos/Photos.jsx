import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Box, Grid, Pagination, Skeleton } from "@mui/material";
import { useGetPhotosQuery } from "./pexelsApiSlice";
import FavouriteBtn from "../favourites/FavouriteBtn";
import { srcset } from "../../utils/srcset";
import { useState } from "react";

export default function Photos() {
  const [page, setPage] = useState(1);
  const { data, error, isLoading, isError } = useGetPhotosQuery(page);

  /**
 *   "total_results": 10000,
  "page": 1,
  "per_page": 1,
 */
  const totalResults = data?.total_results;
  const totalPages = Math.ceil(totalResults / data?.per_page);

  if (isLoading) {
    return (
      <Box
        sm={12}
        md={9}
        lg={6}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <ImageList gap={3}>
          {[...Array(20)].map((_, index) => {
            const cols = index % 5 === 0 ? 2 : 1;
            const rows = index % 5 === 0 ? 2 : 1;
            return (
              <ImageListItem key={index} cols={cols} rows={rows}>
                <Skeleton
                  variant="rectangular"
                  sx={{ bgcolor: "grey.900" }}
                  width={250 * cols}
                  height={200 * rows}
                />
                <ImageListItemBar
                  title={<Skeleton />}
                  subtitle={<Skeleton />}
                  position="top"
                />
              </ImageListItem>
            );
          })}
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
                  actionIcon={<FavouriteBtn item={item} />}
                  actionPosition="left"
                />
              </ImageListItem>
            );
          })}
        </ImageList>
        <Pagination
          count={totalPages}
          color="primary"
          onChange={(_, value) => setPage(value)}
          sx={{ display: "flex", justifyContent: "center", mt: 3 }}
        />
      </Grid>
    </Grid>
  );
}
