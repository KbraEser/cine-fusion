import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as popularMoviesService from "../../services/popularMoviesService";
import { toast } from "react-toastify";
import type { GetCategoryWithFilterDTO } from "../../services/popularMoviesService";

interface Movie {
  genres: { id: number; name: string }[];
  id: number;
  poster_path: string;
  title: string;
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
  loading: false,
  error: null,
};

export const fetchPopularMovies = createAsyncThunk(
  "popularMovies/fetchPopularMovies",
  async (params: GetCategoryWithFilterDTO, { rejectWithValue }) => {
    try {
      const response = await popularMoviesService.fetchPopularMovies(params);
      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Popüler filmler yüklenirken bir hata oluştu";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const popularMoviesSlice = createSlice({
  name: "popularMovies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        const existingIds = new Set(
          state.results.map((movie: Movie) => movie.id)
        );
        const newMovies = action.payload.results.filter(
          (movie: Movie) => !existingIds.has(movie.id)
        );
        state.results = [...state.results, ...newMovies];
        state.total_pages = action.payload.total_pages;
        state.total_results = action.payload.total_results;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Bir hata oluştu";
      });
  },
});

export default popularMoviesSlice.reducer;
