import { createSlice } from "@reduxjs/toolkit";

interface MovieDetailsState {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  loading: boolean;
  error: string | null;
}

const initialState: MovieDetailsState = {
  id: 0,
  title: "",
  overview: "",
  poster_path: "",
  backdrop_path: "",
  release_date: "",
  vote_average: 0,
  loading: false,
  error: null,
};

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
        return { ...state, ...action.payload };
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Bir hata oluştu";
      });
  },
});

export default movieDetailsSlice.reducer;
