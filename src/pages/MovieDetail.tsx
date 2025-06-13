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
import { useParams, useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../store/store";
import {
  fetchCast,
  fetchMovieDetails,
  fetchVideo,
  fetchSimilarMovies,
} from "../store/slices/movieDetailsSlice";
import { useEffect, useState } from "react";
import "../style/detailPages.scss";
import { useLoader } from "../context/LoaderContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { showLoader, hideLoader } = useLoader();
  const { results, cast, video } = useSelector(
    (state: RootState) => state.movieDetails
  );
  const { language } = useSelector((state: RootState) => state.language);
  const movie = results.find((movie) => movie.id === Number(id));
  const navigate = useNavigate();

  const [openTrailer, setOpenTrailer] = useState(false);
  const handleOpen = () => setOpenTrailer(true);
  const handleClose = () => setOpenTrailer(false);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          showLoader();
          await Promise.all([
            dispatch(fetchMovieDetails(Number(id))),
            dispatch(fetchCast(id.toString())),
            dispatch(fetchVideo(id.toString())),
            dispatch(fetchSimilarMovies(id.toString())),
          ]);
        } finally {
          hideLoader();
        }
      }
    };
    fetchData();
  }, [id, language, dispatch]);

  return (
    <Box
      className="background"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
      }}
    >
      <Box className="detail-container">
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
                {movie.overview.length > 135
                  ? movie.overview.substring(0, 210) + "..."
                  : movie.overview}
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
                        ? `https://image.tmdb.org/t/p/w92${actor.profile_path}`
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
                    paddingTop: "56.25%",
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
      <Box className="similar-section">
        <Typography
          variant="h6"
          sx={{ mb: 2, color: "#ff4a4a", fontWeight: "bold" }}
        >
          Similar Movies
        </Typography>
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={4}
          slidesPerView={5}
          navigation
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 5,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 8,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 8,
            },
            1024: {
              slidesPerView: 8,
              spaceBetween: 5,
            },
          }}
        >
          {results
            .filter((item) => item.id !== Number(id))
            .map((movie) => (
              <SwiperSlide key={movie.id}>
                <Box className="similar-section-card">
                  <img
                    className="similar-section-card-image"
                    src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                    alt={movie.title}
                    style={{
                      width: "40%",
                      height: "30%",
                      objectFit: "cover",
                      borderRadius: "8px",
                      cursor: "pointer",
                      transition: "transform 0.3s ease",
                    }}
                    onClick={() => navigate(`/movie-detail/${movie.id}`)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  />
                </Box>
              </SwiperSlide>
            ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default MovieDetail;
