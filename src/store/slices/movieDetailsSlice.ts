import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as movieDetailsService from "../../services/movieDetailsService";
import { toast } from "react-toastify";

interface Movie {
  backdrop_path: string;
  genres: { id: number; name: string }[];
  id: number;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  loading: boolean;
  error: string | null;
  runtime: number;
  tagline: string;
}

interface MovieDetailsState {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
  loading: boolean;
  error: string | null;
  cast: { id: number; name: string; character: string; profile_path: string }[];
  video: string | null;
}

const initialState: MovieDetailsState = {
  page: 1,
  results: [],
  total_pages: 0,
  total_results: 0,
  loading: false,
  error: null,
  cast: [],
  video: null,
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
export const fetchCast = createAsyncThunk(
  "popularMovies/fetchCast",
  async (movieId: string, { rejectWithValue }) => {
    try {
      const response = await movieDetailsService.fetchCast(movieId);

      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Cast yüklenirken bir hata oluştu";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchVideo = createAsyncThunk(
  "movieDetails/fetchVideo",
  async (movieId: string, { rejectWithValue }) => {
    try {
      const response = await movieDetailsService.fetchVideo(movieId);
      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Video yüklenirken bir hata oluştu";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchSimilarMovies = createAsyncThunk(
  "movieDetails/fetchSimilarMovies",
  async (movieId: string, { rejectWithValue }) => {
    try {
      const response = await movieDetailsService.fetchSimilarMovies(movieId);
      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Benzer filmler yüklenirken bir hata oluştu";
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
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Bir hata oluştu";
      })
      .addCase(fetchCast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCast.fulfilled, (state, action) => {
        state.loading = false;
        state.cast = action.payload.cast;
      })
      .addCase(fetchCast.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Bir hata oluştu";
      })
      .addCase(fetchVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.video = action.payload;
      })
      .addCase(fetchVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Bir hata oluştu";
      })
      .addCase(fetchSimilarMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSimilarMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.results = [...state.results, ...action.payload];
      })
      .addCase(fetchSimilarMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Bir hata oluştu";
      });
  },
});

export default movieDetailsSlice.reducer;
