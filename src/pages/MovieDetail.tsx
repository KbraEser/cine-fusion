import {
  Box,
  Typography,
  Divider,
  Card,
  Button,
  Dialog,
  DialogContent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../store/store";
import {
  fetchCast,
  fetchMovieDetails,
  fetchVideo,
} from "../store/slices/movieDetailsSlice";
import { useEffect, useState } from "react";
import "../style/popularMoviesDetail.scss";
import { useLoader } from "../context/LoaderContext";

const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { showLoader, hideLoader } = useLoader();
  const { results, cast, video } = useSelector(
    (state: RootState) => state.movieDetails
  );
  const { language } = useSelector((state: RootState) => state.language);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          showLoader();
          await Promise.all([
            dispatch(fetchMovieDetails(Number(id))),
            dispatch(fetchCast(id.toString())),
            dispatch(fetchVideo(id.toString())),
          ]);
        } finally {
          hideLoader();
        }
      }
    };
    fetchData();
  }, [id, language, dispatch]);

  const movie = results.find((movie) => movie.id === Number(id));

  const [openTrailer, setOpenTrailer] = useState(false);
  const handleOpen = () => setOpenTrailer(true);
  const handleClose = () => setOpenTrailer(false);

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
            <Dialog
              open={openTrailer}
              onClose={handleClose}
              maxWidth="md"
              fullWidth
              sx={{
                p: 0,
              }}
            >
              <DialogContent
                sx={{
                  padding: 0,
                  "&:first-of-type": {
                    paddingTop: 0,
                  },
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    paddingTop: "56.25%", // 16:9 aspect ratio
                    width: "100%",
                  }}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${video}`}
                    style={{
                      border: "none",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </Box>
              </DialogContent>
            </Dialog>
            <Button className="video-section-card-button" onClick={handleOpen}>
              Watch Trailer
            </Button>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default MovieDetail;
