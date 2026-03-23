/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { useCustomConvexQuery } from "../convexClient";
import { api } from "@/convex/_generated/api";
import { AppConstants } from "../constants/AppConstants";

interface EventState {
  featuredEvents: any[];
  eventsByLocation: any[];
  eventsCountByCategory: any;
  popularEvents: any[];
  eventsByCategory: any[];
  selectedInterests: any[];
  selectedLocation: any,
  showImagePicker: boolean,
  showAIEventCreator: boolean
}

const initialState: EventState = {
  featuredEvents: [],
  eventsByLocation: [],
  eventsCountByCategory: {},
  popularEvents: [],
  eventsByCategory: [],
  selectedInterests: [],
  selectedLocation: {
    city: "",
    state: "",
    country: ""
  },
  showImagePicker: false,
  showAIEventCreator: false
};

export const fetchFeaturedEvents = createAsyncThunk(
  "explore/fetchFeaturedEvents",
  async (limit: number) => {
    const result = await useCustomConvexQuery(
      api.eventService.getFeaturingEvents,
      { limit }
    );
    return result;
  }
);

export const fetchEventsByLocation = createAsyncThunk(
  "explore/fetchEventsByLocation",
  async (location: any) => {
    const result = await useCustomConvexQuery(
      api.eventService.getEventsByLocation,
      {
        city: location?.city,
        state: location?.state,
        country: location?.country,
        limit: location?.limit ?? 5
      }
    );
    return result;
  }
);

export const fetchEventByCategoryCount = createAsyncThunk(
  "explore/fetchEventByCategoryCount",
  async () => {
    const result = await useCustomConvexQuery(
      api.eventService.getEventCountsByCategory
    );
    return result;
  }
);

export const fetchPopularEvents = createAsyncThunk(
  "explore/fetchPopularEvents",
  async () => {
    const result = await useCustomConvexQuery(
      api.eventService.getPopularEvents
    );
    return result;
  }
);

export const fetchEventsByCategory = createAsyncThunk(
  "explore/fetchEventsByCategory",
  async ({ category, limit }: { category: string; limit: number }) => {
    const result = await useCustomConvexQuery(
      api.eventService.getEventsByCategory,
      { category, limit }
    );
    return result;
  }
);

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
    setFeaturedEvents(state, action: PayloadAction<any[]>) {
      state.featuredEvents = action.payload;
    },
    setEventsByLocation(state, action: PayloadAction<any[]>) {
      state.eventsByLocation = action.payload;
    },
    setEventsCountByCategory(state, action: PayloadAction<any>) {
      state.eventsCountByCategory = action.payload;
    },
    setPopularEvents(state, action: PayloadAction<any>) {
      state.popularEvents = action.payload;
    },
    setEventsByCategory(state, action: PayloadAction<any>) {
      state.eventsByCategory = action.payload;
    },
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeaturedEvents.fulfilled, (state, action) => {
        state.featuredEvents = action.payload as any[];
      })
      .addCase(fetchEventsByLocation.fulfilled, (state, action) => {
        state.eventsByLocation = action.payload as any[];
      })
      .addCase(fetchEventByCategoryCount.fulfilled, (state, action) => {
        state.eventsCountByCategory = action.payload as any;
      })
      .addCase(fetchPopularEvents.fulfilled, (state, action) => {
        state.popularEvents = action.payload as any;
      })
      .addCase(fetchEventsByCategory.fulfilled, (state, action) => {
        state.eventsByCategory = action.payload as any;
      })
  },
});

export const {
  setFeaturedEvents,
  setEventsByLocation,
  setEventsCountByCategory,
  setPopularEvents,
  setEventsByCategory,
  setSelectedInterests,
  removeSelectedInterests,
  setSelectedLocation,
  setShowImagePicker,
  setShowAIEventCreator
} = eventSlice.actions;

export default eventSlice.reducer;