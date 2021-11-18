import axios, { AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8585/api",
  headers: {
    "Content-type": " application/json",
  },
});

const responseBody = (response: AxiosResponse) => response.data;

export const requestManager = {
  get: async (url: string, params: {}) => await instance.get(url, params).then(responseBody),
  post: async (url: string, body: {}, withCredentials: boolean = false) => await instance.post(url, body, {withCredentials}).then(responseBody),
  put: async (url: string, body: {}) => await instance.put(url, body).then(responseBody),
  delete: async (url: string) => await instance.delete(url).then(responseBody),
}