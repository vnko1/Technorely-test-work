import axios from "axios";

import { accessToken, getToken, setToken } from "@/utils";
import { CredentialType, Endpoints } from "@/types";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const publicApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const privateApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

privateApi.interceptors.request.use(
  async (config) => {
    const access_token = getToken();
    if (accessToken) {
      config.headers.Authorization = "Bearer" + " " + access_token;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

privateApi.interceptors.response.use(
  (config) => config,
  async (error) => {
    const access_token = getToken();

    if (!access_token) {
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    const isAuthError =
      error.response.status === 401 && error.config && !originalRequest._retry;

    if (isAuthError) {
      error.config._retry = true;

      try {
        const { data } = await axios.post<CredentialType>(
          `${BASE_URL}${Endpoints.REFRESH}`,
          null,
          { withCredentials: true }
        );

        if (data.access_token) {
          setToken(data.access_token);
        }

        return privateApi.request(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
