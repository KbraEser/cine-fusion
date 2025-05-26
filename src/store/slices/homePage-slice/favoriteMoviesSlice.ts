import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { GetFavoriteMoviesDTO } from "../../../services/favoriteMoviesService";
import * as favoriteMoviesService from "../../../services/favoriteMoviesService";
import { toast } from "react-toastify";
import MovieDetail from "../../../pages/MovieDetail";

interface Genre {
  id: number;
  name: string;
}

interface FavoriteMovie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  genres: Genre[];
  with_genres: number;
}

const initialState = {
  page: 1,
  results: [] as FavoriteMovie[],
  total_pages: 0,
  total_results: 0,
  loading: false,
  error: null as string | null,
};

const fetchFavoriteComedyMovies = createAsyncThunk(
  "favoriteMovies/fetchFavoriteComedyMovies",
  async (params: GetFavoriteMoviesDTO, { rejectWithValue }) => {
    try {
      const response = await favoriteMoviesService.fetchFavoriteComedyMovies(
        params
      );
      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Favori filmler yüklenirken bir hata oluştu";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const favoriteMoviesSlice = createSlice({
  name: "favoriteMovies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoriteComedyMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavoriteComedyMovies.fulfilled, (state, action) => {
        state.loading = false;
        const comediesIds = new Set(
          state.results.map((movie: FavoriteMovie) => movie.id)
        );
        const newComedies = action.payload.results.filter(
          (movie: FavoriteMovie) => !comediesIds.has(movie.id)
        );
        state.results = [...state.results, ...newComedies];
        state.total_pages = action.payload.total_pages;
        state.total_results = action.payload.total_results;
      })
      .addCase(fetchFavoriteComedyMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Bir hata oluştu";
      });
  },
});

export default favoriteMoviesSlice.reducer;
