import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../store/store";
import { fetchMovieDetails } from "../store/slices/movieDetailsSlice";
import { useEffect } from "react";
import "../style/popularMoviesDetail.scss";

const PopularMovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { results } = useSelector((state: RootState) => state.movieDetails);

  useEffect(() => {
    dispatch(fetchMovieDetails(Number(id)));
  }, [id]);

  const movie = results.find((movie) => movie.id === Number(id));

  return (
    <Box className="movie-detail-container">
      <Box
        className="background"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.poster_path})`,
        }}
      >
        <Box className="overlay">
          <Typography variant="h3" className="title">
            {movie?.title}
          </Typography>
          <Typography variant="body1" className="overview">
            {movie?.overview}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PopularMovieDetail;
