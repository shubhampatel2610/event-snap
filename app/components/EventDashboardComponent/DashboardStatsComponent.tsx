import { CheckCircle, Clock, TrendingUp, Users } from "lucide-react";
import StatsCardComponent from "./StatsCardComponent";
import { formatRevenue } from "@/app/utils/helperFunctions";
import { AppConstants } from "@/app/constants/AppConstants";

interface StatsProps {
    statistics: any;
    eventData: any;
}

const DashboardStatsComponent = (props: StatsProps) => {
    const { statistics, eventData } = props;

    const CapacityCardTemplate = () => {
        return (
            <>
                <p className="text-2xl font-bold">
                    {statistics?.totalRegistrations}/{statistics?.capacity}
                </p>
                <p className="text-sm text-muted-foreground">{AppConstants.CAPACITY_LABEL}</p>
            </>
        );
    }

    const CheckinCardTemplate = () => {
        return (
            <>
                <p className="text-2xl font-bold">{statistics?.totalCheckins}</p>
                <p className="text-sm text-muted-foreground">{AppConstants.CHECKED_IN_LABEL}</p>
            </>
        );
    }

    const RevenueCardTemplate = () => {
        return (
            <>
                <p className="text-2xl font-bold">{formatRevenue(statistics?.totalRevenue)} ₹</p>
                <p className="text-sm text-muted-foreground">{AppConstants.REVENUE_LABEL}</p>
            </>
        );
    }

    const CheckinRateCardTemplate = () => {
        return (
            <>
                <p className="text-2xl font-bold">{statistics?.checkinRate} %</p>
                <p className="text-sm text-muted-foreground">{AppConstants.CHECK_IN_RATE_LABEL}</p>
            </>
        );
    }

    const EventAvailabilityCardTemplate = () => {
        return (
            <>
                <p className="text-2xl font-bold">
                    {statistics?.isPastEvent
                        ? AppConstants.ENDED_POSTFIX
                        : statistics?.remainingHours > 24
                            ? `${Math.floor(statistics?.remainingHours / 24)} D`
                            : `${statistics?.remainingHours} H`}
                </p>
                <p className="text-sm text-muted-foreground">
                    {statistics?.isPastEvent ? AppConstants.EVENT_OVER_TEXT : AppConstants.TIME_LEFT_TEXT}
                </p>
            </>
        );
    }

    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-2 mb-2">
            {/* Capacity Card */}
            <StatsCardComponent
                iconComponent={<Users className="w-6 h-6 text-purple-600" />}
                cardContentTemplate={<CapacityCardTemplate />}
            />

            {/* Check In Card */}
            <StatsCardComponent
                iconComponent={<CheckCircle className="w-6 h-6 text-green-600" />}
                cardContentTemplate={<CheckinCardTemplate />}
            />

            {/* Revenue or Check In rate Card */}
            <StatsCardComponent
                iconComponent={<TrendingUp className="w-6 h-6 text-blue-600" />}
                cardContentTemplate={eventData?.isFree ? <CheckinRateCardTemplate /> : <RevenueCardTemplate />}
            />

            {/* Event Availability Card */}
            <StatsCardComponent
                iconComponent={<Clock className="w-6 h-6 text-amber-600" />}
                cardContentTemplate={<EventAvailabilityCardTemplate />}
            />
        </div>
    )
}

export default DashboardStatsComponent;