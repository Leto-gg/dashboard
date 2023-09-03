import axios from "axios";
import { clearAuthToken, setAuthToken } from "../utils/auth.helpers";

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

async function refreshAccessToken() {
  try {
    const response = await httpClient.post("/auth/refresh");

    const { access_token } = response.data;

    if (!access_token) {
      throw new Error("Refresh token not found");
    }

    setAuthToken(access_token);

    return access_token;
  } catch (error) {
    clearAuthToken();
  }
}

/**
 *
 * @param {import("axios").InternalAxiosRequestConfig<any>} config
 */
function configureClient(config) {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
}

async function handleResponseError(error) {
  const originalRequest = error?.config;

  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const access_token = await refreshAccessToken();

    axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
    return httpClient(originalRequest);
  }

  return Promise.reject(error);
}

httpClient.interceptors.request.use(configureClient, (error) =>
  Promise.reject(error)
);

httpClient.interceptors.response.use(
  (response) => response,
  handleResponseError
);
