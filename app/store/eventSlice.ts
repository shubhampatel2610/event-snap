/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AppConstants } from "../constants/AppConstants";

interface EventState {
  selectedInterests: any[];
  selectedLocation: any,
  showImagePicker: boolean,
  showAIEventCreator: boolean,
  showRegistrationPopup: boolean,
  showMyTicketPopup: boolean,
  showTicketData: any,
  currentTab: "all" | "checkedIn" | "notCheckedIn",
  searchQuery: string,
  checkTicketVerification: boolean,
}

const initialState: EventState = {
  selectedInterests: [],
  selectedLocation: {
    city: "",
    state: "",
    country: ""
  },
  showImagePicker: false,
  showAIEventCreator: false,
  showRegistrationPopup: false,
  showMyTicketPopup: false,
  showTicketData: {},
  currentTab: "all",
  searchQuery: "",
  checkTicketVerification: false,
};

export const generateDataWithAI = createAsyncThunk(
  "explore/generateDataWithAI",
  async (prompt: string, { rejectWithValue }) => {
    try {
      const result = await fetch("/api/generate-event", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      if (!result.ok) {
        const errorData = await result.json();
        return rejectWithValue(`${AppConstants.GENERATE_EVENT_ERROR}: ${errorData.message}`);
      }
      const response = await result.json();
      return response;
    } catch (error: any) {
      console.error(`${AppConstants.GENERATE_EVENT_ERROR}: `, error.message);
    }
  }
);

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setSelectedInterests(state, action: PayloadAction<any>) {
      state.selectedInterests = [...state.selectedInterests, action.payload];
    },
    removeSelectedInterests(state, action: PayloadAction<any>) {
      state.selectedInterests = state.selectedInterests.filter((item: any) => item !== action.payload);
    },
    setSelectedLocation(state, action: PayloadAction<any>) {
      state.selectedLocation = action.payload;
    },
    setShowImagePicker(state, action: PayloadAction<any>) {
      state.showImagePicker = action.payload;
    },
    setShowAIEventCreator(state, action: PayloadAction<any>) {
      state.showAIEventCreator = action.payload;
    },
    setShowRegistrationPopup(state, action: PayloadAction<any>) {
      state.showRegistrationPopup = action.payload;
    },
    setShowMyTicketPopup(state, action: PayloadAction<any>) {
      state.showMyTicketPopup = action.payload;
    },
    setShowTicketData(state, action: PayloadAction<any>) {
      state.showTicketData = action.payload;
    },
    setCurrentTab(state, action: PayloadAction<"all" | "checkedIn" | "notCheckedIn">) {
      state.currentTab = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setCheckTicketVerification(state, action: PayloadAction<boolean>) {
      state.checkTicketVerification = action.payload;
    }
  },
});

export const {
  setSelectedInterests,
  removeSelectedInterests,
  setSelectedLocation,
  setShowImagePicker,
  setShowAIEventCreator,
  setShowRegistrationPopup,
  setShowMyTicketPopup,
  setShowTicketData,
  setCurrentTab,
  setSearchQuery,
  setCheckTicketVerification
} = eventSlice.actions;

export default eventSlice.reducer;
