import { configureStore } from "@reduxjs/toolkit";
import dashboardSlice from "./dashboardSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export default function configureAppStore() {
  const store = configureStore({
    reducer: {
      dashboard: dashboardSlice,
    },
  });

  return store;
}

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureAppStore();
