import { Card } from "@/components/ui/card";
import { PartyPopper } from "lucide-react";
import InputButton from "../common/ButtonComponent/InputButton";
import { AppConstants } from "@/app/constants/AppConstants";

interface NoEventComponentProps {
    featuredEvents?: unknown[];
    eventsByLocation?: unknown[];
    popularEvents?: unknown[];
    expiredEvents?: unknown[];
}

const NoEventComponent = (props: NoEventComponentProps) => {
    const { featuredEvents, eventsByLocation, popularEvents, expiredEvents } = props;

    const hasNoEvents =
        (!featuredEvents || featuredEvents.length === 0) &&
        (!eventsByLocation || eventsByLocation.length === 0) &&
        (!popularEvents || popularEvents.length === 0) &&
        (!expiredEvents || expiredEvents.length === 0);

    if (!hasNoEvents) {
        return null;
    }

    return (
        <Card className="p-10 text-center bg-transparent">
            <div className="max-2-md mx-auto text-foreground flex flex-col gap-2.5 justify-center items-center">
                <PartyPopper className="h-6 w-6" />
                <h2 className="text-2xl font-bold">{AppConstants.NO_EVENT_FOUND_LABEL}</h2>
                <span className="text-muted-foreground">
                    {AppConstants.BE_FIRST_TO_CREATE_LABEL}
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
    )
}

export default NoEventComponent;
