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
import { useParams } from "react-router-dom";
import type { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { useLoader } from "../context/LoaderContext";
import { useEffect, useState } from "react";
import {
  fetchSeriesCast,
  fetchSeriesDetail,
  fetchSeriesVideo,
} from "../store/slices/series/seriesDetailSlice";
import "../style/detailPages.scss";

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

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          showLoader();
          await Promise.all([
            dispatch(fetchSeriesDetail(Number(id))),
            dispatch(fetchSeriesCast(id.toString())),
            dispatch(fetchSeriesVideo(id.toString())),
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
                {series.overview.split(".").slice(0, 2).join(".")}
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
    </Box>
  );
};

export default SeriesDetailPage;
