"use client";

import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { api } from "@/convex/_generated/api";
import { useConvexMutations, useConvexQuery } from "@/hooks/use-convex-query";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import InputComponent from "../common/InputComponent/InputComponent";
import { Loader2, Search } from "lucide-react";
import { setSearchQuery, setShowSearchedResults } from "@/app/store/dashboardSlice";
import { AppConstants } from "@/app/constants/AppConstants";
import { debounce } from "lodash";

const SearchBarComponent = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const searchRef = useRef<any>(null);

    const searchQuery = useAppSelector((state) => state.dashboard.searchQuery);
    const showSearchedResults = useAppSelector((state) => state.dashboard.showSearchedResults);

    const { data: currentUserData, isLoading } = useConvexQuery(
        api.users.getCurrentUserData
    );

    const { mutateData: updatedLocationData } = useConvexMutations(
        api.users.userOnBoarding
    );

    const { data: searchedResults, isLoading: searchLoading } = useConvexQuery(
        api.globalSearchService.searchEvents,
        searchQuery.trim().length > 2 ? { query: searchQuery, limit: 5 } : "skip"
    );

    const debounceSearch = useRef(
        debounce((value) => dispatch(setSearchQuery(value), 300))
    ).current;

    const handleGlobalSearch = (e: any) => {
        const value = e.target.value;
        debounceSearch(value);
        dispatch(setShowSearchedResults(value.length > 2));
    }

    const handleEventClick = (eventSlug: string) => {
        dispatch(setShowSearchedResults(false));
        dispatch(setSearchQuery(""));
        router.push(`${AppConstants.EVENTS_ROUTE}/${eventSlug}`);
    }

    useEffect(() => {
        const handleOutsideClick = (e: any) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                dispatch(setShowSearchedResults(false));
            }
        }

        document.addEventListener("click", handleOutsideClick);

        return () => document.removeEventListener("click", handleOutsideClick);
    }, [])

    return (
        <div className="flex items-center relative">
            <div className="relative flex w-full" ref={searchRef}>

                <InputComponent
                    icon={<Search className="h-4 w-4" />}
                    placeholder={AppConstants.GLOBAL_SEARCH_PLACEHOLDER}
                    onFocus={() => {
                        if (searchQuery.length > 2) {
                            dispatch(setShowSearchedResults(true));
                        }
                    }}
                    onChange={handleGlobalSearch}
                />

                {showSearchedResults && (
                    <div className="absolute mt-10 w-50 bg-background border rounded-lg shadow-lg z-50 max-h-[400px] overflow-y-auto">
                        {searchLoading ?
                            <div className="p-4 flex items-center justify-center">
                                <Loader2 className="w-5 h-5 animate-spin" />
                            </div> :
                            (searchedResults && searchedResults.length > 0) ?
                                <>
                                    <div className="bg-transparent">
                                        <p className="px-4 py-2 text-xs font-semibold text-muted-foreground">
                                            {AppConstants.SEARCH_RESULT_TITLE}
                                        </p>
                                        {searchedResults.map((event) => (
                                            <button
                                                key={event._id}
                                                className="w-full px-4 py-2 hover:bg-muted/50 text-left transition-colors bg-transparent"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEventClick(event.slug);
                                                }}
                                            >
                                                <div className="flex-1 min-w-0 hover:cursor-pointer">
                                                    <p className="font-medium mb-1 line-clamp-1 text-black">
                                                        {event.title}
                                                    </p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </> :
                                <p className="px-4 py-2 text-xs font-semibold text-muted-foreground">{AppConstants.NO_EVENT_FOUND_LABEL}
                                </p>}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchBarComponent;