import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { RootState, AppDispatch } from "../store/store";
import { fetchTopRatedSeries } from "../store/slices/series/seriesSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import "../style/seriesPage.scss";
import { useLoader } from "../context/LoaderContext";

const SeriesPage = () => {
  const { results: topRatedSeries } = useSelector(
    (state: RootState) => state.topRatedSeries
  );
  const { showLoader, hideLoader } = useLoader();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchPages = async () => {
      showLoader();
      for (let i = 1; i <= 7; i++) {
        await dispatch(fetchTopRatedSeries(i));
      }
      hideLoader();
    };
    fetchPages();
  }, [dispatch]);

  return (
    <Box className="series-container">
      <Typography className="series-title" variant="h4">
        Top Rated Series
      </Typography>
      <Swiper
        modules={[Autoplay, Navigation]}
        slidesPerView={9}
        navigation
        autoplay={{ delay: 10000 }}
        loop={true}
      >
        {topRatedSeries.map((series) => (
          <SwiperSlide key={series.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${series.poster_path}`}
              alt={series.title}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default SeriesPage;
