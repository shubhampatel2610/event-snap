"use client";

import { AppConstants } from "@/app/constants/AppConstants";
import { useAppSelector } from "@/app/store/store";
import { getCategoryIcon, getCategoryLabel } from "@/app/utils/helperFunctions";
import { Badge } from "@/components/ui/badge";
import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import EventDetailsLeftSection from "./EventDetailsLeftSection";
import EventDetailsRightSection from "./EventDetailsRightSection";
import RegistrationDialogComponent from "../RegistrationDialogComponent/RegistrationDialogComponent";

const EventDetailsComponent = () => {
    const params = useParams();
    const router = useRouter();

    const { data: eventData, isLoading } = useConvexQuery(
        api.eventService.getEventBySlug,
        {
            slug: params.slug
        }
    ) as any;

    return (
        <div
            style={{
                backgroundColor: eventData?.themeColor || AppConstants.DEFAULT_COLOR
            }}
            className="min-h-screen px-10 py-8 -mt-6 md:-mt-2"
        >
            <div className="max-w-7xl mx-auto px-5">
                <div className="mb-5">
                    <Badge variant={"secondary"} className="mb-3">
                        {getCategoryIcon(eventData?.category)} {getCategoryLabel(eventData?.category)}
                    </Badge>

                    <h1 className="text-3xl md:text-4xl sm:text-5xl font-bold mb-3">{eventData?.title}</h1>

                    <div className="flex flex-wrap items-center gap-3">
                        {eventData?.startDate &&
                            <div className="flex items-center gap-1">
                                <Calendar className="w-5 h-5" />
                                <span>{format(new Date(eventData?.startDate), "EEEE, MMMM dd, yyyy")}</span>
                            </div>
                        }
                        {(eventData?.startDate || eventData?.endDate) &&
                            <div className="flex items-center gap-1">
                                <Clock className="w-5 h-5" />
                                <span>{`${format(new Date(eventData?.startDate), "h:mm a")} - ${format(new Date(eventData?.endDate), "h:mm a")}`}</span>
                            </div>
                        }
                    </div>
                </div>

                {eventData?.bannerImageUrl && (
                    <div className="relative h-60 md:h-70 rounded-2xl overflow-hidden mb-5">
                        <Image
                            src={eventData?.bannerImageUrl}
                            alt={"event-image"}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                <div className="grid md:grid-cols-[1fr_350px] gap-5">
                    <EventDetailsLeftSection eventData={eventData} />
                    <EventDetailsRightSection eventData={eventData} />
                </div>
            </div>

            <RegistrationDialogComponent eventData={eventData} />
        </div>
    )
}

export default EventDetailsComponent;