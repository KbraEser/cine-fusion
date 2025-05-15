import { createSlice } from "@reduxjs/toolkit";

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

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
    fetchPopularMoviesSuccess: (state, action) => {
      state.loading = false;
      state.results = [...state.results, ...action.payload.results];
      state.total_pages = action.payload.total_pages;
      state.total_results = action.payload.total_results;
    },
    fetchPopularMoviesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPopularMoviesRequest,
  fetchPopularMoviesSuccess,
  fetchPopularMoviesFailure,
} = popularMoviesSlice.actions;

export default popularMoviesSlice.reducer;
