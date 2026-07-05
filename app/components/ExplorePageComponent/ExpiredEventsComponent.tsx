/* eslint-disable @typescript-eslint/no-explicit-any */
import EventCardComponent from "../common/EventCardComponent/EventCardComponent";
import { AppConstants } from "@/app/constants/AppConstants";
import { Badge } from "@/components/ui/badge";

interface ExpiredEventsComponentProps {
    expiredEvents: any[];
}

const ExpiredEventsComponent = (props: ExpiredEventsComponentProps) => {
    const { expiredEvents } = props;

    const expiredEventRenderer = (event: any) => {
        return (
            <div key={event._id} className="relative">
                <div className="absolute top-2 left-2 z-10">
                    <Badge variant={"destructive"}>{AppConstants.EXPIRED_LABEL}</Badge>
                </div>
                <EventCardComponent
                    event={event}
                    variant={"grid"}
                    className="opacity-75"
                    href={`${AppConstants.EVENTS_ROUTE}/${event.slug}`}
                />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2 mt-1 text-start">
            <h2 className="text-3xl font-bold">{AppConstants.EXPIRED_EVENTS_HEADER}</h2>
            <span className="text-muted-foreground">{AppConstants.EXPIRED_EVENTS_SUBHEADER}</span>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                {expiredEvents?.length > 0 &&
                    expiredEvents.map((event: any) => expiredEventRenderer(event))
                }
            </div>
        </div>
    )
}

export default ExpiredEventsComponent;
