import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { api } from "./_generated/api";
import { AppConstants } from "@/app/constants/AppConstants";
import { generateEventId } from "@/app/utils/helperFunctions";

export const registerForEvent = mutation({
    args: {
        eventId: v.id("eventsData"),
        name: v.string(),
        email: v.string()
    },
    handler: async (ctx, args) => {
        const user: any = await ctx.runQuery(api.users.getCurrentUserData);

        const eventData = await ctx.db.get(args.eventId);
        if (!eventData) {
            throw new Error(AppConstants.EVENT_NOT_FOUND);
        }

        if (eventData.registrationCount >= eventData.capacity) {
            throw new Error(AppConstants.REGISTRATION_EXCEED_ERROR);
        }

        const userRegistered = await ctx.db
            .query("registrationData")
            .withIndex("by_eventId_userId", (q: any) => q.eq("eventId", args.eventId).eq("userId", user?._id)).unique();

        if (userRegistered) {
            throw new Error(AppConstants.REGISTRATION_LIMIT_ERROR);
        }

        const uniqueTicketId = generateEventId();
        const registerationId = await ctx.db.insert("registrationData", {
            eventId: args.eventId,
            userId: user._id,
            uniqueId: uniqueTicketId,
            attendeeName: args.name,
            attendeeEmail: args.email,
            checkedIn: false,
            status: "confirmed",
            registeredAt: Date.now(),
        });

        await ctx.db.patch(args.eventId, {
            registrationCount: eventData.registrationCount + 1
        });

        return registerationId;
    }
});

export const checkForUserRegistration = query({
    args: {
        eventId: v.id("eventsData")
    },
    handler: async (ctx, args) => {
        const user: any = await ctx.runQuery(api.users.getCurrentUserData);

        const registration = await ctx.db.query("registrationData")
            .withIndex("by_eventId_userId", (q: any) => q.eq("eventId", args.eventId).eq("userId", user?._id)).unique();

        return registration;
    }
});