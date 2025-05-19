import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as movieDetailsService from "../../services/movieDetailsService";
import { toast } from "react-toastify";

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
  loading: boolean;
  error: string | null;
}

interface MovieDetailsState {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
  loading: boolean;
  error: string | null;
}

const initialState: MovieDetailsState = {
  page: 1,
  results: [],
  total_pages: 0,
  total_results: 0,
  loading: false,
  error: null,
};

export const fetchMovieDetails = createAsyncThunk(
  "movieDetails/fetchMovieDetails",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await movieDetailsService.fetchMovieDetails(id);
      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Film detayları yüklenirken bir hata oluştu";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const movieDetailsSlice = createSlice({
  name: "movieDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.results = [action.payload];
        state.total_pages = action.payload.total_pages;
        state.total_results = action.payload.total_results;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Bir hata oluştu";
      });
  },
});

export default movieDetailsSlice.reducer;
