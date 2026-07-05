/* eslint-disable @typescript-eslint/no-explicit-any */
import EventCardComponent from "../common/EventCardComponent/EventCardComponent";
import { AppConstants } from "@/app/constants/AppConstants";

interface PopularEventsProps {
    popularEvents: any[];
}

const PopularEventsComponent = (props: PopularEventsProps) => {
    const { popularEvents } = props;

    const popularEventsRenderer = (event: any) => {
        return (
            <EventCardComponent
                key={event._id}
                event={event}
                variant={"list"}
                href={`${AppConstants.EVENTS_ROUTE}/${event.slug}`}
            />
        );
    }

    return (
        <div className="flex flex-col gap-3 mt-5">
            <h2 className="text-2xl font-bold">{AppConstants.POPULAR_EVENTS_HEADER}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {popularEvents?.length > 0 &&
                    popularEvents.map((event: any) => popularEventsRenderer(event))
                }
            </div>
        </div>
    )
}

export default PopularEventsComponent;
