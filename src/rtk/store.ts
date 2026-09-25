import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { authListener } from "./authListener";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefault) => getDefault().prepend(authListener.middleware),
  // preloadedState: {
  //   auth: {
  //     token: localStorage.getItem("token") ?? null,
  //     isAuthenticated: Boolean(localStorage.getItem("token")),
  //   },
  // },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
