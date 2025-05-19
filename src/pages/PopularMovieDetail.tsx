import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../store/store";
import { fetchMovieDetails } from "../store/slices/movieDetailsSlice";
import { useEffect } from "react";

const PopularMovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { results, loading } = useSelector(
    (state: RootState) => state.movieDetails
  );

  useEffect(() => {
    dispatch(fetchMovieDetails(Number(id)));
  }, [id]);

  const movie = results.find((movie) => movie.id === Number(id));

  return (
    <>
      <Typography variant="h3">{movie?.title}</Typography>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
        alt={movie?.title}
      />
    </>
  );
};

export default PopularMovieDetail;
