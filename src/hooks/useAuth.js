import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { clearAuthToken, getAuthToken } from "../libs/utils/auth.helpers";
import { logoutAPI } from "../api/auth.api";

function useAuth() {
  const isAuth = getAuthToken() != null;
  const navigate = useNavigate();

  const logout = useCallback(async () => {
    clearAuthToken();
    try {
      const { data } = await logoutAPI();
      if (data?.redirectUrl) {
        window.location.replace(data.redirectUrl);
      } else {
        navigate("/user/login");
      }
    } catch (error) {
      console.warn(error);
    }
  }, [navigate]);

  return {
    isAuth,
    logout,
  };
}

export default useAuth;
