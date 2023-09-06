import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { Provider as ReduxProvider } from "react-redux";

import { routes } from "./routes";
import { store } from "./libs/redux/store";
import { ThemeCustomization } from "./theme";

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <ThemeCustomization>
          <RouterProvider router={router} />
        </ThemeCustomization>
      </ReduxProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
