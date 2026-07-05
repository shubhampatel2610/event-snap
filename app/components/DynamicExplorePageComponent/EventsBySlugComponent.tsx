/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AppConstants } from "@/app/constants/AppConstants";
import EventCardComponent from "../common/EventCardComponent/EventCardComponent";
import { MapPin } from "lucide-react";

interface EventBySlugProps {
    slugType: "category" | "location";
    slugTypeDetails: any;
    preloaded:
        | Preloaded<typeof api.eventService.getEventsByCategory>
        | Preloaded<typeof api.eventService.getEventsByLocation>;
}

const EventsBySlugComponent = (props: EventBySlugProps) => {
    const { slugType, slugTypeDetails, preloaded } = props;
    const eventData = usePreloadedQuery(preloaded as Preloaded<typeof api.eventService.getEventsByCategory>) as any[];

    return (
        <div className="mt-2.5 flex flex-col gap-3">
            <div className="flex gap-3 items-start">
                <div className="text-5xl">
                    {(slugType === AppConstants.CATEGORY_SLUG_KEY) ? slugTypeDetails.icon : <MapPin className="h-15 w-15" />}
                </div>
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold">
                        {(slugType === AppConstants.CATEGORY_SLUG_KEY) ? slugTypeDetails.label : `Events in ${slugTypeDetails.city}`}
                    </h1>
                    <span className="text-lg text-muted-foreground">
                        {(slugType === AppConstants.CATEGORY_SLUG_KEY) ? slugTypeDetails.description : slugTypeDetails.state}
                    </span>
                </div>
            </div>

            {eventData && eventData.length > 0 ?
                <>
                    <span className="text-muted-foreground">
                        {`${eventData.length} ${eventData.length <= 1 ? AppConstants.EVENT_SINGULAR_LABEL : AppConstants.EVENT_PLURAL_LABEL} ${AppConstants.FOUND_LABEL}`}
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {eventData.map((event: any) => (
                            <EventCardComponent
                                key={event._id}
                                event={event}
                                href={`${AppConstants.EVENTS_ROUTE}/${event.slug}`}
                                variant={"grid"}
                            />
                        ))}

                    </div>
                </> :
                <span className="text-muted-foreground">
                    {AppConstants.NO_EVENT_FOR_CATEGORY_LABEL}
                </span>
            }
        </div>
    )
}

export default EventsBySlugComponent;
