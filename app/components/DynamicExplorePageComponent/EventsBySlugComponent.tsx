/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppConstants } from "@/app/constants/AppConstants";
import EventCardComponent from "../CommonComponents/EventCardComponent/EventCardComponent";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/store/store";
import { MapPin } from "lucide-react";

interface EventBySlugProps {
    slugType: "category" | "location",
    slugTypeDetails: any
}

const EventsBySlugComponent = (props: EventBySlugProps) => {
    const { slugType, slugTypeDetails } = props;
    const router = useRouter();
    const eventsByCategory = useAppSelector((state) => state.event.eventsByCategory);
    const eventsByLocation = useAppSelector((state) => state.event.eventsByLocation);
    const eventData = (slugType === AppConstants.CATEGORY_SLUG_KEY) ? eventsByCategory : eventsByLocation;

    const handleEventClick = (eventSlug: string) => {
        router.push(`${AppConstants.EVENTS_ROUTE}/${eventSlug}`);
    }

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
                                key={event.id}
                                event={event}
                                onClick={() => handleEventClick(event.slug)}
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