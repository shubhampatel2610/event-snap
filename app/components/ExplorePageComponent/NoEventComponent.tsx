import { useAppSelector } from "@/app/store/store";
import { Card } from "@/components/ui/card";
import { PartyPopper } from "lucide-react";
import InputButton from "../CommonComponents/ButtonComponent/InputButton";
import { AppConstants } from "@/app/constants/AppConstants";

const NoEventComponent = () => {
    const featuredEvents = useAppSelector((state) => state.event.featuredEvents);
    const eventsByLocation = useAppSelector((state) => state.event.eventsByLocation);
    const popularEvents = useAppSelector((state) => state.event.popularEvents);

    return (
        <>
            {
                (
                    (!featuredEvents || featuredEvents.length === 0) &&
                    (!eventsByLocation || eventsByLocation.length === 0) &&
                    (!popularEvents || popularEvents.length === 0)
                ) ?
                    <>
                        <Card className="p-10 text-center bg-transparent">
                            <div className="max-2-md mx-auto text-white flex flex-col gap-2.5 justify-center items-center">
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
                                    className="text-black hover:bg-transparent hover:border-white hover:text-white"
                                    size={"sm"}
                                />
                            </div>
                        </Card>
                    </>
                    :
                    <></>
            }
        </>
    )
}

export default NoEventComponent;