"use client";

import { AppConstants } from "@/app/constants/AppConstants";
import { setShowRegistrationPopup } from "@/app/store/eventSlice";
import { useAppDispatch } from "@/app/store/store";
import { darkenColor } from "@/app/utils/helperFunctions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { format } from "date-fns";
import { Calendar, CheckCircle, Clock, Share2, Ticket, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ComponentProps {
    eventData: any,
    userData: any
}

const EventDetailsRightSection = (props: ComponentProps) => {
    const { eventData, userData } = props;
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { data: registrationData } = useConvexQuery(
        api.registrationService.checkForUserRegistration,
        eventData?._id ? { eventId: eventData._id } : "skip"
    );

    const isEventFull = eventData.registrationCount >= eventData.capacity;
    const isEventEnded = eventData.endDate < Date.now();
    const isOrganizer = userData?.id === eventData.organizerId;

    const handleRegister = () => {
        if (!userData) {
            toast.error("Please sign in to register");
            return;
        }
        dispatch(setShowRegistrationPopup(true));
    };

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: eventData?.title,
                    text: eventData?.description?.slice(0, 100) + "...",
                    url: url,
                });
            } catch (error) {
            }
        } else {
            navigator.clipboard.writeText(url);
            toast.success("Link copied to clipboard!");
        }
    };

    return (
        <div className="md:sticky md:top-24 h-fit">
            <div className="space-y-5">
                <Card
                    className={`overflow-hidden py-0`}
                    style={{
                        backgroundColor: eventData.themeColor
                            ? darkenColor(eventData.themeColor, 0.04)
                            : AppConstants.DEFAULT_COLOR,
                    }}
                >
                    <CardContent className="p-6 space-y-4">
                        <div>
                            <p className="text-sm text-white mb-1">Price</p>
                            <p className="text-[#c0c0c0] text-3xl font-bold">
                                {eventData.isFree
                                    ? "Free"
                                    : `₹${eventData.ticketPrice}`}
                            </p>
                            {!eventData.isFree && (
                                <p className="text-[#c0c0c0] text-xs mt-1">
                                    Pay at venue
                                </p>
                            )}
                        </div>

                        <Separator />

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-white">
                                    <Users className="w-4 h-4" />
                                    <span className="text-sm">Attendees</span>
                                </div>
                                <p className="font-semibold text-[#c0c0c0]">
                                    {eventData.registrationCount} / {eventData.capacity}
                                </p>
                            </div>

                            {eventData.startDate && <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-white">
                                    <Calendar className="w-4 h-4" />
                                    <span className="text-sm">Date</span>
                                </div>
                                <p className="font-semibold text-sm text-[#c0c0c0]">
                                    {format(new Date(eventData?.startDate), "MMM dd")}
                                </p>
                            </div>}

                            {eventData.startDate && <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-white">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-sm">Time</span>
                                </div>
                                <p className="font-semibold text-sm text-[#c0c0c0]">
                                    {format(new Date(eventData?.startDate), "h:mm a")}
                                </p>
                            </div>}
                        </div>

                        <Separator />

                        {registrationData ? (
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                                    <CheckCircle className="w-5 h-5" />
                                    <span className="font-medium">
                                        You&apos;re registered!
                                    </span>
                                </div>
                                <Button
                                    className="w-full gap-2"
                                    onClick={() => router.push("/my-tickets")}
                                >
                                    <Ticket className="w-4 h-4" />
                                    View Ticket
                                </Button>
                            </div>
                        ) : isEventEnded ? (
                            <Button className="w-full" disabled>
                                Event Ended
                            </Button>
                        ) : isEventFull ? (
                            <Button className="w-full" disabled>
                                Event Full
                            </Button>
                        ) : isOrganizer ? (
                            <Button
                                className="w-full"
                                onClick={() => router.push(`/events/${eventData.slug}/manage`)}
                            >
                                Manage Event
                            </Button>
                        ) : (
                            <Button className="w-full gap-2" onClick={handleRegister}>
                                <Ticket className="w-4 h-4" />
                                Register
                            </Button>
                        )}

                        <Button
                            variant="outline"
                            className="w-full gap-2"
                            onClick={handleShare}
                        >
                            <Share2 className="w-4 h-4" />
                            Share
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default EventDetailsRightSection;
