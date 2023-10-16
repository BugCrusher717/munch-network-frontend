import axios from "axios";
import { store } from "~/application/store";
import { logout } from "~/reducers/authSlice";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    timeout: 1000,
  },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      store.dispatch(logout);
    }
    return Promise.reject(err);
  }
);

export default api;
