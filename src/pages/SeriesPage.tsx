import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { RootState, AppDispatch } from "../store/store";
import {
  fetchPopularSeries,
  fetchTopRatedSeries,
  fetchOnTheAirSeries,
} from "../store/slices/series/seriesSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import "../style/seriesPage.scss";
import { useLoader } from "../context/LoaderContext";
import { useNavigate } from "react-router-dom";
import LazyImage from "../components/common/LazyImage";

const SeriesPage = () => {
  const { results: topRatedSeries } = useSelector(
    (state: RootState) => state.topRatedSeries
  );
  const { results: popularSeries } = useSelector(
    (state: RootState) => state.popularSeries
  );
  const { results: onTheAirSeries } = useSelector(
    (state: RootState) => state.onTheAirSeries
  );
  const { showLoader, hideLoader } = useLoader();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPages = async () => {
      showLoader();
      for (let i = 1; i <= 3; i++) {
        await dispatch(fetchTopRatedSeries(i));
        await dispatch(fetchPopularSeries(i));
        await dispatch(fetchOnTheAirSeries(i));
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
        slidesPerView={7}
        navigation
        autoplay={{ delay: 10000 }}
        loop={true}
      >
        {topRatedSeries.map((series) => (
          <SwiperSlide key={series.id}>
            <LazyImage
              onClick={() =>
                navigate(`/series/${series.id}`, {
                  state: { series },
                })
              }
              src={`https://image.tmdb.org/t/p/w154/${series.poster_path}`}
              alt={series.title}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Typography className="series-title" variant="h4">
        Popular Series
      </Typography>
      <Swiper
        modules={[Autoplay, Navigation]}
        slidesPerView={7}
        navigation
        autoplay={{ delay: 10000 }}
        loop={true}
      >
        {popularSeries.map((series) => (
          <SwiperSlide key={series.id}>
            <LazyImage
              onClick={() =>
                navigate(`/series/${series.id}`, {
                  state: { series },
                })
              }
              src={`https://image.tmdb.org/t/p/w154/${series.poster_path}`}
              alt={series.title}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Typography className="series-title" variant="h4">
        On The Air Series
      </Typography>
      <Swiper
        modules={[Autoplay, Navigation]}
        slidesPerView={7}
        navigation
        autoplay={{ delay: 10000 }}
        loop={true}
      >
        {onTheAirSeries.map((series) => (
          <SwiperSlide key={series.id}>
            <LazyImage
              onClick={() =>
                navigate(`/series/${series.id}`, {
                  state: { series },
                })
              }
              src={`https://image.tmdb.org/t/p/w154/${series.poster_path}`}
              alt={series.title}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default SeriesPage;
