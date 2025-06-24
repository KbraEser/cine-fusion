import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { fetchPopularMovies } from "../../store/slices/homePage-slice/popularMoviesSlice";
import { useEffect } from "react";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../style/swiper.scss";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../../context/LoaderContext";
import LazyImage from "../../components/common/LazyImage";

import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectCoverflow } from "swiper/modules";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface PopularMovies {
  results: Movie[];
}

const HeroSlider = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { showLoader, hideLoader } = useLoader();
  const popularMovies = useSelector(
    (state: RootState) => state.popularMovies
  ) as PopularMovies;

  useEffect(() => {
    const fetchPages = async () => {
      try {
        showLoader();
        for (let i = 1; i <= 5; i++) {
          await dispatch(fetchPopularMovies({ page: i }));
        }
      } finally {
        hideLoader();
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
              <LazyImage
                onClick={() => {
                  navigate(`/movie-detail/${movie.id}`, {
                    state: { movie },
                  });
                }}
                src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                alt={movie.title}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
};

export default HeroSlider;
