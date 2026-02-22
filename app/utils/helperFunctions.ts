/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppConstants } from "../constants/AppConstants";

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