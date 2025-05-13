import { configureStore } from "@reduxjs/toolkit";
import popularMoviesReducer from "./reducers/popularMoviesReducer";
import languageReducer from "./reducers/languageReducer";

const store = configureStore({
  reducer: {
    popularMovies: popularMoviesReducer,
    language: languageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
