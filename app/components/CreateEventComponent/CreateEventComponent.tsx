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
import PricingPlanDialogComponent from "../PricingPlanDialogComponent/PricingPlanDialogComponent";
import { setShowImagePicker } from "@/app/store/eventSlice";
import Image from "next/image";
import ImagePickerDialogComponent from "../ImagePickerDialogComponent/ImagePickerDialogComponent";

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

    const onImagePickerClick = () => {
        dispatch(setShowImagePicker(true));
    }

    const onImageSelect = (url: string) => {
        setValue("coverImage", url);
        dispatch(setShowImagePicker(false));
    }

    return (
        <div className="min-h-screen transition-colors duration-300 px-10 py-8 -mt-6 md:-mt-5 lg:rounded-md" style={{ backgroundColor: themeColor }}>
            <div>
                <div className="max-w-6xl mx-auto flex flex-col gap-1 md:flex-row justify-between mb-5">
                    <h1 className="text-3xl font-bold">{AppConstants.CREATE_EVENT_HEADER}</h1>
                    {proPlan &&
                        <p className="text-sm text-muted-foreground mt-1">
                            {1 - currentUserData?.freeEventsCount} {AppConstants.FREE_REMAINING_EVENT_TEXT}
                        </p>}
                </div>

                <div>
                    {/* AI Event Creator */}
                </div>

                <div className="max-w-6xl mx-auto grid md:grid-cols-[320px_1fr] gap-10">
                    <div className="space-y-6">
                        <div className="aspect-square w-full rounded-xl overflow-hidden flex items-center justify-center cursor-pointer border" onClick={onImagePickerClick}>
                            {coverImage ?
                                <Image
                                    className="w-full h-full object-cover"
                                    src={coverImage}
                                    width={500}
                                    height={500}
                                    alt="cover-image"
                                    priority
                                /> :
                                <span className="opacity-50 text-sm">
                                    {AppConstants.COVER_IMG_PLACEHOLDER}
                                </span>}
                        </div>
                    </div>
                    <div>
                        Right
                    </div>
                </div>

                <ImagePickerDialogComponent onImageSelect={onImageSelect} />

                <PricingPlanDialogComponent triggerPath={AppConstants.CUSTOM_TRIGGER_PATH} />
            </div>
        </div>
    )
}

export default CreateEventComponent;