import {
  Box,
  Typography,
  Divider,
  Card,
  CardActions,
  Button,
  CardContent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../store/store";
import {
  fetchCast,
  fetchMovieDetails,
  fetchVideo,
} from "../store/slices/movieDetailsSlice";
import { useEffect } from "react";
import "../style/popularMoviesDetail.scss";

const PopularMovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { results, cast, video } = useSelector(
    (state: RootState) => state.movieDetails
  );
  const { language } = useSelector((state: RootState) => state.language);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetails(Number(id)));
      dispatch(fetchCast(id.toString()));
      dispatch(fetchVideo(id.toString()));
    }
  }, [id, language, dispatch]);

  const movie = results.find((movie) => movie.id === Number(id));

  return (
    <Box
      className="background"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
      }}
    >
      <Box className="movie-detail-container">
        <Box className="overlay">
          <Typography className="title">{movie?.title}</Typography>
          <Typography className="tagline">{movie?.tagline}</Typography>

          <Typography variant="body1">
            IMDb Rating: {movie?.vote_average?.toFixed(1) ?? "N/A"}+ | Duration:{" "}
            {movie?.runtime
              ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
              : "N/A"}
          </Typography>
          <Divider className="divider" />
          <Typography variant="body1">
            {movie?.genres.map((genre) => genre.name).join(" - ")} | Release
            Date: {movie?.release_date}
          </Typography>
          <Divider className="divider" />

          <Typography variant="body1" className="overview">
            <Typography component="span" sx={{ fontWeight: "bold", mr: 1 }}>
              Overview:
            </Typography>
            {movie?.overview ? (
              <>
                {movie.overview.split(".").slice(0, 2).join(".")}
                {"."}
              </>
            ) : null}
          </Typography>

          <Typography component="span" sx={{ fontWeight: "bold", mr: 1 }}>
            Cast:
          </Typography>
          <Box className="cast-section-grid">
            {cast.length > 0 &&
              cast.slice(0, 6).map((actor) => (
                <Box key={actor.id} className="cast-section-card">
                  <img
                    className="cast-section-card-image"
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                        : "/assets/img/avatar.png"
                    }
                    alt={actor.name}
                  />
                  <Typography className="cast-section-card-name">
                    {actor.character}
                  </Typography>
                </Box>
              ))}
          </Box>
        </Box>
        <Box className="video-section">
          <Card
            className="video-section-card"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.poster_path})`,
            }}
          >
            <CardContent></CardContent>
            <CardActions>
              <Button
                className="video-section-card-button"
                size="small"
                variant="contained"
                color="success"
                onClick={() => {
                  window.open(
                    `https://www.youtube.com/watch?v=${video}`,
                    "_blank"
                  );
                }}
              >
                Watch Trailer
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default PopularMovieDetail;
