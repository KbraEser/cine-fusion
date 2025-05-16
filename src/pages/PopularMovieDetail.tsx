import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const PopularMovieDetail = () => {
  const location = useLocation();
  const { movie } = location.state;

  return (
    <>
      <Typography variant="h3">{movie.title}</Typography>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
    </>
  );
};

export default PopularMovieDetail;
