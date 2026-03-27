"use client";

import { AppConstants } from "@/app/constants/AppConstants";
import { api } from "@/convex/_generated/api";
import { useConvexMutations, useConvexQuery } from "@/hooks/use-convex-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import EventCardComponent from "../common/EventCardComponent/EventCardComponent";
import NoEventComponent from "../ExplorePageComponent/NoEventComponent";

const MyEventsComponent = () => {
    const router = useRouter();

    const { data: myEventsData, isLoading } = useConvexQuery(api.eventService.getMyEventsDetails) as any;
    const { mutateData: deleteEvent } = useConvexMutations(api.eventService.deleteEvent);

    const deleteMyEvent = async (eventId: any) => {
        try {
            await deleteEvent({ eventId });
            toast.success(AppConstants.DELETE_EVENT_SUCCESS);
        } catch (error: any) {
            toast.error(error.message || AppConstants.DELETE_EVENT_ERROR);
        }
    }

    const handleEventClick = (eventId: any) => {
        router.push(`${AppConstants.MY_EVENTS_ROUTE}/${eventId}`);
    }

    return (
        <div className="min-h-screen pb-10 px-3">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between mb-5">
                    <div>
                        <h1 className="text-3xl font-bold mb-1">{AppConstants.MY_EVENTS_HEADER}</h1>
                        <p className="text-muted-foreground">{AppConstants.MY_EVENTS_SUBHEADER}</p>
                    </div>
                </div>

                {(myEventsData?.length > 0) ? <div className="grid md:grid-cols-3 sm:cols-2 gap-3">
                    {myEventsData.map((event: any) =>
                        <EventCardComponent
                            event={event}
                            variant="grid"
                            showActions={"event"}
                            onClick={() => handleEventClick(event?._id)}
                            onDelete={() => deleteMyEvent?.(event?._id)}
                        />
                    )}
                </div> : <NoEventComponent />}
            </div>
        </div>
    )
}

export default MyEventsComponent;