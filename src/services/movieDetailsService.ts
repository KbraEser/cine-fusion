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

export const fetchVideo = async (movieId: string) => {
  try {
    const response = await api.get(`/movie/${movieId}/videos`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
        accept: "application/json",
      },
    });

    const videos = response.data.results;

    const trailer =
      videos.find(
        (v: { type: string; site: string; official: boolean }) =>
          v.type === "Trailer" && v.site === "YouTube" && v.official === true
      ) ||
      videos.find(
        (v: { type: string; site: string }) =>
          v.type === "Trailer" && v.site === "YouTube"
      );

    return trailer?.key;
  } catch (error) {
    console.error("Error fetching video:", error);
    throw error;
  }
};
