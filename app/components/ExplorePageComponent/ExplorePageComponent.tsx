/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { AppConstants } from "@/app/constants/AppConstants";
import CarouselComponent from "../common/CarouselComponent/CarouselComponent";
import EventCarouselItemTemplate from "./EventCarouselItemTemplate";
import EventByLocationComponent from "./EventByLocationComponent";
import EventByCategoryComponent from "./EventByCategoryComponent";
import _ from "lodash";
import PopularEventsComponent from "./PopularEventsComponent";
import NoEventComponent from "./NoEventComponent";

interface ExplorePageComponentProps {
    preloadedFeatured: Preloaded<typeof api.eventService.getFeaturingEvents>;
    preloadedPopular: Preloaded<typeof api.eventService.getPopularEvents>;
    preloadedCategoryCounts: Preloaded<typeof api.eventService.getEventCountsByCategory>;
}

const ExplorePageComponent = (props: ExplorePageComponentProps) => {
    const { preloadedFeatured, preloadedPopular, preloadedCategoryCounts } = props;

    const featuredEvents = usePreloadedQuery(preloadedFeatured) as any[];
    const popularEvents = usePreloadedQuery(preloadedPopular) as any[];
    const eventsCountByCategory = usePreloadedQuery(preloadedCategoryCounts) as any;

    const { data: currentUserData } = useConvexQuery(api.users.getCurrentUserData) as any;

    const { data: eventsByLocation } = useConvexQuery(api.eventService.getEventsByLocation, {
        city: currentUserData?.location?.city || "Ahmedabad",
        state: currentUserData?.location?.state || "Gujarat",
        country: currentUserData?.location?.country || "India",
        limit: 5,
    }) as any;

    return (
        <div className="text-center py-5 flex flex-col gap-5">
            <div className="w-full flex flex-col gap-2.5">
                <h1 className="text-4xl sm:text-5xl md:text-5xl font-bold">
                    {AppConstants.EXPLORE_PAGE_HEADER}
                </h1>
                <span className="text-1xl text-muted-foreground">
                    {AppConstants.EXPLORE_PAGE_SUBHEADER}
                </span>
            </div>

            {featuredEvents && featuredEvents.length > 0 && (
                <div>
                    <CarouselComponent
                        carouselItems={featuredEvents}
                        itemTemplate={EventCarouselItemTemplate}
                    />
                </div>
            )}

            {eventsByLocation && eventsByLocation.length > 0 && (
                <EventByLocationComponent
                    eventList={eventsByLocation}
                    userData={currentUserData}
                />
            )}

            {eventsCountByCategory && !_.isEmpty(eventsCountByCategory) && (
                <EventByCategoryComponent eventsCountByCategory={eventsCountByCategory} />
            )}

            {popularEvents && popularEvents.length > 0 && (
                <PopularEventsComponent popularEvents={popularEvents} />
            )}

            <NoEventComponent
                featuredEvents={featuredEvents}
                eventsByLocation={eventsByLocation}
                popularEvents={popularEvents}
            />
        </div>

    );
};

export default ExplorePageComponent;
