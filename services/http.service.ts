import axios from "axios";
import { toast } from "sonner";
import { API_BASE } from "./api-client";

const { CancelToken } = axios;

let source = CancelToken.source();

axios.defaults.baseURL = API_BASE;

axios.interceptors.request.use(
  (config) => ({ ...config, cancelToken: source.token }),
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (res) => {
    const { message } = res.data;
    if (res.config.method !== 'get') {
      toast.success(message || "Fetch successful");
    }

    return res;
  },
  (err) => {
    const { response } = err;
    const message = response?.data?.message;
    if (!response) throw err;

    const code = response.data.statusCode;

    if (code === 401 || message === "Session has expired" || message === "Unauthorized Access") {
      source.cancel(message);

      setTimeout(() => {
        source = CancelToken.source();

        if (window.location.pathname !== "/") window.location.assign("/");
      }, 300);
    }

    throw err;
  }
);

const http = {
  get: axios.get,
  put: axios.put,
  post: axios.post,
  patch: axios.patch,
  delete: axios.delete,
  setJWT: () => {
    axios.defaults.headers.common.Authorization = "Bearer " + localStorage.getItem("adminToken") || "";
  },
  setMultiPart: () => ({ headers: { "Content-Type": "multipart/form-data" } }),
};

export default http;
