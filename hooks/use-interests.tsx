/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { AppConstants } from "@/app/constants/AppConstants";
import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/use-convex-query";
import _ from "lodash";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const URLS = [
    AppConstants.EXPLORE_ROUTE,
    AppConstants.EVENTS_ROUTE,
    AppConstants.MY_BOOKINGS_ROUTE
];

const useInterests = () => {
    const router = useRouter();
    const path = usePathname();
    const [showInterests, setShowInterests] = useState<boolean>(false);
    const { data: currentUserData } = useConvexQuery(api.users.getCurrentUserData) as any;

    useEffect(() => {
        if (!currentUserData || _.isEmpty(currentUserData)) {
            return;
        }

        // if onboarding is not done
        if (!currentUserData.hasOnboardingDone) {
            const requiredOnboarding = URLS.some((url) => path.startsWith(url));
            if (requiredOnboarding) {
                setShowInterests(true);
            }
        }

    }, [currentUserData, path])

    const handleDialogStepsComplete = () => {
        setShowInterests(false);
        router.refresh();
    }

    const handleDialogStepSkip = () => {
        setShowInterests(false);
        router.push("/");
    }

    return {
        showInterests,
        setShowInterests,
        handleDialogStepsComplete,
        handleDialogStepSkip,
        needsOnoarding: currentUserData && !currentUserData.hasOnboardingDone
    };
}

export default useInterests;