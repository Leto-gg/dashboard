/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";

import { SuspenseWrapper } from "./../components/atoms/suspenseWrapper";
import { Navigate } from "react-router-dom";
import TierGuard from "../components/templates/TierGuard";
import { USER_TIER } from "../libs/constants/global";

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
const CreateProxyGateway = SuspenseWrapper(
  lazy(() => import("../pages/create-proxy-gateway"))
);
const ProxyGateway = SuspenseWrapper(
  lazy(() => import("../pages/proxy-gateway"))
);
const AccountDetails = SuspenseWrapper(
  lazy(() => import("../pages/account-details"))
);
const MalwareAnalyzer = SuspenseWrapper(
  lazy(() => import("../pages/malware-analyzer"))
);
const CheckoutSession = SuspenseWrapper(
  lazy(() => import("../pages/checkout-session"))
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
          {
            path: "/checkout-session",
            element: <CheckoutSession />,
          },
          {
            path: "/proxy-gateway",
            element: (
              <TierGuard>
                <ProxyGateway />
              </TierGuard>
            ),
          },
          {
            path: "/malware-analyzer",
            element: (
              <TierGuard allowedTiers={[USER_TIER.BUSINESS]}>
                <MalwareAnalyzer />
              </TierGuard>
            ),
          },
          {
            path: "/proxy-gateway/create",
            element: <CreateProxyGateway />,
          },
          {
            path: "/account-details",
            element: <AccountDetails />,
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
