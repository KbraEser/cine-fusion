import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Topbar from "../layouts/main-layouts/topbar/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Topbar />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]);

export default router;
