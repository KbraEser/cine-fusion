import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Topbar from "../layouts/main-layouts/topbar/index";
import MovieDetail from "../pages/MovieDetail";
import SeriesPage from "../pages/SeriesPage";
import SeriesDetailPage from "../pages/SeriesDetailPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Topbar />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/movie-detail/:id",
        element: <MovieDetail />,
      },
    ],
  },
  {
    path: "/series",
    element: <Topbar />,
    children: [
      {
        path: "/series",
        element: <SeriesPage />,
      },
      {
        path: "/series/:id",
        element: <SeriesDetailPage />,
      },
    ],
  },
]);

export default router;
