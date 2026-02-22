import { getCategoryIcon } from "@/app/utils/helperFunctions";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Users } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { EventCardComponentProps } from "./EventCardComponent";
import { AppConstants } from "@/app/constants/AppConstants";

const EventCardListComponent = (props: Omit<EventCardComponentProps, "variant">) => {
    const {
        key,
        className,
        event,
        onClick,
        onDelete,
        showActions = false
    } = props;

    return (
        <div>
            <Card className={`py-0 group cursor-pointer hover:shadow-accent transition-all hover:border-[#06B6D4] bg-transparent ${className}`} onClick={onClick}>
                <CardContent className="p-3 flex gap-2.5">
                    <div className="w-24 h-24 relative rounded-md overflow-hidden shrink-0">
                        {event.bannerImageUrl ?
                            <Image
                                src={event.bannerImageUrl}
                                alt={event.title}
                                fill
                                className="object-cover"
                            />
                            : <div
                                className="absolute inset-0 flex items-center justify-center text-2xl"
                                style={{ backgroundColor: event.themeColor || "#cccccc" }}
                            >
                                {getCategoryIcon(event.category)}
                            </div>
                        }
                    </div>

                    <div className="flex-1 min-w-0 text-start flex flex-col gap-1">
                        <h3 className="text-sm font-semibold group-hover:text-[#8B5CF6] transition-colors line-clamp-2 text-white">
                            {event.title}
                        </h3>

                        <span className="text-xs text-muted-foreground">
                            {moment(event.startDate).format("MMM D, YYYY")} at {moment(event.startDate).format("h:mm A")}
                        </span>

                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            <span className="line-clamp-1">
                                {(event?.locationType === AppConstants.ONLINE_EVENT_KEY) ?
                                    AppConstants.ONLINE_EVENT_LABEL :
                                    `${event?.city || ""}, ${event?.state || ""}, ${event?.country || ""}`}
                            </span>
                        </div>

                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Users className="w-3 h-3" />
                            <span>
                                {event?.attendeesCount || 0} {AppConstants.ATTENDEES_LABEL_POSTFIX}
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default EventCardListComponent;
