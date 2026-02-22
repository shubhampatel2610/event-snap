/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCategoryIcon, getCategoryLabel } from "@/app/utils/helperFunctions";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Trash, Trash2, Users } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { EventCardComponentProps } from "./EventCardComponent";
import { Badge } from "@/components/ui/badge";
import InputButton from "../ButtonComponent/InputButton";
import { AppConstants } from "@/app/constants/AppConstants";

const EventCardGridComponent = (props: Omit<EventCardComponentProps, "variant">) => {
    const {
        key,
        className,
        event,
        onClick,
        onDelete,
        showActions = false
    } = props;

    const renderActions = (event: any, onClick: any, onDelete?: any) => {
        return (
            <div className="flex items-center gap-2">
                <InputButton
                    className="bg-transparent text-white flex-1 hover:text-black hover:bg-gray-200"
                    variant="outline"
                    size="lg"
                    onClick={(e: any) => {
                        e.stopPropagation();
                        onClick(e);
                    }}
                    label={AppConstants.VIEW_LABEL}
                />

                {onDelete && (
                    <InputButton
                        className="bg-transparent text-red-500 hover:text-red-600 hover:bg-red-100 border-red-500"
                        variant="outline"
                        size="icon"
                        onClick={(e: any) => {
                            e.stopPropagation();
                            onDelete(event._id);
                        }}
                        label=""
                        icon={<Trash className="w-4 h-4 text-red-500" />}
                    />
                )}
            </div>
        )
    }

    return (
        <div>
            <Card className={`pt-0 overflow-hidden group bg-transparent ${onClick ? "hover:shadow-accent transition-all hover:border-[#06B6D4]" : ""} ${className}`} onClick={onClick}>
                <div className="relative h-40 overflow-hidden">
                    {event.bannerImageUrl ?
                        <Image
                            src={event.bannerImageUrl}
                            alt={event.title}
                            fill
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                        />
                        : <div
                            className="absolute inset-0 flex items-center justify-center text-2xl"
                            style={{ backgroundColor: event.themeColor || "#cccccc" }}
                        >
                            {getCategoryIcon(event.category)}
                        </div>
                    }

                    <div className="absolute top-2 right-2">
                        <Badge variant={"secondary"}>
                            {event?.isFree ? AppConstants.FREE_LABEL : AppConstants.PAID_LABEL}
                        </Badge>
                    </div>
                </div>

                <CardContent className="px-2 flex gap-2.5">
                    <div className="flex flex-col gap-1 min-w-0 text-start">
                        <Badge variant={"outline"} className="text-white">
                            {getCategoryIcon(event.category)} {getCategoryLabel(event.category)}
                        </Badge>

                        <h3 className="text-lg font-semibold group-hover:text-[#8B5CF6] transition-colors line-clamp-2 text-white">
                            {event.title}
                        </h3>

                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {moment(event.startDate).format("MMM D, YYYY")} - {moment(event.startDate).format("h:mm A")}
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
                                {event?.registrationCount} / {event?.capacity} {AppConstants.REGISTERED_LABEL_POSTFIX}
                            </span>
                        </div>

                        {showActions && renderActions(event, onClick, onDelete)}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default EventCardGridComponent;
