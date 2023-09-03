import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { clearAuthToken, getAuthToken } from "../libs/utils/auth.helpers";
import { logoutAPI } from "../api/auth.api";

function useAuth() {
  const isAuth = getAuthToken() != null;
  const navigate = useNavigate();

  const logout = useCallback(async () => {
    try {
      await logoutAPI();
    } catch (error) {
      console.warn(error);
    }
    clearAuthToken();
    navigate("/user/login");
  }, [navigate]);

  return {
    isAuth,
    logout,
  };
}

export default useAuth;
