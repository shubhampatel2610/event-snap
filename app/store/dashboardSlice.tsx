/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

interface DashboardState {
  isLoading: boolean;
  data: any[];
  error: string | null;
}

const initialState: DashboardState = {
  isLoading: false,
  data: [],
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setLoading, setData, setError } = dashboardSlice.actions;

export default dashboardSlice.reducer;
