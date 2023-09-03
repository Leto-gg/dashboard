/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";

import { SuspenseWrapper } from "./../components/atoms/suspenseWrapper";
import { Navigate } from "react-router-dom";

// Layout renderers
const Root = SuspenseWrapper(lazy(() => import("./root")));
const MainLayout = SuspenseWrapper(
  lazy(() => import("../components/templates/MainLayout"))
);
const AuthLayout = SuspenseWrapper(
  lazy(() => import("../components/templates/AuthLayout"))
);

// Pages
const Auth = SuspenseWrapper(lazy(() => import("../pages/auth")));
const Dashboard = SuspenseWrapper(lazy(() => import("../pages/dashboard")));
const NotFound = SuspenseWrapper(lazy(() => import("../pages/notFound")));
const CIDSPage = SuspenseWrapper(lazy(() => import("../pages/cids")));
const Configuration = SuspenseWrapper(
  lazy(() => import("../pages/configuration"))
);

/**
 * @type {import("react-router-dom").RouteObject[]}
 */
export const routes = [
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Navigate to="/" />,
    children: [
      {
        path: "/",
        element: <Root />,
        errorElement: <NotFound />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "/config",
            element: <Configuration />,
          },
          {
            path: "/cids",
            element: <CIDSPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/user",
    element: <AuthLayout />,
    errorElement: <Navigate to="/" />,
    children: [
      {
        path: "/user/auth",
        element: <Auth />,
      },
    ],
  },
];
