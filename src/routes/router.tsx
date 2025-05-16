import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Topbar from "../layouts/main-layouts/topbar/index";
import PopularMovieDetail from "../pages/PopularMovieDetail";
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
        path: "/popular-movie-detail/:id",
        element: <PopularMovieDetail />,
      },
    ],
  },
]);

export default router;
