import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import * as seriesService from "../../../services/seriesService";
import type { GetCategoryWithFilterDTO } from "../../../services/seriesService";

interface SeriesPage {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  with_genres: number;
}

const topRatedSeriesInitialState = {
  page: 1,
  results: [] as SeriesPage[],
  total_pages: 0,
  total_results: 0,
  loading: false,
  error: null as string | null,
};

const popularSeriesInitialState = {
  page: 1,
  results: [] as SeriesPage[],
  total_pages: 0,
  total_results: 0,
  loading: false,
  error: null as string | null,
};

const onTheAirSeriesInitialState = {
  page: 1,
  results: [] as SeriesPage[],
  total_pages: 0,
  total_results: 0,
  loading: false,
  error: null as string | null,
};

export const fetchTopRatedSeries = createAsyncThunk(
  "series/fetchTopRatedSeries",
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await seriesService.fetchTopRatedSeries({
        page,
      });
      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Bir hata oluştu";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchPopularSeries = createAsyncThunk(
  "series/fetchPopularSeries",
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await seriesService.fetchPopularSeries({ page });
      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Bir hata oluştu";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchOnTheAirSeries = createAsyncThunk(
  "series/fetchOnTheAirSeries",
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await seriesService.fetchOnTheAirSeries({ page });

      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Bir hata oluştu";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const topRatedSeriesSlice = createSlice({
  name: "topRatedSeries",
  initialState: topRatedSeriesInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopRatedSeries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopRatedSeries.fulfilled, (state, action) => {
        state.loading = false;
        const existingIds = new Set(
          state.results.map((series: SeriesPage) => series.id)
        );
        const newSeries = action.payload.results.filter(
          (series: SeriesPage) => !existingIds.has(series.id)
        );
        state.results = [...state.results, ...newSeries];
        state.total_pages = action.payload.total_pages;
        state.total_results = action.payload.total_results;
        state.page = action.payload.page;
      })
      .addCase(fetchTopRatedSeries.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Bir hata oluştu";
      });
  },
});

const popularSeriesSlice = createSlice({
  name: "popularSeries",
  initialState: popularSeriesInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularSeries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularSeries.fulfilled, (state, action) => {
        state.loading = false;
        const existingIds = new Set(
          state.results.map((series: SeriesPage) => series.id)
        );
        const newSeries = action.payload.results.filter(
          (series: SeriesPage) => !existingIds.has(series.id)
        );
        state.results = [...state.results, ...newSeries];
        state.total_pages = action.payload.total_pages;
        state.total_results = action.payload.total_results;
        state.page = action.payload.page;
      })
      .addCase(fetchPopularSeries.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Bir hata oluştu";
      });
  },
});

const onTheAirSeriesSlice = createSlice({
  name: "onTheAirSeries",
  initialState: onTheAirSeriesInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOnTheAirSeries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOnTheAirSeries.fulfilled, (state, action) => {
        state.loading = false;
        const existingIds = new Set(
          state.results.map((series: SeriesPage) => series.id)
        );
        const newSeries = action.payload.results.filter(
          (series: SeriesPage) => !existingIds.has(series.id)
        );
        state.results = [...state.results, ...newSeries];
        state.total_pages = action.payload.total_pages;
        state.total_results = action.payload.total_results;
        state.page = action.payload.page;
      })
      .addCase(fetchOnTheAirSeries.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Bir hata oluştu";
      });
  },
});

export const topRatedSeriesReducer = topRatedSeriesSlice.reducer;
export const popularSeriesReducer = popularSeriesSlice.reducer;
export const onTheAirSeriesReducer = onTheAirSeriesSlice.reducer;
