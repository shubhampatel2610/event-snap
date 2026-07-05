/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCategoryIcon, getCategoryLabel } from "@/app/utils/helperFunctions";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Eye, MapPin, Ticket, Trash, Users } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { EventCardComponentProps } from "./EventCardComponent";
import { Badge } from "@/components/ui/badge";
import InputButton from "../ButtonComponent/InputButton";
import { AppConstants } from "@/app/constants/AppConstants";

const EventCardGridComponent = (props: Omit<EventCardComponentProps, "variant">) => {
    const {
        className,
        event,
        href,
        onClick,
        onDelete,
        showActions,
        restrictCardClick
    } = props;

    const renderActions = (event: any, href: string | undefined, onClick: any, onDelete?: any) => {
        return (
            <div className="relative z-10 flex items-center gap-2 mt-auto">
                <InputButton
                    className="bg-transparent text-foreground flex-1 hover:bg-secondary"
                    variant="outline"
                    size="lg"
                    navigateTo={href}
                    asChild={!!href}
                    onClick={href ? undefined : (e: any) => {
                        e.stopPropagation();
                        onClick(e);
                    }}
                    label={AppConstants.VIEW_LABEL}
                    icon={(showActions === "event") ? <Eye className="w-4 h-4" /> : <Ticket className="w-4 h-4" />}
                />

                {onDelete && (
                    <InputButton
                        className="bg-transparent text-red-500 hover:text-red-600 hover:bg-red-100 border-red-500"
                        variant="outline"
                        size="icon"
                        onClick={(e: any) => {
                            e.stopPropagation();
                            onDelete();
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
            <Card className={`relative pt-0 overflow-hidden h-full group bg-transparent ${(href || onClick) ? "hover:shadow-accent transition-all hover:border-primary" : ""} ${className}`} onClick={!restrictCardClick ? onClick : undefined}>
                {href && !restrictCardClick && (
                    <Link href={href} className="absolute inset-0 z-0" aria-label={event.title} />
                )}

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

                <CardContent className="px-2 flex flex-col">
                    <div className="flex flex-col gap-1 min-w-0 text-start w-full">
                        <Badge variant={"outline"} className="text-foreground">
                            {getCategoryIcon(event.category)} {getCategoryLabel(event.category)}
                        </Badge>

                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2 text-foreground">
                            {event.title}
                        </h3>

                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {event.startDate && `${format(new Date(event.startDate), "MMM d, yyyy")} - ${format(new Date(event.startDate), "h:mm a")}`}
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

                        {showActions && renderActions(event, href, onClick, onDelete)}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default EventCardGridComponent;
