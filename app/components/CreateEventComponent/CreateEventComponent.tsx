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
import { setShowAIEventCreator, setShowImagePicker } from "@/app/store/eventSlice";
import Image from "next/image";
import ImagePickerDialogComponent from "../ImagePickerDialogComponent/ImagePickerDialogComponent";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Loader2, Send, Sparkles } from "lucide-react";
import { setShowPricingPlans } from "@/app/store/dashboardSlice";
import InputComponent from "../common/InputComponent/InputComponent";
import InputButton from "../common/ButtonComponent/InputButton";
import SelectComponent from "../common/SelectComponent/SelectComponent";
import RadioGroupComponent from "../common/RadioGroupComponent/RadioGroupComponent";
import { combineDateTime, createEventPayload } from "@/app/utils/helperFunctions";
import { toast } from "sonner";
import CalendarComponent from "../common/CalendarComponent/CalendarComponent";
import AIEventDataGeneratorComponent from "../AIEventDataGeneratorComponent/AIEventDataGeneratorComponent";

const CreateEventComponent = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { has } = useAuth();
    const proPlan = has?.({ plan: AppConstants.PRO_PLAN_KEY });

    const { data: currentUserData } = useConvexQuery(api.users.getCurrentUserData) as any;
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
        const selectedState = indianStates.find((s: any) => s.name === state);
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

    const handleThemeColorClick = (color: string) => {
        if (!proPlan && color !== AppConstants.DEFAULT_COLOR) {
            dispatch(setShowPricingPlans(true));
            return;
        }
        setValue("themeColor", color);
    }

    const handleProClick = () => {
        dispatch(setShowPricingPlans(true));
    }

    const onFormSubmit = async (data: any) => {
        try {
            const startDateTime = combineDateTime(data.startDate, data.startTime);
            const endDateTime = combineDateTime(data.endDate, data.endTime);

            if (!startDateTime || !endDateTime) {
                toast.error(AppConstants.SELECT_DATE_TIME_ERROR);
                return;
            }

            if (!proPlan && currentUserData.freeEventsCount >= 1) {
                toast.error(AppConstants.FREE_EVENT_COUNT_ERROR);
                return;
            }

            if (!proPlan && data.themeColor != AppConstants.DEFAULT_COLOR) {
                toast.error(AppConstants.CUSTOM_THEME_COLOR_ERROR);
                return;
            }

            const date = {
                startDate: startDateTime,
                endDate: endDateTime
            }

            const payLoad = createEventPayload(data, proPlan, date);
            await createEventData(payLoad);

            toast.success(AppConstants.CREATE_EVENT_SUCCESS);
            router.push(AppConstants.EVENTS_ROUTE);
        } catch (error: any) {
            toast.error(error.message || AppConstants.CREATE_EVENT_ERROR);
        }
    }

    const setAIGeneratedData = (response: any) => {
        setValue("title", response.title);
        setValue("description", response.description);
        setValue("category", response.category);
        setValue("capacity", response.capacity);
        setValue("isFree", response.isFree);
    }

    return (
        <div className="min-h-screen transition-colors duration-300 px-10 py-8 -mt-6 md:-mt-2 lg:rounded-md" style={{ backgroundColor: themeColor }}>
            <div>
                <div className="max-w-6xl mx-auto flex flex-col gap-1 md:flex-row justify-between mb-5">
                    <h1 className="text-3xl font-bold">{AppConstants.CREATE_EVENT_HEADER}</h1>
                    {!proPlan &&
                        <p className="text-sm text-muted-foreground mt-1">
                            {1 - currentUserData?.freeEventsCount} {AppConstants.FREE_REMAINING_EVENT_TEXT}
                        </p>}
                </div>

                <div className="max-w-6xl mx-auto mb-2 flex justify-end">
                    <InputButton
                        label={AppConstants.GENERATE_WITH_AI_LABEL}
                        className="rounded-xl"
                        icon={<Sparkles className="w-5 h-5" />}
                        onClick={() => dispatch(setShowAIEventCreator(true))}
                    />
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

                        <div className="space-y-1">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm">Theme Color</Label>
                                {!proPlan &&
                                    <Badge variant={"secondary"} className="text-xs gap-1">
                                        <Sparkles className="w-3 h-3" />
                                        {AppConstants.PRO_PLAN_TEXT}
                                    </Badge>}
                            </div>
                            <div className="flex gap-1 flex-wrap">
                                {themeColorOptions.map((color) => (
                                    <button
                                        className={`w-8 h-8 rounded-md border transition-all 
                                        ${(!proPlan && color !== AppConstants.DEFAULT_COLOR) ?
                                                "opacity-50 cursor-not-allowed" :
                                                "hover:scale-105"}`}
                                        style={{
                                            backgroundColor: color,
                                            borderColor: themeColor === color ? "#FFFFFF" : "transparent"
                                        }}
                                        title={
                                            (!proPlan && color !== AppConstants.DEFAULT_COLOR) ?
                                                AppConstants.CUSTOMIZE_COLOR_PRO_TEXT :
                                                ""
                                        }
                                        type="button"
                                        onClick={() => handleThemeColorClick(color)}
                                    />
                                ))}
                                {!proPlan &&
                                    <button
                                        className={"w-8 h-8 rounded-md border transition-all  flex items-center justify-center border-dashed border-[#06B6D4] hover:border-[#8B5CF6] text-[#06B6D4] hover:text-[#8B5CF6]"}
                                        title={AppConstants.PRO_COLOR_BTN_TITLE}
                                        type="button"
                                        onClick={handleProClick}
                                    >
                                        <Sparkles className="w-4 h-4" />
                                    </button>
                                }
                            </div>
                        </div>

                    </div>
                    <>
                        <form
                            className="space-y-4"
                            onSubmit={handleSubmit(onFormSubmit)}
                        >
                            <div>
                                <InputComponent
                                    registerField={register("title")}
                                    placeholder={AppConstants.EVENT_NAME_PLACEHOLDER}
                                    className="text-2xl font-semibold bg-transparent border focus-visible:ring-0"
                                    error={errors.title && errors.title.message}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                <CalendarComponent
                                    label={AppConstants.START_DATE_LABEL}
                                    value={startDate}
                                    onDateSelect={(date) => setValue("startDate", date)}
                                    disabled={(date: any) => endDate && date > endDate}
                                    registerTimeField={register("startTime")}
                                    error={(errors.startDate || errors.startTime) && (String(errors.startDate?.message) ?? String(errors.startTime?.message))}
                                />
                                <CalendarComponent
                                    label={AppConstants.END_DATE_LABEL}
                                    value={endDate}
                                    onDateSelect={(date) => setValue("endDate", date)}
                                    disabled={(date: any) => date < (startDate || new Date())}
                                    registerTimeField={register("endTime")}
                                    error={(errors.endDate || errors.endTime) && (String(errors.endDate?.message) ?? String(errors.endTime?.message))}
                                />
                            </div>

                            <div className="space-y-2">
                                <SelectComponent
                                    label={AppConstants.CATEGORY_LABEL}
                                    options={AppConstants.CATEGORIES}
                                    placeholderKey={AppConstants.CATEGORY_LABEL}
                                    controlled
                                    control={control}
                                    controlName={"category"}
                                    error={errors.category && errors.category.message}
                                />
                            </div>

                            <div className="space-y-2 w-full">
                                <Label className="text-sm mb-0">{AppConstants.LOCATION_LABEL}</Label>
                                <div className="grid grid-cols-2 gap-2 w-full">
                                    <SelectComponent
                                        options={indianStates}
                                        placeholderKey={AppConstants.STATE_LABEL}
                                        controlled
                                        control={control}
                                        controlName={"state"}
                                        error={errors.state && errors.state.message}
                                        onChange={() => setValue("city", "")}
                                    />
                                    <SelectComponent
                                        options={stateCities}
                                        placeholderKey={!state ? `${AppConstants.STATE_LABEL} ${AppConstants.FIRST_POSTFIX}` : AppConstants.CITY_LABEL}
                                        controlled
                                        control={control}
                                        controlName={"city"}
                                        error={errors.city && errors.city.message}
                                        disabled={!state}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 mt-2">
                                <Label className="text-sm mb-0">{AppConstants.VENUE_LABEL}</Label>
                                <InputComponent
                                    registerField={register("venue")}
                                    placeholder={AppConstants.VENUE_PLACEHOLDER}
                                    className="text-2xl font-semibold bg-transparent border focus-visible:ring-0"
                                    type="url"
                                    error={errors.venue && errors.venue.message}
                                />
                                <InputComponent
                                    registerField={register("address")}
                                    placeholder={AppConstants.ADDRESS_PLACEHOLDER}
                                    className="text-2xl font-semibold bg-transparent border focus-visible:ring-0"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <Label className="text-sm mb-0">{AppConstants.EVENT_TYPE_LABEL}</Label>
                                    <RadioGroupComponent
                                        control={control}
                                        controlledName={"isFree"}
                                        radioOptions={AppConstants.EVENT_TYPE_OPTIONS}
                                        error={errors.isFree && errors.isFree.message}
                                    />
                                </div>
                                {(!isFree) && <div>
                                    <InputComponent
                                        registerField={register("ticketPrice")}
                                        placeholder={AppConstants.TICKET_PRICE_PLACEHOLDER}
                                        className="text-2xl font-semibold bg-transparent border focus-visible:ring-0"
                                        type="number"
                                        error={errors.ticketPrice && errors.ticketPrice.message}
                                    />
                                </div>}
                            </div>

                            <div>
                                <InputComponent
                                    registerField={register("capacity")}
                                    placeholder={AppConstants.CAPACITY_PLACEHOLDER}
                                    className="text-2xl font-semibold bg-transparent border focus-visible:ring-0"
                                    error={errors.capacity && errors.capacity.message}
                                />
                            </div>

                            <InputButton
                                label={AppConstants.SUBMIT_LABEL}
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-5 text-lg rounded-xl"
                                icon={isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                            />
                        </form>
                    </>
                </div>

                <ImagePickerDialogComponent onImageSelect={onImageSelect} />

                <PricingPlanDialogComponent triggerPath={AppConstants.CUSTOM_TRIGGER_PATH} />

                <AIEventDataGeneratorComponent setAIGeneratedData={setAIGeneratedData} />
            </div>
        </div>
    )
}

export default CreateEventComponent;