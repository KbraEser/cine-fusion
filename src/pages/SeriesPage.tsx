import { Box, Typography } from "@mui/material";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const SeriesPage = () => {
  return (
    <Box className="series-container">
      <Typography variant="h4">Series</Typography>
      <Swiper
        modules={[Autoplay, Navigation]}
        slidesPerView={6}
        navigation
        autoplay={{ delay: 13000 }}
        loop={true}
      >
        {}
      </Swiper>
    </Box>
  );
};

export default SeriesPage;
