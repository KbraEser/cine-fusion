import { api } from "../lib/interceptor";

export interface GetMoviesByGenreDTO {
  page: number;
  sort_by?: string;
  language?: string;
  genre?: number;
}

export const fetchMoviesByGenre = async (params: GetMoviesByGenreDTO) => {
  try {
    const response = await api.get("/discover/movie", {
      params: {
        include_adult: false,
        include_video: false,
        language: params.language ?? "en-US",
        page: params.page,
        sort_by: params.sort_by ?? "popularity.desc",
        with_genres: params.genre,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
        accept: "application/json",
      },
    });

   
    return response.data;
  } catch (error) {
    console.error("Error fetching favorite comedy movies:", error);
    throw error;
  }
};
