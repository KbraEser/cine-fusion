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
export const fetchCast = async (movieId: string) => {
  try {
    const response = await api.get(`/movie/${movieId}/credits`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
        accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching cast:", error);
    throw error;
  }
};
