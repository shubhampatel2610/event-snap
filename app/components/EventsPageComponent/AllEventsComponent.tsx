/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AppConstants } from "@/app/constants/AppConstants";
import { Card } from "@/components/ui/card";
import { PartyPopper } from "lucide-react";
import EventCardComponent from "../common/EventCardComponent/EventCardComponent";
import InputButton from "../common/ButtonComponent/InputButton";

interface AllEventsComponentProps {
    preloaded: Preloaded<typeof api.eventService.getAllUpcomingEvents>;
}

const AllEventsComponent = (props: AllEventsComponentProps) => {
    const { preloaded } = props;
    const events = usePreloadedQuery(preloaded) as any[];

    return (
        <div className="px-4 md:px-10 py-5 flex flex-col gap-5">
            <div className="w-full flex flex-col gap-2.5 text-center">
                <h1 className="text-4xl sm:text-5xl md:text-5xl font-bold">
                    {AppConstants.ALL_EVENTS_HEADER}
                </h1>
                <span className="text-1xl text-muted-foreground">
                    {AppConstants.ALL_EVENTS_SUBHEADER}
                </span>
            </div>

            {events && events.length > 0 ? (
                <>
                    <span className="text-muted-foreground text-start">
                        {`${events.length} ${events.length <= 1 ? AppConstants.EVENT_SINGULAR_LABEL : AppConstants.EVENT_PLURAL_LABEL} ${AppConstants.FOUND_LABEL}`}
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map((event: any) => (
                            <EventCardComponent
                                key={event._id}
                                event={event}
                                variant={"grid"}
                                href={`${AppConstants.EVENTS_ROUTE}/${event.slug}`}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <Card className="p-10 text-center bg-transparent">
                    <div className="max-2-md mx-auto text-foreground flex flex-col gap-2.5 justify-center items-center">
                        <PartyPopper className="h-6 w-6" />
                        <h2 className="text-2xl font-bold">{AppConstants.NO_UPCOMING_EVENTS_LABEL}</h2>
                        <span className="text-muted-foreground">
                            {AppConstants.CHECK_BACK_LATER_LABEL}
                        </span>
                        <InputButton
                            label={AppConstants.CREATE_EVENT_BTN_LABEL}
                            navigateTo={AppConstants.CREATE_EVENT_ROUTE}
                            asChild
                            variant={"outline"}
                            size={"sm"}
                        />
                    </div>
                </Card>
            )}
        </div>
    );
};

export default AllEventsComponent;
