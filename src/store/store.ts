import { configureStore } from "@reduxjs/toolkit";
import popularMoviesReducer from "./slices/popularMoviesSlice";
import languageReducer from "./slices/languageSlice";

export const store = configureStore({
  reducer: {
    popularMovies: popularMoviesReducer,
    language: languageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
