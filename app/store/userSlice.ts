/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { queryWithDashboard } from "../convexClient";
import { api } from "@/convex/_generated/api";

interface UserState {
  currentUserData: any | null;
}

const initialState: UserState = {
  currentUserData: null
};

// thunks to fetch data from Convex and dispatch actions based on results
export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async () => {
    const result = await queryWithDashboard(api.users.getCurrentUserData);
    return result;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUserData(state, action: PayloadAction<any | null>) {
      state.currentUserData = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.currentUserData = action.payload;
      })
  },
});

export const { setCurrentUserData } = userSlice.actions;

export default userSlice.reducer;