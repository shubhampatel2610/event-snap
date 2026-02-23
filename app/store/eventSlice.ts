/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { useCustomConvexQuery } from "../convexClient";
import { api } from "@/convex/_generated/api";

interface EventState {
  featuredEvents: any[];
  eventsByLocation: any[];
}

const initialState: EventState = {
  featuredEvents: [],
  eventsByLocation: [],
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
        limit: 5
      }
    );
    return result;
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeaturedEvents.fulfilled, (state, action) => {
        state.featuredEvents = action.payload as any[];
      })
      .addCase(fetchEventsByLocation.fulfilled, (state, action) => {
        state.eventsByLocation = action.payload as any[];
      })
  },
});

export const { setFeaturedEvents, setEventsByLocation } = eventSlice.actions;

export default eventSlice.reducer;