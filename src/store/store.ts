import { configureStore } from "@reduxjs/toolkit";
import popularMoviesReducer from "./slices/homePage-slice/popularMoviesSlice";
import languageReducer from "./slices/languageSlice";
import movieDetailsReducer from "./slices/movieDetailsSlice";
import {
  comedyReducer,
  actionReducer,
} from "./slices/homePage-slice/favoriteMoviesSlice";
import { topRatedSeriesReducer } from "./slices/series/seriesSlice";

export const store = configureStore({
  reducer: {
    popularMovies: popularMoviesReducer,
    language: languageReducer,
    movieDetails: movieDetailsReducer,
    favoriteComedyMovies: comedyReducer,
    favoriteActionMovies: actionReducer,
    topRatedSeries: topRatedSeriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
