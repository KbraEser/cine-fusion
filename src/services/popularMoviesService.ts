import { api } from "../lib/interceptor";

export interface GetCategoryWithFilterDTO {
  page: number;
  sort_by?: string;
  language?: string;
}

export const fetchPopularMovies = async (params: GetCategoryWithFilterDTO) => {
  try {
    const response = await api.get("/discover/movie", {
      params: {
        include_adult: false,
        include_video: true,
        language: params.language ?? "en-US",
        page: params.page,
        sort_by: params.sort_by ?? "popularity.desc",
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
        accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};
