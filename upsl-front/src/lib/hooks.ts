import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import api from "./api";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const setBearer = (token: string) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const resetBearer = () => {
  api.defaults.headers.common.Authorization = "";
};

export { setBearer, resetBearer };
