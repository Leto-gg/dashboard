import { Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

function MainLayout() {
  const { isAuth } = useAuth();

  if (!isAuth) {
    window.location.replace("https://leto.gg");
    return null;
  }

  return <Outlet />;
}

export default MainLayout;
