"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { fetchEventByCategoryCount, fetchEventsByLocation, fetchFeaturedEvents, fetchPopularEvents } from "@/app/store/eventSlice";
import { fetchCurrentUser } from "@/app/store/userSlice";
import { AppConstants } from "@/app/constants/AppConstants";
import CarouselComponent from "../CommonComponents/CarouselComponent/CarouselComponent";
import EventCarouselItemTemplate from "./EventCarouselItemTemplate";
import EventByLocationComponent from "./EventByLocationComponent";
import EventByCategoryComponent from "./EventByCategoryComponent";
import _ from "lodash";
import PopularEventsComponent from "./PopularEventsComponent";
import { useRouter } from "next/navigation";
import NoEventComponent from "./NoEventComponent";

const ExplorePageComponent = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const currentUserData = useAppSelector((state) => state.user.currentUserData);
    const featuredEvents = useAppSelector((state) => state.event.featuredEvents);
    const eventsByLocation = useAppSelector((state) => state.event.eventsByLocation);
    const eventsCountByCategory = useAppSelector((state) => state.event.eventsCountByCategory);
    const popularEvents = useAppSelector((state) => state.event.popularEvents);

    useEffect(() => {
        dispatch(fetchCurrentUser());
        dispatch(fetchFeaturedEvents(3));
        dispatch(fetchEventByCategoryCount());
        dispatch(fetchPopularEvents());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchEventsByLocation({
            city: currentUserData?.city || "Ahmedabad",
            state: currentUserData?.state || "Gujarat",
            country: currentUserData?.country || "India",
            limit: 5
        }));
    }, [currentUserData, dispatch]);

    const handleEventClick = (eventSlug: string) => {
        router.push(`${AppConstants.EVENTS_ROUTE}/${eventSlug}`);
    }

    return (
        <div className="text-center py-5 flex flex-col gap-5">
            <div className="w-full flex flex-col gap-2.5">
                <h1 className="text-4xl sm:text-5xl md:text-5xl font-bold">
                    {AppConstants.EXPLORE_PAGE_HEADER}
                </h1>
                <span className="text-1xl text-[#acacac]">
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
                <>
                    <EventByLocationComponent
                        eventList={eventsByLocation}
                        handleEventClick={handleEventClick}
                    />
                </>
            )}

            {eventsCountByCategory && !_.isEmpty(eventsCountByCategory) && (
                <>
                    <EventByCategoryComponent />
                </>
            )}

            {popularEvents && popularEvents.length > 0 && (
                <>
                    <PopularEventsComponent
                        handleEventClick={handleEventClick}
                    />
                </>
            )}

            <NoEventComponent />
        </div>

    );
};

export default ExplorePageComponent;