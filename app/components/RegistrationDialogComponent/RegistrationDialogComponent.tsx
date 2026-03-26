"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Ticket, CheckCircle } from "lucide-react";
import { useConvexMutations } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AppConstants } from "@/app/constants/AppConstants";
import InputComponent from "../common/InputComponent/InputComponent";
import InputButton from "../common/ButtonComponent/InputButton";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { setShowRegistrationPopup } from "@/app/store/eventSlice";

interface DialogProps {
    eventData: any
}

const RegistrationDialogComponent = (props: DialogProps) => {
    const { eventData } = props;
    const router = useRouter();
    const { user } = useUser();
    const dispatch = useAppDispatch();

    const [name, setName] = useState(user?.fullName || "");
    const [email, setEmail] = useState(user?.primaryEmailAddress?.emailAddress || "");
    const showRegistrationPopup = useAppSelector((state) => state.event.showRegistrationPopup);

    const [isSuccess, setIsSuccess] = useState(false);

    const { mutateData: registerForEvent, isLoading } = useConvexMutations(
        api.registrationService.registerForEvent
    );

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!name.trim() || !email.trim()) {
            toast.error(AppConstants.ALL_FIELDS_REQUIRED);
            return;
        }

        try {
            await registerForEvent({
                eventId: eventData?._id,
                name: name,
                email: email,
            });

            setIsSuccess(true);
            toast.success(AppConstants.REGISTRATION_SUCCESS);
        } catch (error: any) {
            toast.error(error.message || AppConstants.REGISTRATION_ERROR);
        }
    };

    const onClose = () => {
        dispatch(setShowRegistrationPopup(false));
    }

    const handleViewTicket = () => {
        router.push(AppConstants.MY_BOOKINGS_ROUTE);
        onClose();
    };

    if (isSuccess) {
        return (
            <Dialog open={showRegistrationPopup} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-md bg-[#020714]">
                    <div className="flex flex-col items-center text-center space-y-4 py-6">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-2">{AppConstants.REGISTRATION_SUCCESS_TITLE}</h2>
                            <p className="text-muted-foreground">
                                {AppConstants.REGISTRATION_SUCCESS_SUBTITLE}
                            </p>
                        </div>
                        <Separator />
                        <div className="w-full space-y-2">
                            <InputButton
                                className="w-full gap-2"
                                onClick={handleViewTicket}
                                icon={<Ticket className="w-4 h-4" />}
                                label={AppConstants.VIEW_TICKET_LABEL}
                            />
                            <InputButton
                                variant="secondary"
                                className="w-full"
                                onClick={onClose}
                                label={AppConstants.CANCEL_LABEL}
                            />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={showRegistrationPopup} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-[#020714]">
                <DialogHeader>
                    <DialogTitle>{AppConstants.REGISTRATION_TITLE}</DialogTitle>
                    <DialogDescription>
                        {`${AppConstants.REGISTRATION_SUBTITLE} ${eventData?.title}`}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="bg-[#000c2c] p-4 rounded-lg space-y-2">
                        <p className="font-semibold">{eventData?.title}</p>
                        <p className="text-sm text-muted-foreground">
                            {eventData?.isFree ? (
                                AppConstants.FREE_EVENT_TEXT
                            ) : (
                                <span>
                                    {AppConstants.PRICE_TITLE}: ₹{eventData?.ticketPrice}{" "}
                                    <span className="text-xs">{`(${AppConstants.PAY_AT_VENUE_TEXT})`}</span>
                                </span>
                            )}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <InputComponent
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={AppConstants.NAME_LABEL}
                            label={AppConstants.NAME_LABEL}
                        />
                    </div>

                    <div className="space-y-2">
                        <InputComponent
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={AppConstants.EMAIL_LABEL}
                            label={AppConstants.EMAIL_LABEL}
                        />
                    </div>

                    <p className="text-xs text-muted-foreground">
                        {AppConstants.TERMS_CO_TEXT}
                    </p>

                    <div className="flex gap-2 pt-2">
                        <InputButton
                            type="button"
                            variant="secondary"
                            onClick={onClose}
                            className="flex-1"
                            disabled={isLoading}
                            label={AppConstants.CANCEL_LABEL}
                        />
                        <InputButton
                            label={AppConstants.SUBMIT_LABEL}
                            type="submit"
                            className="flex-1 gap-2"
                            disabled={isLoading}
                        />
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default RegistrationDialogComponent;