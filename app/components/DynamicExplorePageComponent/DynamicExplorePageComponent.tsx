/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { AppConstants } from "@/app/constants/AppConstants";
import { fetchEventsByLocation, fetchEventsByCategory } from "@/app/store/eventSlice";
import { useAppDispatch } from "@/app/store/store";
import { getLocationDataFromSlug } from "@/app/utils/helperFunctions";
import { notFound, useParams } from "next/navigation";
import { useEffect } from "react";
import EventsBySlugComponent from "./EventsBySlugComponent";

const DynamicExplorePageComponent = () => {
    const params = useParams();
    const dispatch = useAppDispatch();

    const { slug } = params;

    // search if slug is category - navigated from category or not
    const searchCategory = AppConstants.CATEGORIES.find((category: any) => category.id === slug);
    const categoryFound = !!searchCategory;

    // if not from category then fetch city and state
    const { city, state, validSlug } = !categoryFound ?
        getLocationDataFromSlug(String(slug)) :
        { city: null, state: null, validSlug: false };

    useEffect(() => {
        if (categoryFound && slug) {
            // if the slug corresponds to a category, fetch by category
            dispatch(fetchEventsByCategory({ category: String(slug), limit: 50 }));
        } else {
            // otherwise fall back to location-based events
            dispatch(
                fetchEventsByLocation({
                    city: city || "Ahmedabad",
                    state: state || "Gujarat",
                    limit: 50,
                })
            );
        }
    }, [categoryFound, city, dispatch, slug, state]);

    const locationDetails = { city, state };

    if (!categoryFound && !validSlug) {
        return notFound();
    }

    return (
        <EventsBySlugComponent
            slugType={categoryFound ? "category" : "location"}
            slugTypeDetails={categoryFound ? searchCategory : locationDetails}
        />
    );
}

export default DynamicExplorePageComponent;