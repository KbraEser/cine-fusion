import {
  Box,
  Button,
  Card,
  Dialog,
  DialogContent,
  Divider,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import type { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { useLoader } from "../context/LoaderContext";
import { useEffect, useState } from "react";
import {
  fetchSeriesCast,
  fetchSeriesDetail,
  fetchSeriesVideo,
  fetchSimilarSeries,
} from "../store/slices/series/seriesDetailSlice";
import "../style/detailPages.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

const SeriesDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { showLoader, hideLoader } = useLoader();
  const { results, cast, video } = useSelector(
    (state: RootState) => state.seriesDetail
  );
  const series = results.find((series) => series.id === Number(id));
  const { language } = useSelector((state: RootState) => state.language);
  const [openTrailer, setOpenTrailer] = useState(false);
  const handleOpen = () => setOpenTrailer(true);
  const handleClose = () => setOpenTrailer(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          showLoader();
          await Promise.all([
            dispatch(fetchSeriesDetail(Number(id))),
            dispatch(fetchSeriesCast(id.toString())),
            dispatch(fetchSeriesVideo(id.toString())),
            dispatch(fetchSimilarSeries(id.toString())),
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
        backgroundImage: `url(https://image.tmdb.org/t/p/original${series?.backdrop_path})`,
      }}
    >
      <Box className="detail-container">
        <Box className="overlay">
          <Typography className="title">{series?.name}</Typography>
          <Typography className="tagline">{series?.tagline}</Typography>

          <Typography variant="body1">
            IMDb Rating: {series?.vote_average?.toFixed(1) ?? "N/A"} | Seasons:{" "}
            {series?.number_of_seasons} | Episodes: {series?.number_of_episodes}{" "}
          </Typography>
          <Divider className="divider" />
          <Typography variant="body1">
            {series?.genres.map((genre) => genre.name).join("-")} | Last Air
            Date: {series?.last_air_date}
          </Typography>
          <Divider className="divider" />
          <Typography variant="body1" className="overview">
            <Typography component="span" sx={{ fontWeight: "bold", mr: 1 }}>
              Overview:
            </Typography>
            {series?.overview ? (
              <>
                {series.overview.length > 135
                  ? series.overview.substring(0, 230) + "..."
                  : series.overview}
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
              backgroundImage: `url(https://image.tmdb.org/t/p/original${series?.poster_path})`,
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
          Similar Series
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
            .map((item) => (
              <SwiperSlide key={item.id}>
                <Box className="similar-section-card">
                  <img
                    className="similar-section-card-image"
                    src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                    alt={item.name}
                    style={{
                      width: "40%",
                      height: "30%",
                      objectFit: "cover",
                      borderRadius: "8px",
                      cursor: "pointer",
                      transition: "transform 0.3s ease",
                    }}
                    onClick={() => navigate(`/series/${item.id}`)}
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

export default SeriesDetailPage;
