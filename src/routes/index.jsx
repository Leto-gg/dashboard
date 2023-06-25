import { NotFound } from "../pages/notFound";
import { Root } from "./root";

/**
 * @type {import("react-router-dom").RouteObject[]}
 */
export const routes = [
  { path: "/", element: <Root />, errorElement: <NotFound /> },
];
