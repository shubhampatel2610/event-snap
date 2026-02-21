"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { fetchEventsByLocation, fetchFeaturedEvents } from "@/app/store/eventSlice";
import { fetchCurrentUser } from "@/app/store/userSlice";
import { AppConstants } from "@/app/constants/AppConstants";
import CarouselComponent from "../FormComponents/CarouselComponent/CarouselComponent";
import EventCarouselItemTemplate from "./EventCarouselItemTemplate";

const ExplorePageComponent = () => {
    const dispatch = useAppDispatch();

    const currentUserData = useAppSelector((state) => state.user.currentUserData);
    const featuredEvents = useAppSelector((state) => state.event.featuredEvents);
    const eventsByLocation = useAppSelector((state) => state.event.eventsByLocation);

    useEffect(() => {
        dispatch(fetchCurrentUser());
        dispatch(fetchFeaturedEvents(3));
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchEventsByLocation({
            city: currentUserData?.city || "Ahmedabad",
            state: currentUserData?.state || "Gujarat",
            country: currentUserData?.country || "India",
            limit: 5
        }));
    }, [currentUserData, dispatch]);

    return (
        <div className="text-center py-5 flex flex-col gap-2.5">
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
        </div>

    );
};

export default ExplorePageComponent;