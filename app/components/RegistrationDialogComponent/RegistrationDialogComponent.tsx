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
            toast.error("Please fill in all fields");
            return;
        }

        try {
            await registerForEvent({
                eventId: eventData?._id,
                attendeeName: name,
                attendeeEmail: email,
            });

            setIsSuccess(true);
            toast.success("Registration successful! 🎉");
        } catch (error: any) {
            toast.error(error.message || "Registration failed");
        }
    };

    const onClose = () => {
        dispatch(setShowRegistrationPopup(false));
    }

    const handleViewTicket = () => {
        router.push(AppConstants.MY_BOOKINGS_ROUTE);
        onClose();
    };

    // Success state
    if (isSuccess) {
        return (
            <Dialog open={showRegistrationPopup} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-md">
                    <div className="flex flex-col items-center text-center space-y-4 py-6">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-2">You&apos;re All Set!</h2>
                            <p className="text-muted-foreground">
                                Your registration is confirmed. Check your Tickets for event
                                details and your QR code ticket.
                            </p>
                        </div>
                        <Separator />
                        <div className="w-full space-y-2">
                            <Button className="w-full gap-2" onClick={handleViewTicket}>
                                <Ticket className="w-4 h-4" />
                                View My Ticket
                            </Button>
                            <Button variant="outline" className="w-full" onClick={onClose}>
                                Close
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    // Registration form
    return (
        <Dialog open={showRegistrationPopup} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Register for Event</DialogTitle>
                    <DialogDescription>
                        Fill in your details to register for {eventData?.title}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Event Summary */}
                    <div className="bg-muted p-4 rounded-lg space-y-2">
                        <p className="font-semibold">{eventData?.title}</p>
                        <p className="text-sm text-muted-foreground">
                            {eventData?.isFree ? (
                                "Free Event"
                            ) : (
                                <span>
                                    Price: ₹{eventData?.ticketPrice}{" "}
                                    <span className="text-xs">(Pay at venue)</span>
                                </span>
                            )}
                        </p>
                    </div>

                    {/* Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <InputComponent
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <InputComponent
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@example.com"
                        />
                    </div>

                    {/* Terms */}
                    <p className="text-xs text-muted-foreground">
                        By registering, you agree to receive event updates and reminders via
                        email.
                    </p>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                        <InputButton
                            type="button"
                            variant="outline"
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