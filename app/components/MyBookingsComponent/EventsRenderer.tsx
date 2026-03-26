import EventCardComponent from "../common/EventCardComponent/EventCardComponent";

interface ComponentProps {
    header: string,
    eventData: any,
    deleteRegistration?: (id: any) => void,
    showActions?: boolean
}

const EventsRenderer = (props: ComponentProps) => {
    const { header, eventData, deleteRegistration, showActions } = props;

    return (
        <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-3">{header}</h2>
            <div className="grid grid-cols-3 sm:cols-2 gap-3">
                {eventData.map((event: any) =>
                    <EventCardComponent
                        event={event.eventData}
                        variant="grid"
                        showActions={showActions ? "booking" : ""}
                        onClick={() => { }}
                        onDelete={() => deleteRegistration?.(event?._id)}
                    />
                )}
            </div>
        </div>
    )
}

export default EventsRenderer;