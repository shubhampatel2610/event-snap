"use client";

import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { setCheckTicketVerification } from "@/app/store/eventSlice";
import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { useParams, useRouter } from "next/navigation";
import InputButton from "../common/ButtonComponent/InputButton";
import { ArrowLeft, Calendar, Clock, Eye, MapPin, Ticket } from "lucide-react";
import { AppConstants } from "@/app/constants/AppConstants";
import Image from "next/image";
import { getCategoryIcon, getCategoryLabel } from "@/app/utils/helperFunctions";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import DashboardStatsComponent from "./DashboardStatsComponent";
import AttendeeManagementComponent from "./AttendeeManagementComponent";

const EventDashboardComponent = () => {
    const params = useParams();
    const router = useRouter();
    const { eventId } = params;
    const dispatch = useAppDispatch();

    const checkTicketVerification = useAppSelector((state) => state.event.checkTicketVerification);

    const { data: selectedEventData, isLoading } = useConvexQuery(api.eventService.getEventById, { eventId }) as any;

    const { data: registrationsData } = useConvexQuery(api.registrationService.getEventRegistrations, { eventId }) as any;

    const { eventData, statistics } = selectedEventData || {};

    return (
        <div className="min-h-screen pb-10 px-3">
            <div className="max-w-7xl mx-auto px-5 space-y-4">
                <div>
                    <InputButton
                        label="Back"
                        className="text-white px-0 my-2"
                        icon={<ArrowLeft />}
                        variant={"link"}
                        navigateTo={AppConstants.MY_EVENTS_ROUTE}
                        size={"sm"}
                        asChild
                    />
                </div>

                {eventData?.bannerImageUrl && (
                    <div className="relative h-60 md:h-70 rounded-2xl overflow-hidden">
                        <Image
                            src={eventData?.bannerImageUrl}
                            alt={"event-image"}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                <div className="flex flex-col gap-1 item-center justify-between flex-1">
                    <h1 className="text-3xl md:text-4xl sm:text-5xl font-bold mb-3">{eventData?.title}</h1>

                    <div className="flex justify-between">
                        <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                            {eventData?.category && <Badge variant={"secondary"} className="mb-3 items-center">
                                {getCategoryIcon(eventData?.category)} {getCategoryLabel(eventData?.category)}
                            </Badge>}

                            <div className="flex flex-wrap gap-3 items-center">
                                {(eventData?.startDate || eventData?.endDate) &&
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-5 h-5" />
                                        <span>{`${format(new Date(eventData?.startDate), "MMMM dd, yyyy")} - ${format(new Date(eventData?.endDate), "MMMM dd, yyyy")}`}</span>
                                    </div>
                                }
                                {(eventData?.startDate || eventData?.endDate) &&
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-5 h-5" />
                                        <span>{`${format(new Date(eventData?.startDate), "h:mm a")} - ${format(new Date(eventData?.endDate), "h:mm a")}`}</span>
                                    </div>
                                }
                            </div>

                            {(eventData?.city) && <div className="flex flex-wrap gap-3 items-center">
                                <MapPin className="w-5 h-5" />
                                <span className="line-clamp-1">
                                    {(eventData?.locationType === AppConstants.ONLINE_EVENT_KEY) ?
                                        AppConstants.ONLINE_EVENT_LABEL :
                                        `${eventData?.city || ""}, ${eventData?.state || ""}, ${eventData?.country || ""}`}
                                </span>
                            </div>}
                        </div>

                        <InputButton
                            variant="secondary"
                            onClick={() => router.push(AppConstants.EVENTS_ROUTE + `/${eventData?.slug}`)}
                            icon={<Eye className="w-4 h-4" />}
                            label={AppConstants.VIEW_LABEL}
                        />
                    </div>
                </div>

                {(statistics?.isStartingToday && !statistics?.isPastEvent) && (
                    <InputButton
                        variant="outline"
                        className="text-black"
                        onClick={() => dispatch(setCheckTicketVerification(true))}
                        icon={<Ticket className="w-4 h-4" />}
                        label={AppConstants.VERIFY_TICKET_LABEL}
                    />
                )}

                {selectedEventData && <DashboardStatsComponent
                    statistics={statistics}
                    eventData={eventData}
                />}

                <AttendeeManagementComponent
                    registrationsData={registrationsData}
                    statistics={statistics}
                />
            </div>
        </div>
    )
}

export default EventDashboardComponent;