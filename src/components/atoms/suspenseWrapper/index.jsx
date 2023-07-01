/* eslint-disable react/display-name */
import { Suspense } from "react";

// project import
import { Loader } from "../loader";

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

export function SuspenseWrapper(Component) {
  return function Loadable(props) {
    return (
      <Suspense fallback={<Loader />}>
        <Component {...props} />
      </Suspense>
    );
  };
}
