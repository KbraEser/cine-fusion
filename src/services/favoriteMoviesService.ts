import { api } from "../lib/interceptor";

export interface GetFavoriteMoviesDTO {
  page: number;
  sort_by?: string;
  language?: string;
}

export const fetchFavoriteComedyMovies = async (
  params: GetFavoriteMoviesDTO
) => {
  try {
    const response = await api.get("/discover/movie", {
      params: {
        include_adult: false,
        include_video: true,
        language: params.language ?? "en-US",
        page: params.page,
        sort_by: params.sort_by ?? "popularity.desc",
        with_genres: 35,
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
