import { Box, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { useEffect } from "react";
import { fetchPopularMovies } from "../store/actions/popularMoviesActions";

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const popularMovies = useSelector((state: RootState) => state.popularMovies);

  useEffect(() => {
    dispatch(
      fetchPopularMovies({
        page: 1,
      })
    );
  }, []);

  console.log("Popular Movies State:", popularMovies);

  return (
    <Box sx={{ mt: 4, p: 2 }}>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
        {popularMovies.results.map((movie) => (
          <Box key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
            <Typography>{movie.title}</Typography>
            <Typography>{movie.overview}</Typography>
            {movie.video && (
              <Typography>Video: {movie.video ? "Evet" : "Hayır"}</Typography>
            )}
          </Box>
        ))}
      </Typography>
    </Box>
  );
}
