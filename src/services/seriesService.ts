import { api } from "../lib/interceptor";

export interface GetCategoryWithFilterDTO {
  page: number;
  sort_by?: string;
  language?: string;
}

export const fetchTopRatedSeries = async (params: GetCategoryWithFilterDTO) => {
  try {
    const response = await api.get("/tv/top_rated", {
      params: {
        language: params.language ?? "en-US",
        page: params.page,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
        accept: "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching top rated series:", error);
    throw error;
  }
};

export const fetchPopularSeries = async (params: GetCategoryWithFilterDTO) => {
  try {
    const response = await api.get("/tv/popular", {
      params: {
        language: params.language ?? "en-US",
        page: params.page,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
        accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching popular series:", error);
    throw error;
  }
};

export const fetchOnTheAirSeries = async (params: GetCategoryWithFilterDTO) => {
  try {
    const response = await api.get("/tv/on_the_air", {
      params: {
        language: params.language ?? "en-US",
        page: params.page,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
        accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching on the air series:", error);
    throw error;
  }
};
