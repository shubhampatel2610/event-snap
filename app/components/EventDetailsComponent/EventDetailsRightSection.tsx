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
import InputButton from "../common/ButtonComponent/InputButton";
import { useUser } from "@clerk/nextjs";
import { Doc } from "@/convex/_generated/dataModel";

interface ComponentProps {
    eventData: any,
}

const EventDetailsRightSection = (props: ComponentProps) => {
    const { eventData } = props;
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { data: userData } = useConvexQuery(api.users.getCurrentUserData) as any;

    const { data: registrationData } = useConvexQuery(
        api.registrationService.checkForUserRegistration,
        eventData?._id ? { eventId: eventData?._id } : "skip"
    );

    const isEventFull = eventData?.registrationCount >= eventData?.capacity;
    const isEventEnded = eventData?.endDate < Date.now();
    const isOrganizer = userData?._id === eventData?.organizerId;

    const handleRegister = () => {
        if (!userData) {
            toast.error(AppConstants.SIGNIN_REQUEST);
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
            toast.success(AppConstants.CLIPBOARD_COPY_TEXT);
        }
    };

    return (
        <div className="md:sticky md:top-24 h-fit">
            <div className="space-y-5">
                <Card
                    className={`overflow-hidden py-0`}
                    style={{
                        backgroundColor: eventData?.themeColor
                            ? darkenColor(eventData?.themeColor, 0.04)
                            : AppConstants.DEFAULT_COLOR,
                    }}
                >
                    <CardContent className="p-6 space-y-4">
                        <div>
                            <p className="text-sm text-white mb-1">{AppConstants.PRICE_TITLE}</p>
                            <p className="text-[#c0c0c0] text-3xl font-bold">
                                {eventData?.isFree
                                    ? AppConstants.FREE_LABEL
                                    : `₹${eventData?.ticketPrice && eventData?.ticketPrice}`}
                            </p>
                            {!eventData?.isFree && (
                                <p className="text-[#c0c0c0] text-xs mt-1">
                                    {AppConstants.PAY_AT_VENUE_TEXT}
                                </p>
                            )}
                        </div>

                        <Separator />

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-white">
                                    <Users className="w-4 h-4" />
                                    <span className="text-sm">{AppConstants.ATTENDEES_TITLE}</span>
                                </div>
                                <p className="font-semibold text-[#c0c0c0]">
                                    {eventData?.registrationCount} / {eventData?.capacity}
                                </p>
                            </div>

                            {eventData?.startDate && <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-white">
                                    <Calendar className="w-4 h-4" />
                                    <span className="text-sm">{AppConstants.DATE_TITLE}</span>
                                </div>
                                <p className="font-semibold text-sm text-[#c0c0c0]">
                                    {format(new Date(eventData?.startDate), "MMM dd")}
                                </p>
                            </div>}

                            {eventData?.startDate && <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-white">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-sm">{AppConstants.TIME_TITLE}</span>
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
                                        {AppConstants.ALREADY_REGISTERED_TEXT}
                                    </span>
                                </div>
                                <InputButton
                                    className="w-full gap-2"
                                    onClick={() => router.push(AppConstants.MY_BOOKINGS_ROUTE)}
                                    icon={<Ticket className="w-4 h-4" />}
                                    label={AppConstants.VIEW_LABEL}
                                />
                            </div>
                        ) : isEventEnded ? (
                            <Button className="w-full" disabled>
                                {AppConstants.EVENT_ENDED_TEXT}
                            </Button>
                        ) : isEventFull ? (
                            <Button className="w-full" disabled>
                                {AppConstants.EVENT_FULL_TEXT}
                            </Button>
                        ) : isOrganizer ? (
                            <InputButton
                                className="w-full"
                                onClick={() => router.push(`${AppConstants.EVENTS_ROUTE}/${eventData?.slug}${AppConstants.MANAGE_ROUTE}`)}
                                label={AppConstants.MANAGE_EVENT_LABEL}
                            />
                        ) : (
                            <InputButton
                                className="w-full gap-2"
                                onClick={handleRegister}
                                icon={<Ticket className="w-4 h-4" />}
                                label={AppConstants.REGISTER_LABEL}
                            />
                        )}

                        <InputButton
                            variant="outline"
                            className="w-full gap-2"
                            onClick={handleShare}
                            icon={<Share2 className="w-4 h-4" />}
                            label={AppConstants.SHARE_LABEL}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default EventDetailsRightSection;
