import axios from "axios";
import {
  clearAuthToken,
  getAuthToken,
  setAuthToken,
} from "../utils/auth.helpers";

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

async function refreshAccessToken() {
  try {
    const response = await axios.post(
      "/refresh",
      {},
      {
        baseURL: import.meta.env.VITE_AUTH_BASE_URL,
        withCredentials: true,
      }
    );

    const { access_token } = response.data;

    if (!access_token) {
      throw new Error("Refresh token not found");
    }

    setAuthToken(access_token);

    return access_token;
  } catch (error) {
    clearAuthToken();
    location.href = location.origin;
  }
}

/**
 *
 * @param {import("axios").InternalAxiosRequestConfig<any>} config
 */
function configureClient(config) {
  const accessToken = getAuthToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
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
  (response) => response.data,
  handleResponseError
);
