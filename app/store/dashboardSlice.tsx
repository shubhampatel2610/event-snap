import { createSlice } from "@reduxjs/toolkit";

interface DashboardState {
  value: number;
  isLoading: boolean;
}

const initialState: DashboardState = {
  value: 0,
  isLoading: false,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },

    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = dashboardSlice.actions;

export default dashboardSlice.reducer;
