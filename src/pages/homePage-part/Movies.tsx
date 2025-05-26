import { Box, Typography } from "@mui/material";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

const Movies = () => {
  const { favoriteComedyMovies } = useSelector(
    (state: RootState) => state.favoriteComedyMovies
  );
  return (
    <Box className="movies-container">
      <Box sx={{ my: 4, px: 2 }}>
        <Typography variant="h4">Favorite Comedy Movies</Typography>
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={10}
          slidesPerView={6}
          navigation
          autoplay={{ delay: 2500 }}
          loop={true}
          breakpoints={{
            320: {
              slidesPerView: 2,
            },
            480: {
              slidesPerView: 3,
            },
            640: {
              slidesPerView: 4,
            },
            960: {
              slidesPerView: 5,
            },
            1280: {
              slidesPerView: 6,
            },
          }}
        >
          {favoriteComedyMovies.map}
          <SwiperSlide></SwiperSlide>
        </Swiper>
      </Box>
    </Box>
  );
};

export default Movies;
