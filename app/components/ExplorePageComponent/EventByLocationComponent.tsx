import { ArrowRight } from "lucide-react";
import InputButton from "../CommonComponents/ButtonComponent/InputButton";
import { createLocationSlug } from "@/app/utils/helperFunctions";
import { useRouter } from "next/navigation";
import EventCardComponent from "../CommonComponents/EventCardComponent/EventCardComponent";
import { AppConstants } from "@/app/constants/AppConstants";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface EventByLocationComponentProps {
    eventList: any[];
    userData: any;
}

const EventByLocationComponent = (props: EventByLocationComponentProps) => {
    const router = useRouter();
    const { eventList, userData } = props;

    const createViewAllLink = (userData: any) => {
        const city = userData?.location?.city || "Ahmedabad";
        const state = userData?.location?.state || "Gujarat";

        const slug = createLocationSlug(city, state);

        return `${AppConstants.EXPLORE_ROUTE}${AppConstants.LOCATION_ROUTE}/${slug}`;
    }

    const handleEventClick = (eventSlug: string) => {
        router.push(`${AppConstants.EVENTS_ROUTE}/${eventSlug}`);
    }

    const eventCardRenderer = (event: any) => {
        return (
            <EventCardComponent
                key={event._id}
                event={event}
                variant={"grid"}
                onClick={() => handleEventClick(event.slug)}
            />
        )
    }

    return (
        <div className="flex flex-col gap-2 mt-1">
            <div className="flex text-start justify-between">
                <div className="flex flex-col gap-1">
                    <h2 className="text-3xl font-bold">
                        {AppConstants.EVENT_BY_LOCATION_HEADER}
                    </h2>
                    <span className="text-muted-foreground">
                        {`${AppConstants.EVENT_BY_LOCATION_SUBHEADER_PREFIX} ${userData?.location?.city || AppConstants.EVENT_BY_LOCATION_SUBHEADER_POSTFIX}...`}
                    </span>
                </div>
                <div>
                    <InputButton
                        className="text-black"
                        label={AppConstants.VIEW_ALL_LABEL}
                        icon={<ArrowRight className="w-4 h-4" />}
                        variant={"outline"}
                        asChild
                        size={"sm"}
                        navigateTo={createViewAllLink(userData)}
                    />
                </div>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {eventList.slice(0, 4).map((event) => (
                    eventCardRenderer(event)
                ))}
            </div>
        </div>
    )
}

export default EventByLocationComponent;