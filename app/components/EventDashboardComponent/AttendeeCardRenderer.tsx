"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useConvexMutations } from "@/hooks/use-convex-query";
import { format } from "date-fns";
import { CheckCircle, Circle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import InputButton from "../common/ButtonComponent/InputButton";
import { AppConstants } from "@/app/constants/AppConstants";

interface AttendeeCardRendererProps {
    registrationData: any;
}

const AttendeeCardRenderer = (props: AttendeeCardRendererProps) => {
    const { registrationData } = props;
    const { mutateData: checkInAttendee, isLoading } = useConvexMutations(
        api.registrationService.checkInAttendee
    );

    const handleManualCheckIn = async () => {
        try {
            const result = await checkInAttendee({ uniqueId: registrationData?.uniqueId });
            if (result.success) {
                toast.success(AppConstants.CHECK_IN_SUCCESS);
            } else {
                toast.error(result.message);
            }
        } catch (error: any) {
            toast.error(error.message || AppConstants.CHECK_IN_ERROR);
        }
    };

    return (
        <Card className="py-0 bg-accent-foreground">
            <CardContent className="p-4 flex items-start gap-4">
                <div
                    className={`mt-1 p-2 rounded-full ${registrationData?.checkedIn ? "bg-green-100" : "bg-blue-100"}`}
                >
                    {registrationData?.checkedIn ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                        <Circle className="w-5 h-5 text-blue-400" />
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white mb-1">{registrationData?.attendeeName}</h3>
                    <p className="text-sm text-muted-foreground mb-1">
                        {registrationData?.attendeeEmail}
                    </p>
                    <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                        <span>
                            {registrationData?.checkedIn ? "⏰ Checked in" : "📅 Registered"}{" "}
                            {(registrationData?.checkedIn && registrationData?.checkedInAt)
                                ? format(registrationData?.checkedInAt, "PPp")
                                : format(registrationData?.registeredAt, "PPp")}
                        </span>
                        <span className="font-mono">{AppConstants.TICKET_ID_LABEL}: {registrationData?.uniqueId}</span>
                    </div>
                </div>

                {!registrationData?.checkedIn && (
                    <InputButton
                        label={AppConstants.CHECK_IN_LABEL}
                        size="sm"
                        variant="outline"
                        onClick={handleManualCheckIn}
                        disabled={isLoading}
                        icon={isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                    />
                )}
            </CardContent>
        </Card>
    );
}

export default AttendeeCardRenderer;