import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { fetchFavoriteComedyMovies } from "../../store/slices/homePage-slice/favoriteMoviesSlice";
import { useParams } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "../../style/movies.scss";
const Movies = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const { results, loading } = useSelector(
    (state: RootState) => state.favoriteComedyMovies
  );

  useEffect(() => {
    const fetchPages = async () => {
      for (let i = 1; i <= 7; i++) {
        await dispatch(fetchFavoriteComedyMovies({ page: i }));
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
      >
        <Typography>Filmler yükleniyor...</Typography>
      </Box>
    );
  }

  return (
    <Box className="movies-container">
      <Swiper
        modules={[Navigation]}
        slidesPerView={6}
        navigation
        autoplay={{ delay: 13000 }}
        loop={true}
        breakpoints={{
          320: {
            slidesPerView: 3,
          },
          480: {
            slidesPerView: 4,
          },
          640: {
            slidesPerView: 5,
          },
          960: {
            slidesPerView: 6,
          },
          1280: {
            slidesPerView: 7,
          },
        }}
      >
        {results.map((movie) => (
          <SwiperSlide key={movie.id}>
            <img
              className="movie-comedy-image"
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Movies;
