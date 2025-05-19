import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

import { RouterProvider } from "react-router-dom";
import router from "./routes/router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <Provider store={store}>
      <App />
      <RouterProvider router={router} />
    </Provider>
  </>
);
