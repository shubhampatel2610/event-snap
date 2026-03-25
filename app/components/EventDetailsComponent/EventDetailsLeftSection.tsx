import { AppConstants } from "@/app/constants/AppConstants";
import { darkenColor } from "@/app/utils/helperFunctions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, MapPin } from "lucide-react";

interface ComponentProps {
    eventData: any
}

const EventDetailsLeftSection = (props: ComponentProps) => {
    const { eventData } = props;

    return (
        <div className="space-y-5">
            <Card
                className={"pt-0"}
                style={{
                    backgroundColor: eventData.themeColor
                        ? darkenColor(eventData.themeColor, 0.04)
                        : AppConstants.DEFAULT_COLOR,
                }}
            >
                <CardContent className="pt-6">
                    <h2 className="text-white text-2xl font-bold mb-4">About This Event</h2>
                    <p className="text-[#c0c0c0] whitespace-pre-wrap leading-relaxed">
                        {eventData.description}
                    </p>
                </CardContent>
            </Card>

            <Card
                className={"pt-0"}
                style={{
                    backgroundColor: eventData.themeColor
                        ? darkenColor(eventData.themeColor, 0.04)
                        : AppConstants.DEFAULT_COLOR,
                }}
            >
                <CardContent className="pt-6">
                    <h2 className="text-white text-2xl font-bold mb-4 flex items-center gap-2">
                        <MapPin className="w-6 h-6" />
                        Location
                    </h2>

                    <div className="text-[#c0c0c0] space-y-3">
                        <p className="font-medium">
                            {eventData.city}, {eventData.state || eventData.country}
                        </p>
                        {eventData.address && (
                            <p className="text-sm">
                                {eventData.address}
                            </p>
                        )}
                        {eventData.venueName && (
                            <Button variant="outline" asChild className="gap-2 text-black">
                                <a
                                    href={eventData.venueName}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View on Map
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Card
                className={"pt-0"}
                style={{
                    backgroundColor: eventData.themeColor
                        ? darkenColor(eventData.themeColor, 0.04)
                        : AppConstants.DEFAULT_COLOR,
                }}
            >
                <CardContent className="pt-6">
                    <h2 className="text-white text-2xl font-bold mb-4">Organizer</h2>
                    <div className="text-[#c0c0c0] flex items-center gap-3">
                        <Avatar className="w-12 h-12 text-black">
                            <AvatarImage src="" />
                            <AvatarFallback>
                                {eventData.organizerName?.charAt(0)?.toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-white font-semibold">{eventData.organizerName}</p>
                            <p className="text-sm text-[#c0c0c0]">
                                Event Organizer
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default EventDetailsLeftSection;