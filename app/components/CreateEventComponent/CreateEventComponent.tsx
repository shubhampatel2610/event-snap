"use client";

import { AppConstants } from "@/app/constants/AppConstants";
import { useAppDispatch } from "@/app/store/store";
import { api } from "@/convex/_generated/api";
import { useConvexMutations, useConvexQuery } from "@/hooks/use-convex-query";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventPayload } from "@/app/utils/validations/validationSchema";
import { defaultEventData } from "@/app/utils/validations/defaultSchema";
import { City, State } from "country-state-city";
import { useMemo } from "react";

const CreateEventComponent = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { has } = useAuth();
    const proPlan = has?.({ plan: AppConstants.PRO_PLAN_KEY });

    const { data: currentUserData } = useConvexQuery(api.users.getCurrentUserData);
    const { mutateData: createEventData, isLoading } = useConvexMutations(api.eventService.createNewEvent);

    // destructure of form
    const {
        register, // connect fields with react-hook-form
        handleSubmit, // submit form
        watch, // watch field if its values changes or not
        setValue, // update value of field
        control, // control non-native html elements
        formState: { errors }
    } = useForm<any>({
        resolver: zodResolver(eventPayload),
        defaultValues: defaultEventData
    });

    const themeColor = watch("themeColor");
    const isFree = watch("isFree");
    const state = watch("state");
    const startDate = watch("startDate");
    const endDate = watch("endDate");
    const coverImage = watch("coverImage");

    const indianStates = State.getStatesOfCountry("IN");

    const stateCities = useMemo(() => {
        if (!state) {
            return [];
        }
        const selectedState = indianStates.find((state: any) => state.name === state);
        if (!selectedState) {
            return [];
        }
        return City.getCitiesOfState("IN", selectedState.isoCode);
    }, [state, indianStates]);

    const themeColorOptions = [
        AppConstants.DEFAULT_COLOR,
        ...(proPlan ? AppConstants.PRO_COLOR_OPTIONS : [])
    ];

    return (
        <div>
            Create Evenet
        </div>
    )
}

export default CreateEventComponent;