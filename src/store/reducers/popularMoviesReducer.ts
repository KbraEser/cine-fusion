import { createSlice } from "@reduxjs/toolkit";

interface Movie {}

interface PopularMoviesState {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
  loading: boolean;
  error: string | null;
}

const initialState: PopularMoviesState = {
  page: 1,
  results: [],
  total_pages: 0,
  total_results: 0,
  error: null,
  loading: false,
};

const popularMoviesSlice = createSlice({
  name: "popularMovies",
  initialState,
  reducers: {
    fetchPopularMoviesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
  },
});

const {} = popularMoviesSlice.actions;

export default popularMoviesSlice.reducer;
