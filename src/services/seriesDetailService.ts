import { api } from "../lib/interceptor";

export const fetchSeriesDetail = async (id: number) => {
  try {
    const response = await api.get(`/tv/${id}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
        accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching series details:", error);
    throw error;
  }
};

export const fetchSeriesCast = async (seriesId: string) => {
  try {
    const response = await api.get(`/tv/${seriesId}/credits`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
        accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching series cast:", error);
    throw error;
  }
};

export const fetchSeriesVideo = async (seriesId: string) => {
  try {
    const response = await api.get(`/tv/${seriesId}/videos`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
        accept: "application/json",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching series video:", error);
    throw error;
  }
};

export const fetchSimilarSeries = async (seriesId: string) => {
  try {
    const response = await api.get(`/tv/${seriesId}/similar`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
        accept: "application/json",
      },
    });
    console.log(response.data.results);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching similar series:", error);
    throw error;
  }
};
