"use client";

import { api } from "@/convex/_generated/api";
import { useConvexMutations, useConvexQuery } from "@/hooks/use-convex-query";
import { useRouter } from "next/navigation";
import EventsRenderer from "./EventsRenderer";
import { toast } from "sonner";
import InputButton from "../common/ButtonComponent/InputButton";
import { AppConstants } from "@/app/constants/AppConstants";

const MyBookingsComponent = () => {
    const router = useRouter();

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
        regData.eventData && regData.eventData.startDate >= currentDate && regData.status === "confirmed"
    );

    const pastEvents = registrationData?.filter((regData: any) =>
        regData.eventData && (regData.eventData.startDate < currentDate || regData.status === "cancelled")
    );

    const deleteRegistration = async (registrationId: any) => {
        try {
            await cancelRegistration({ registrationId });
            toast.success(AppConstants.CANCEL_REGISTRATION_SUCCESS);
        } catch (error: any) {
            toast.error(error.message || AppConstants.CANCEL_REGISTRATION_ERROR);
        }
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
                        onClick={() => router.push(AppConstants.EXPLORE_ROUTE)}
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