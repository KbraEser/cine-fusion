import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as seriesDetailService from "../../../services/seriesDetailService";
import { toast } from "react-toastify";

interface Series {
  backdrop_path: string;
  genres: { id: number; name: string }[];
  id: number;
  overview: string;
  poster_path: string;
  last_air_date: string;

  name: string;
  vote_average: number;
  loading: boolean;
  error: string | null;
  runtime: number;
  tagline: string;
  number_of_seasons: number;
  number_of_episodes: number;
}

interface SeriesDetailState {
  page: number;
  results: Series[];
  total_pages: number;
  total_results: number;
  loading: boolean;
  error: string | null;
  cast: { id: number; name: string; character: string; profile_path: string }[];
  video: string | null;
}

const initialState: SeriesDetailState = {
  page: 1,
  results: [],
  total_pages: 0,
  total_results: 0,
  loading: false,
  error: null,
  cast: [],
  video: null,
};

export const fetchSeriesDetail = createAsyncThunk(
  "series/fetchSeriesDetail",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await seriesDetailService.fetchSeriesDetail(id);
      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Seri detayları yüklenirken bir hata oluştu";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchSeriesCast = createAsyncThunk(
  "series/fetchSeriesCast",
  async (seriesId: string, { rejectWithValue }) => {
    try {
      const response = await seriesDetailService.fetchSeriesCast(seriesId);
      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Dizi castı yüklenirken bir hata oluştu";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchSeriesVideo = createAsyncThunk(
  "series/fetchSeriesVideo",
  async (seriesId: string, { rejectWithValue }) => {
    try {
      const response = await seriesDetailService.fetchSeriesVideo(seriesId);
      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Dizi videoları yüklenirken bir hata oluştu";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const seriesDetailSlice = createSlice({
  name: "seriesDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeriesDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSeriesDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.results = [action.payload];
      })
      .addCase(fetchSeriesDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Bir hata oluştu";
      })
      .addCase(fetchSeriesCast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSeriesCast.fulfilled, (state, action) => {
        state.loading = false;
        state.cast = action.payload.cast;
      })
      .addCase(fetchSeriesCast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Bir hata oluştu";
      })
      .addCase(fetchSeriesVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSeriesVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.video = action.payload.results[0].key;
      })
      .addCase(fetchSeriesVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Bir hata oluştu";
      });
  },
});

export default seriesDetailSlice.reducer;
