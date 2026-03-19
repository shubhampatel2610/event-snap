import z from "zod";
import { eventPayload } from "./validationSchema";
import { AppConstants } from "@/app/constants/AppConstants";

export type EventFormValues = z.infer<typeof eventPayload> & {
    isFree?: string;
    capacity?: number;
    themeColor?: string;
};

export const defaultEventData: EventFormValues = {
    title: "",
    description: "",
    locationType: "in-person",
    isFree: "true",
    capacity: 50,
    themeColor: AppConstants.DEFAULT_COLOR,
    category: "",
    venue: "",
    address: "",
    state: "",
    city: "",
    startDate: null,
    endDate: null,
    startTime: "",
    endTime: ""
}