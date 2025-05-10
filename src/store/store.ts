import { configureStore } from "@reduxjs/toolkit";
import popularMoviesReducer from "./reducers/popularMoviesReducer";

const store = configureStore({
  reducer: {
    popularMovies: popularMoviesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
