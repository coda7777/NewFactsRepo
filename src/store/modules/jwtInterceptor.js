import axios from "axios";
// import store from "store";
import store from "../index";

const jwtInterceptor = axios.create({
  baseURL: "http://localhost:8000",
});

jwtInterceptor.interceptors.request.use((config) => {
  const accessToken = store.getters["user/token"];
  config.headers.common["Authorization"] = `Token ${accessToken}`;
  return config;
});
export default jwtInterceptor;
