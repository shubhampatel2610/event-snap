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

// generate slug by title
export const generateSlugByTitle = (title: string) => {
    const baseSlug = title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

    const uniqueId = Date.now().toString().slice(-6);

    return `${baseSlug}-${uniqueId}`;
}

// HH:MM format regex
export const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const combineDateTime = (date: any, time: string) => {
    if (!date || !time) {
        return null;
    }

    const [hour, minutes] = time.split(":");

    const dateVal = new Date(date);

    dateVal.setHours(Number(hour), Number(minutes), 0, 0);

    return dateVal;
}

export const createEventPayload = (data: any, proPlan: any, date: any) => {
    return {
        title: data.title,
        description: data.description || "",
        category: data.category,
        tags: [data.category],
        startDate: date.startDate ? new Date(date.startDate).getTime() : undefined,
        endDate: date.endDate ? new Date(date.endDate).getTime() : undefined,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        locationType: data.locationType,
        venueName: data.venue || "",
        address: data.address || "",
        state: data.state,
        city: data.city,
        country: "India",
        capacity: data.capacity,
        isFree: data.isFree,
        ticketPrice: data.ticketPrice ?? 0,
        bannerImageUrl: data.coverImage || "",
        themeColor: data.themeColor,
        hasPro: proPlan
    }
}

export const generateEventId = () => {
    return `ES-TKT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}

export const darkenColor = (color: any, amount: any) => {
    const colorWithoutHash = color.replace("#", "");
    const num = parseInt(colorWithoutHash, 16);
    const r = Math.max(0, (num >> 16) - amount * 255);
    const g = Math.max(0, ((num >> 8) & 0x00ff) - amount * 255);
    const b = Math.max(0, (num & 0x0000ff) - amount * 255);
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}