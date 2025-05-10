import { api } from "../lib/interceptor";

export const fetchPopularMovies = async () => {
  try {
    const response = await api.get(
      "/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};
