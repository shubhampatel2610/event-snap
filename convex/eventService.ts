import { query } from "@/convex/_generated/server";
import { v } from "convex/values";

// Get featuring events (upcoming events sorted by start date)
export const getFeaturingEvents = query({
    args: {
        limit: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const currentDate = Date.now();

        const events = await ctx.db
            .query("eventsData")
            .withIndex("by_startDate")
            .filter((q) => q.gte(q.field("startDate"), currentDate))
            .order("desc")
            .collect();

        // Sort events by registration count (popularity)
        const sortedEvents = events.sort((a, b) => b.registrationCount - a.registrationCount);

        // Return only the requested number of events
        return sortedEvents.slice(0, args.limit ?? 5);
    }
});

// Get events by location (upcoming events filtered by city/state/country and sorted by popularity)
export const getEventsByLocation = query({
    args: {
        city: v.optional(v.string()),
        state: v.optional(v.string()),
        country: v.optional(v.string()),
        limit: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const currentDate = Date.now();

        const events = await ctx.db
            .query("eventsData")
            .withIndex("by_startDate")
            .filter((q) => q.gte(q.field("startDate"), currentDate))
            .collect();

        // Filter events based on location
        const filteredEvents = events.filter((event) => {
            const matchesCity = args.city ? event.city.toLowerCase() === args.city.toLowerCase() : true;
            const matchesState = args.state ? event.state.toLowerCase() === args.state.toLowerCase() : true;
            const matchesCountry = args.country ? event.country.toLowerCase() === args.country.toLowerCase() : true;
            return matchesCity && matchesState && matchesCountry;
        });

        // Sort filtered events by registration count (popularity)
        const sortedEvents = filteredEvents.sort((a, b) => b.registrationCount - a.registrationCount);

        // Return only the requested number of events
        return sortedEvents.slice(0, args.limit ?? 10);
    }
});


// Get popular events (upcoming events sorted by registration count)
export const getPopularEvents = query({
    args: {
        limit: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const currentDate = Date.now();

        const events = await ctx.db
            .query("eventsData")
            .withIndex("by_startDate")
            .filter((q) => q.gte(q.field("startDate"), currentDate))
            .collect();

        // Sort events by registration count (popularity)
        const sortedEvents = events.sort((a, b) => b.registrationCount - a.registrationCount);

        // Return only the requested number of events
        return sortedEvents.slice(0, args.limit ?? 6);
    }
});

// Get events by category (upcoming events filtered by category and sorted by popularity)
export const getEventsByCategory = query({
    args: {
        category: v.string(),
        limit: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const currentDate = Date.now();

        const events = await ctx.db
            .query("eventsData")
            .withIndex("by_category")
            .filter((q) => q.eq(q.field("category"), args.category))
            .filter((q) => q.gte(q.field("startDate"), currentDate))
            .collect();

        // Sort events by registration count (popularity)
        const sortedEvents = events.sort((a, b) => b.registrationCount - a.registrationCount);

        // Return only the requested number of events
        return sortedEvents.slice(0, args.limit ?? 10);
    }
});

// Get event counts by category (for upcoming events)
export const getEventCountsByCategory = query({
    handler: async (ctx) => {
        const currentDate = Date.now();
        const events = await ctx.db
            .query("eventsData")
            .withIndex("by_startDate")
            .filter((q) => q.gte(q.field("startDate"), currentDate))
            .collect();

        const categoryCounts: Record<string, number> = {};

        events.forEach((event) => {
            categoryCounts[event.category] = (categoryCounts[event.category] || 0) + 1;
        });
        return categoryCounts;
    }
});