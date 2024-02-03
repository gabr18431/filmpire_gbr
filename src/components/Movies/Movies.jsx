import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useGetMoviesQuery } from "../../services/TMDB";
import { FeaturedMovie, MovieList, Pagination } from "..";

const Movies = () => {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const { data, error, isFetching } = useGetMoviesQuery({
    genreIdOrCategoryName, page, searchQuery
  });
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }
  if (!data?.results.length) {
    return (
      <Box display="flex" justifyContent="center" mt="20px">
        <Typography variant="h4">
          No Movies that match that name .
          <br />
          Please search for something else .
        </Typography>
      </Box>
    );
  }
  if (error) return "An error has occured .";
  return (
    <div>
      <FeaturedMovie movie={data.results[0]} />
      <MovieList movies={data} excludeFirst endFrom={20} />
      <Pagination currentPage={page} setPage={setPage} totalPages={data?.total_pages} />
    </div>
  );
};
export default Movies;
