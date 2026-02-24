/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from "@/app/store/store";
import EventCardComponent from "../CommonComponents/EventCardComponent/EventCardComponent";
import { AppConstants } from "@/app/constants/AppConstants";

interface PopularEventsProps {
    handleEventClick: (slug: string) => void;
}

const PopularEventsComponent = (props: PopularEventsProps) => {
    const { handleEventClick } = props;

    const popularEvents = useAppSelector((state) => state.event.popularEvents);

    const popularEventsRenderer = (event: any) => {
        return (
            <>
                <EventCardComponent
                    key={event.id}
                    event={event}
                    variant={"list"}
                    onClick={() => handleEventClick(event.slug)}
                />
            </>
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