import { api } from "../lib/interceptor";

interface GetCategoryWithFilterDTO {
  PageNumber: number;
  PageSize: number;
  OrderBy?: string;
  Direction?: string;
  Search?: string;
}

export const fetchPopularMovies = async (params: GetCategoryWithFilterDTO) => {
  try {
    const response = await api.get(
      "/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
      {
        params,
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
