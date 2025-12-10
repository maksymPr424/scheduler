import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://upsl.lol/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

const setBearer = (token: string) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const resetBearer = () => {
  api.defaults.headers.common.Authorization = "";
};

const getBearer = () => {
  return api.defaults.headers.common.Authorization;
};

export { setBearer, resetBearer, getBearer };

export default api;
