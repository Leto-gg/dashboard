/* eslint-disable react/display-name */
import { Suspense } from "react";

// project import
import { Loader } from "../loader";

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

export const SuspenseWrapper = (Component) => (props) =>
  (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );
