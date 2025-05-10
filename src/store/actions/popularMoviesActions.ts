import type { AppDispatch } from "../store";
import * as popularMoviesService from "../../services/popularMoviesService";
import {
  fetchPopularMoviesRequest,
  fetchPopularMoviesSuccess,
  fetchPopularMoviesFailure,
} from "../reducers/popularMoviesReducer";
import { toast } from "react-toastify";

interface GetCategoryWithFilterDTO {
  PageNumber: number;
  PageSize: number;
  OrderBy?: string;
  Direction?: string;
  Search?: string;
}

export const fetchPopularMovies =
  (params: GetCategoryWithFilterDTO) => async (dispatch: AppDispatch) => {
    dispatch(fetchPopularMoviesRequest());
    try {
      const response = await popularMoviesService.fetchPopularMovies(params);
      dispatch(fetchPopularMoviesSuccess(response));
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Popüler filmler yüklenirken bir hata oluştu";

      dispatch(fetchPopularMoviesFailure(errorMessage));
      toast.error(errorMessage);
    }
  };
