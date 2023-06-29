/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";

import { SuspenseWrapper } from "./../components/atoms/suspenseWrapper";
import { Root } from "./root";

const Dashboard = SuspenseWrapper(lazy(() => import("../pages/dashboard")));
const NotFound = SuspenseWrapper(lazy(() => import("../pages/notFound")));
const Configuration = SuspenseWrapper(
  lazy(() => import("../pages/configuration"))
);

/**
 * @type {import("react-router-dom").RouteObject[]}
 */
export const routes = [
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
        element: <Configuration />,
      },
    ],
  },
];
