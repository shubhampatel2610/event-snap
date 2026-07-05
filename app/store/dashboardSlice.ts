import { createSlice } from "@reduxjs/toolkit";

interface DashboardState {
  searchQuery: string;
  showSearchedResults: boolean;
  showPricingPlans: boolean;
}

const initialState: DashboardState = {
  searchQuery: "",
  showSearchedResults: false,
  showPricingPlans: false
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
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

export const { setSearchQuery, setShowSearchedResults, setShowPricingPlans } = dashboardSlice.actions;

export default dashboardSlice.reducer;
