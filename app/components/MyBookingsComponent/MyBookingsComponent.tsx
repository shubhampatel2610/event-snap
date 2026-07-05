"use client";

import { api } from "@/convex/_generated/api";
import { useConvexMutations, useConvexQuery } from "@/hooks/use-convex-query";
import EventsRenderer from "./EventsRenderer";
import { toast } from "sonner";
import InputButton from "../common/ButtonComponent/InputButton";
import { AppConstants } from "@/app/constants/AppConstants";
import { Skeleton } from "@/components/ui/skeleton";

const MyBookingsComponent = () => {
    const {
        data: registrationData,
        isLoading
    } = useConvexQuery(api.registrationService.getUserRegistrations) as any;

    const {
        mutateData: cancelRegistration,
        isLoading: cancelLoading
    } = useConvexMutations(api.registrationService.cancelUserRegistration);

    const currentDate = Date.now();

    const upcomingEvents = registrationData?.filter((regData: any) =>
        regData.eventData &&
        (regData.eventData.startDate >= currentDate || (regData.eventData.startDate <= currentDate && regData.eventData.endDate >= currentDate)) &&
        regData.status === "confirmed"
    );

    const pastEvents = registrationData?.filter((regData: any) =>
        regData.eventData && (regData.eventData.endDate < currentDate || regData.status === "cancelled")
    );

    const deleteRegistration = async (registrationId: any) => {
        try {
            await cancelRegistration({ registrationId });
            toast.success(AppConstants.CANCEL_REGISTRATION_SUCCESS);
        } catch (error: any) {
            toast.error(error.message || AppConstants.CANCEL_REGISTRATION_ERROR);
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen pb-10 px-3">
                <div className="max-w-7xl mx-auto flex flex-col gap-3">
                    <Skeleton className="h-8 w-56" />
                    <Skeleton className="h-5 w-72" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <Skeleton key={i} className="h-56 w-full rounded-xl" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-10 px-3">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between mb-5">
                    <div>
                        <h1 className="text-3xl font-bold mb-1">{AppConstants.MY_BOOKINGS_HEADER}</h1>
                        <p className="text-muted-foreground">{AppConstants.MY_BOOKINGS_SUBHEADER}</p>
                    </div>
                    <InputButton
                        label={AppConstants.BROWSE_EVENTS_LABEL}
                        navigateTo={AppConstants.EXPLORE_ROUTE}
                        asChild
                        variant="link"
                        className="text-muted-foreground"
                    />
                </div>

                {upcomingEvents?.length > 0 &&
                    <EventsRenderer
                        eventData={upcomingEvents}
                        header={AppConstants.UPCOMING_EVENTS_HEADER}
                        deleteRegistration={deleteRegistration}
                        showActions
                    />
                }

                {pastEvents?.length > 0 &&
                    <EventsRenderer
                        eventData={pastEvents}
                        header={AppConstants.PAST_EVENTS_HEADER}
                    />
                }
            </div>
        </div>
    )
}

export default MyBookingsComponent;