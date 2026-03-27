import { mutation, query } from "@/convex/_generated/server";
import { v } from "convex/values";
import { api, internal } from "./_generated/api";
import { generateSlugByTitle } from '@/app/utils/helperFunctions';
import { AppConstants } from '@/app/constants/AppConstants';

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

// create new event
export const createNewEvent = mutation({
    args: {
        title: v.string(),
        description: v.string(),
        category: v.string(),
        tags: v.array(v.string()),
        startDate: v.number(),
        endDate: v.number(),
        timeZone: v.string(),
        locationType: v.union(v.literal("online"), v.literal("in-person")),
        venueName: v.optional(v.string()),
        address: v.string(),
        city: v.string(),
        state: v.string(),
        country: v.string(),
        capacity: v.number(),
        isFree: v.boolean(),
        ticketPrice: v.optional(v.number()),
        bannerImageUrl: v.optional(v.string()),
        themeColor: v.optional(v.string()),
        hasPro: v.optional(v.boolean()),
    },
    handler: async (ctx, args): Promise<any> => {
        try {
            const user: any = await ctx.runQuery(api.users.getCurrentUserData);
            const { hasPro, ...eventData } = args;
            
            if (!hasPro && user.freeEventsCount > 1) {
                throw new Error(AppConstants.MAX_EVENT_COUNT_ERROR);
            }

            const slug = generateSlugByTitle(eventData.title);

            const eventId = await ctx.db.insert("eventsData", {
                ...eventData,
                slug,
                organizerId: user._id,
                organizerName: user.name,
                attendeesCount: 0,
                registrationCount: 0,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            });

            // update users created event count
            await ctx.db.patch(user._id, {
                freeEventsCount: user.freeEventsCount + 1
            });

            return eventId;
        } catch (error: any) {
            throw new Error(`${AppConstants.CREATE_EVENT_ERROR}: ${error.message}`)
        }
    }
});

// get events by slug
export const getEventBySlug = query({
    args: { slug: v.string() },
    handler: async (ctx, args) => {
        const eventData = await ctx.db
            .query("eventsData")
            .withIndex("by_slug", (q) => q.eq("slug", args.slug))
            .unique();

        return eventData;
    }
});

// get events by organizer details
export const getMyEventsDetails = query({
    handler: async (ctx, args) => {
        const user: any = await ctx.runQuery(api.users.getCurrentUserData);

        const eventData: any = await ctx.db
            .query("eventsData")
            .withIndex("by_organizerId", (q) => q.eq("organizerId", user?._id))
            .order("desc")
            .collect();

        return eventData;
    }
});

// delete event
export const deleteEvent = mutation({
    args: { eventId: v.id("eventsData") },
    handler: async (ctx, args) => {
        const user: any = await ctx.runQuery(api.users.getCurrentUserData);

        const eventFound = await ctx.db.get(args.eventId);
        if (!eventFound) {
            throw new Error(AppConstants.EVENT_NOT_FOUND);
        }

        if (eventFound.organizerId !== user._id) {
            throw new Error(AppConstants.DELETE_EVENT_AUTH_ERROR);
        }

        const eventRegistrations = await ctx.db
            .query("registrationData")
            .withIndex("by_eventId", (q) => q.eq("eventId", args.eventId))
            .collect();

        // delete all registrations
        for (const registration of eventRegistrations) {
            await ctx.db.delete(registration._id);
        }

        // delete event
        await ctx.db.delete(args.eventId);

        // decrease event count of user
        if (user.freeEventsCount > 0) {
            await ctx.db.patch(user._id, {
                freeEventsCount: user.freeEventsCount - 1
            });
        }

        return { success: true };
    }
})