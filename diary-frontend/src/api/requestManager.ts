import axios, { AxiosResponse } from "axios";
import { authAPI } from ".";

const instance = axios.create({
  baseURL: "http://localhost:5858/api",
});

instance.interceptors.request.use(
  config => {
    const token = authAPI.getUserToken();
    if (token) {
      config.headers.credentials = 'include';
      config.headers.Authorization = `Bearer ${token}`;
      config.headers['Access-Control-Allow-Origin'] = '*';
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },(error) => {
    alert('interceptor request has error');
    return Promise.reject(error);
  }
);

instance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.data && error.response.data.error &&
    (error.response.data.session === false || error.response.data.session === "false")) {
      localStorage.removeItem("user");
  } 
  else if (error.response && error.response.data && error.response.data.error && error.response.data.error.message) {
      console.log(error.response.data.error.message);
  }
  else
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("user"); // <-- add your var
    } else
      return Promise.reject(error);
});

export default instance;