import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import {
  fetchFavoriteActionMovies,
  fetchFavoriteComedyMovies,
} from "../../store/slices/homePage-slice/favoriteMoviesSlice";
import { useLoader } from "../../context/LoaderContext";

import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "../../style/movies.scss";
import { useNavigate } from "react-router-dom";
import LazyImage from "../../components/common/LazyImage";

const Movies = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { showLoader, hideLoader } = useLoader();

  const { results, loading } = useSelector(
    (state: RootState) => state.favoriteComedyMovies
  );

  const { results: actionResults } = useSelector(
    (state: RootState) => state.favoriteActionMovies
  );

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPages = async () => {
      try {
        showLoader();
        for (let i = 1; i <= 3; i++) {
          await dispatch(fetchFavoriteComedyMovies(i));
          await dispatch(fetchFavoriteActionMovies(i));
        }
      } finally {
        hideLoader();
      }
    };
    fetchPages();
  }, [dispatch]);

  if (loading && results.length === 0) {
    return (
      <Box
        className="movies-container"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "200px",
        }}
      ></Box>
    );
  }

  return (
    <Box className="movies-container">
      <Typography className="movie-comedy-title" variant="h6">
        Popular Comedy Movies
      </Typography>

      <Swiper
        modules={[Autoplay, Navigation]}
        slidesPerView={6}
        navigation
        autoplay={{ delay: 13000 }}
        loop={true}
      >
        {results.map((movie) => (
          <SwiperSlide key={movie.id}>
            <LazyImage
              onClick={() =>
                navigate(`/movie-detail/${movie.id}`, {
                  state: { movie },
                })
              }
              className="movie-comedy-image"
              src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
              alt={movie.title}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Typography className="movie-comedy-title" variant="h6">
        Popular Action Movies
      </Typography>

      <Swiper
        modules={[Autoplay, Navigation]}
        slidesPerView={6}
        navigation
        autoplay={{ delay: 13000 }}
        loop={true}
      >
        {actionResults.map((movies) => (
          <SwiperSlide key={movies.id}>
            <LazyImage
              onClick={() =>
                navigate(`/movie-detail/${movies.id}`, {
                  state: { movies },
                })
              }
              className="movie-comedy-image"
              src={`https://image.tmdb.org/t/p/w342/${movies.poster_path}`}
              alt={movies.title}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Movies;
