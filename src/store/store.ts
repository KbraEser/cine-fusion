import { configureStore } from "@reduxjs/toolkit";
import popularMoviesReducer from "./slices/homePage-slice/popularMoviesSlice";
import languageReducer from "./slices/languageSlice";
import movieDetailsReducer from "./slices/movieDetailsSlice";
import favoriteComedyMoviesReducer from "./slices/homePage-slice/favoriteMoviesSlice";

export const store = configureStore({
  reducer: {
    popularMovies: popularMoviesReducer,
    language: languageReducer,
    movieDetails: movieDetailsReducer,
    favoriteComedyMovies: favoriteComedyMoviesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
