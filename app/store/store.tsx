import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import dashboardSlice from "./dashboardSlice";
import userSlice from "./userSlice";
import eventSlice from "./eventSlice";

export default function configureAppStore() {
  const store = configureStore({
    reducer: {
      dashboard: dashboardSlice,
      user: userSlice,
      event: eventSlice,
    },
  });

  return store;
}

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureAppStore();
