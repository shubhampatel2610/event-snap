/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppConstants } from "../constants/AppConstants";
import { City, State } from "country-state-city";

// Get category by ID
export const getCategoryById = (id: any) => {
    return AppConstants.CATEGORIES.find((cat) => cat.id === id);
};

// Get category label by ID
export const getCategoryLabel = (id: any) => {
    const category = getCategoryById(id);
    return category ? category.label : id;
};

// Get category icon by ID
export const getCategoryIcon = (id: any) => {
    const category = getCategoryById(id);
    return category ? category.icon : "📅";
};

// Crete a slug for location-based routing
export const createLocationSlug = (city: string, state: string) => {
    const citySlug = city.toLowerCase().replace(/\s+/g, '-');
    const stateSlug = state.toLowerCase().replace(/\s+/g, '-');

    return `${citySlug}-${stateSlug}`;
}

// parse slug to get ciry and state
export const getLocationDataFromSlug = (slug: string | null) => {
    if (!slug) {
        return { city: null, state: null, validSlug: false };
    }

    const slugArr = slug.split("-");

    const cityName = slugArr[0].charAt(0).toUpperCase() + slugArr[0].slice(1);
    const stateName = slugArr.slice(1).map((str) => str.charAt(0).toUpperCase() + str.slice(1)).join(" ");

    // get all states of India and validate
    const allStates = State.getStatesOfCountry("IN");

    const stateExist = allStates.find((item: any) => item.name.toLowerCase() === stateName.toLowerCase());

    if (!stateExist) {
        return { city: null, state: null, validSlug: false };
    }

    // get all cities of that state and validate
    const allCities = City.getCitiesOfState("IN", stateExist.isoCode);

    const cityExist = allCities.find((item: any) => item.name.toLowerCase() === cityName.toLowerCase());

    if (!cityExist) {
        return { city: null, state: null, validSlug: false };
    }

    return { city: cityName, state: stateName, validSlug: true };
}