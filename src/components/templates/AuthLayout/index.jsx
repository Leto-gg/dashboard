import { Navigate, Outlet } from "react-router-dom";
import { styled } from "styled-components";
// material-ui
import DrawerHeader from "../../molecules/drawerHeader";
import { Box, Divider } from "@mui/material";
// libs
import useAuth from "../../../hooks/useAuth";
// custom styled components
const AuthContentContainer = styled.main`
  margin-top: 24px;
`;

function AuthLayout() {
  const { isAuth } = useAuth();

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Box alignItems="center">
      <DrawerHeader />
      <Divider variant="middle" />
      <AuthContentContainer>
        <Outlet />
      </AuthContentContainer>
    </Box>
  );
}

export default AuthLayout;
