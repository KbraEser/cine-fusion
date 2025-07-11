import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router.tsx";
import { LoaderProvider } from "./context/LoaderContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <LoaderProvider>
      <RouterProvider router={router} />
    </LoaderProvider>
  </Provider>
);
