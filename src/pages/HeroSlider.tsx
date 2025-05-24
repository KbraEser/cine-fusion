import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { fetchPopularMovies } from "../store/slices/popularMoviesSlice";
import { useEffect } from "react";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "../style/swiper.scss";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectCoverflow } from "swiper/modules";

const HeroSlider = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const popularMovies = useSelector((state: RootState) => state.popularMovies);

  useEffect(() => {
    const fetchPages = async () => {
      for (let i = 1; i <= 5; i++) {
        await dispatch(fetchPopularMovies({ page: i }));
      }
    };
    fetchPages();
  }, [dispatch]);

  return (
    <Box className="slider-wrapper">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 2.5,
          slideShadows: true,
        }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="swiper-coverflow"
      >
        {popularMovies.results
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <SwiperSlide key={movie.id}>
              <img
                onClick={() => {
                  navigate(`/popular-movie-detail/${movie.id}`, {
                    state: { movie },
                  });
                }}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
};

export default HeroSlider;
