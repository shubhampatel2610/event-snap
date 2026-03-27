import { useAppDispatch } from "@/app/store/store";
import EventCardComponent from "../common/EventCardComponent/EventCardComponent";
import MyTicketDialogComponent from "../MyTicketDialogComponent/MyTicketDialogComponent";
import { setShowMyTicketPopup, setShowTicketData } from "@/app/store/eventSlice";

interface ComponentProps {
    header: string,
    eventData: any,
    deleteRegistration?: (id: any) => void,
    showActions?: boolean
}

const EventsRenderer = (props: ComponentProps) => {
    const { header, eventData, deleteRegistration, showActions } = props;
    const dispatch = useAppDispatch();

    const onEventClick = (event: any) => {
        dispatch(setShowMyTicketPopup(true));
        dispatch(setShowTicketData(event));
    }

    return (
        <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-3">{header}</h2>
            <div className="grid grid-cols-3 sm:cols-2 gap-3">
                {eventData.map((event: any) =>
                    <EventCardComponent
                        event={event.eventData}
                        variant="grid"
                        showActions={showActions ? "booking" : ""}
                        onClick={() => onEventClick(event)}
                        onDelete={() => deleteRegistration?.(event?._id)}
                        restrictCardClick
                    />
                )}
            </div>
            <MyTicketDialogComponent />
        </div>
    )
}

export default EventsRenderer;