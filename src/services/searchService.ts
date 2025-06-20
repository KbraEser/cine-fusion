import { api } from "../lib/interceptor";

export interface SearchParams {
  query: string;
  page?: number;
  language?: string;
}

export interface SearchResult {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  media_type: 'movie' | 'tv' | 'person';
  release_date?: string;
  first_air_date?: string;
  overview?: string;
  vote_average?: number;
}

export interface SearchResponse {
  page: number;
  results: SearchResult[];
  total_pages: number;
  total_results: number;
}

export const searchMulti = async (params: SearchParams): Promise<SearchResponse> => {
  try {
    const response = await api.get("/search/multi", {
      params: {
        query: params.query,
        page: params.page ?? 1,
        language: params.language ?? "en-US",
        include_adult: false,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
        accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Arama hatası:", error);
    throw error;
  }
};

export const searchMovies = async (params: SearchParams): Promise<SearchResponse> => {
  try {
    const response = await api.get("/search/movie", {
      params: {
        query: params.query,
        page: params.page ?? 1,
        language: params.language ?? "en-US",
        include_adult: false,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
        accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Film arama hatası:", error);
    throw error;
  }
};

export const searchTvShows = async (params: SearchParams): Promise<SearchResponse> => {
  try {
    const response = await api.get("/search/tv", {
      params: {
        query: params.query,
        page: params.page ?? 1,
        language: params.language ?? "en-US",
        include_adult: false,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
        accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Dizi arama hatası:", error);
    throw error;
  }
}; 