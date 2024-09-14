"use client";

import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { API_URL } from "@/lib/utils/constants";
import { getErrorMessage } from "@/lib/utils/helpers";

type ApiMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface ApiResponse<T> {
  data: T;
  error?: AxiosError;
}

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const errorMessage = getErrorMessage(error);
    toast.error(errorMessage);
    return Promise.reject(error);
  }
);

const api = {
  get: <T>(url: string, config?: any): Promise<ApiResponse<T>> => {
    return apiClient
      .get(url, config)
      .then((response) => ({ data: response.data }))
      .catch((error) => ({ error }));
  },
  post: <T>(url: string, data: any, config?: any): Promise<ApiResponse<T>> => {
    return apiClient
      .post(url, data, config)
      .then((response) => ({ data: response.data }))
      .catch((error) => ({ error }));
  },
  put: <T>(url: string, data: any, config?: any): Promise<ApiResponse<T>> => {
    return apiClient
      .put(url, data, config)
      .then((response) => ({ data: response.data }))
      .catch((error) => ({ error }));
  },
  delete: <T>(url: string, config?: any): Promise<ApiResponse<T>> => {
    return apiClient
      .delete(url, config)
      .then((response) => ({ data: response.data }))
      .catch((error) => ({ error }));
  },
};

export default api;