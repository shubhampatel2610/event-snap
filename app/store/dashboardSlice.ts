/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

interface DashboardState {
  isLoading: boolean;
  data: any[];
  error: string | null;
  searchQuery: string;
  showSearchedResults: boolean;
  showPricingPlans: boolean;
}

const initialState: DashboardState = {
  isLoading: false,
  data: [],
  error: null,
  searchQuery: "",
  showSearchedResults: false,
  showPricingPlans: false
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
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    setShowSearchedResults: (state, action) => {
      state.showSearchedResults = action.payload
    },
    setShowPricingPlans: (state, action) => {
      state.showPricingPlans = action.payload
    }
  },
});

export const { setLoading, setData, setError, setSearchQuery, setShowSearchedResults, setShowPricingPlans } = dashboardSlice.actions;

export default dashboardSlice.reducer;
