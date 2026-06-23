import axios from "axios";
import { ElMessage } from "element-plus";

const request = axios.create({ baseURL: "", timeout: 15000 });

request.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = "Bearer " + token;
  return config;
});

request.interceptors.response.use(
  (res) => {
    if (res.data.code !== 200 && res.data.code) {
      ElMessage.error(res.data.message || "请求失败");
      return Promise.reject(new Error(res.data.message));
    }
    return res;
  },
  (err) => {
    if (err.response?.status === 403) {
      ElMessage.error("权限不足");
    } else if (err.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/auth";
    }
    return Promise.reject(err);
  }
);

export default request;