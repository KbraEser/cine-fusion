import { api } from "../lib/interceptor";

export const fetchMovieDetails = async (id: number) => {
  try {
    const response = await api.get(`/movie/${id}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
        accept: "application/json",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
