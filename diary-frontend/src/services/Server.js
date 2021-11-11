import axios from "axios";
import User from "./User";

const server = axios.create({
  baseURL: 'http://localhost:5858/api',
});

server.interceptors.request.use(
  config => {
    const token = User.getUserToken();
    config.headers['x-access-token'] = token;
    return config;
  },
  error => Promise.reject(error)
);

export default server;