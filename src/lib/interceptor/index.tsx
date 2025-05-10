import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response) {
      const { status, data } = response;

      if (status === 401) {
      } else if (status === 403) {
        console.error("Erişim engellendi (403).");
      } else if (status >= 500) {
        console.error("Sunucu hatası:", data?.message || "Bilinmeyen hata.");
      }

      return Promise.reject({
        error,
      });
    }

    return Promise.reject({
      status: 500,
      message: "Sunucuya erişilemiyor. Lütfen bağlantınızı kontrol edin.",
      data: null,
    });
  }
);
