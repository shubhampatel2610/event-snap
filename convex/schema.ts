import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    //Users Collection
    users: defineTable({
        name: v.string(),
        tokenIdentifier: v.string(),
        email: v.string(),
        imageUrl: v.optional(v.string()),
        hasOnboardingDone: v.boolean(),
        location: v.optional(
            v.object({
                city: v.string(),
                state: v.string(),
                country: v.string(),
            })
        ),
        interests: v.optional(v.array(v.string())),
        freeEventsCount: v.number(),
        createdAt: v.number(),
        updatedAt: v.number(),
    })
        .index("by_token", ["tokenIdentifier"]),

    // Events Collection
    eventsData: defineTable({
        // ----- details -----
        title: v.string(),
        description: v.string(),
        slug: v.string(),

        // ----- organizer details -----
        organizerId: v.id("users"),
        organizerName: v.string(),

        // ----- event details -----
        category: v.string(),
        tags: v.array(v.string()),

        // ----- date and time -----
        startDate: v.number(),
        endDate: v.number(),
        timeZone: v.string(),

        // ----- location details -----
        locationType: v.union(v.literal("online"), v.literal("in-person"), v.literal("hybrid")),
        venueName: v.optional(v.string()),
        address: v.string(),
        city: v.string(),
        state: v.string(),
        country: v.string(),

        // ----- other details -----
        capacity: v.number(),
        attendeesCount: v.number(),
        isFree: v.boolean(),
        ticketPrice: v.optional(v.number()),
        registrationCount: v.number(),

        // ----- customization and branding -----
        bannerImageUrl: v.optional(v.string()),
        themeColor: v.optional(v.string()),

        // ----- timestamps -----
        createdAt: v.number(),
        updatedAt: v.number(),
    })
        .index("by_organizerId", ["organizerId"])
        .index("by_slug", ["slug"])
        .index("by_category", ["category"])
        .index("by_startDate", ["startDate"])
        .searchIndex("search_by_title", { searchField: "title" }),

    // Registration Collection
    registrationData: defineTable({
        eventId: v.id("eventsData"),
        userId: v.id("users"),

        // ----- attendee details -----
        attendeeName: v.string(),
        attendeeEmail: v.string(),

        // ----- check in details -----
        checkedIn: v.number(),
        checkedInAt: v.optional(v.number()),
        status: v.union(v.literal("confirmed"), v.literal("cancelled")),
        registeredAt: v.number(),
    })
        .index("by_eventId", ["eventId"])
        .index("by_userId", ["userId"])
        .index("by_eventId_userId", ["eventId", "userId"]),
});