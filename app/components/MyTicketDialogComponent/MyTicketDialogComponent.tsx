/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppConstants } from "@/app/constants/AppConstants";
import { setShowMyTicketPopup, setShowTicketData } from "@/app/store/eventSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import InputButton from "../common/ButtonComponent/InputButton";
import { Calendar, MapPin } from "lucide-react";
import moment from "moment";

const MyTicketDialogComponent = () => {
    const dispatch = useAppDispatch();

    const showMyTicketPopup = useAppSelector((state) => state.event.showMyTicketPopup);
    const showTicketData = useAppSelector((state) => state.event.showTicketData);

    const onClose = () => {
        dispatch(setShowMyTicketPopup(false));
        dispatch(setShowTicketData({}));
    }

    return (
        <Dialog open={showMyTicketPopup} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-xl bg-[#121212] border-[#2e2e2e]">
                <DialogHeader>
                    <DialogTitle className="flex gap-2.5 items-center text-2xl">
                        {AppConstants.MY_TICKET_HEADER}
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-3">
                    <div className="text-center">
                        <p className="font-semibold">
                            {showTicketData?.attendeeName}
                        </p>
                        <p className="text-sm text-muted-foreground mb-2">
                            {showTicketData?.attendeeEmail}
                        </p>
                        <p className="text-lg mb-2">
                            {showTicketData?.eventData?.title}
                        </p>
                    </div>

                    <div className="text-center">
                        <p className="text-sm mb-1">
                            {`${AppConstants.TICKET_ID_LABEL}: `}
                        </p>
                        <p className="font-mono text-muted-foreground text-sm">
                            {showTicketData?.uniqueId}
                        </p>
                    </div>

                    <div className="bg-accent-foreground p-3 space-y-2 rounded-lg">
                        <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {moment(showTicketData?.eventData?.startDate).format("MMM D, YYYY")} - {moment(showTicketData?.eventData?.startDate).format("h:mm A")}
                        </span>
                        <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span className="line-clamp-1">
                                {(showTicketData?.eventData?.locationType === AppConstants.ONLINE_EVENT_KEY) ?
                                    AppConstants.ONLINE_EVENT_LABEL :
                                    `${showTicketData?.eventData?.city || ""}, ${showTicketData?.eventData?.state || ""}, ${showTicketData?.eventData?.country || ""}`}
                            </span>
                        </div>
                    </div>

                    <p className="text-xs text-muted-foreground text-center">
                        {AppConstants.MY_TICKET_FOOTER_NOTE}
                    </p>
                </div>
                <DialogFooter>
                    <InputButton
                        className="flex-1"
                        label={AppConstants.DONE_LABEL}
                        variant={"secondary"}
                        onClick={onClose}
                    />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export default MyTicketDialogComponent;