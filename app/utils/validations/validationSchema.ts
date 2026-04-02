import z from "zod";
import { timeRegex } from "../helperFunctions";
import { AppConstants } from "@/app/constants/AppConstants";

export const eventPayload = z.object({
    title: z
        .string()
        .min(5, AppConstants.TITLE_REQ_ERROR),
    // description: z
        // .string()
        // .min(20, AppConstants.DESCRIPTION_REQ_ERROR),
    category: z
        .string()
        .min(1, AppConstants.SELECT_CATEGORY_ERROR),
    startDate: z.preprocess(
        (val) => (val ? val : undefined),
        z.coerce.date({
            message: AppConstants.START_DATE_REQ_ERROR,
        })
        .nullable()
    ),
    endDate: z.preprocess(
        (val) => (val ? val : undefined),
        z.coerce.date({
            message: AppConstants.END_DATE_REQ_ERROR,
        })
        .nullable()
    ),
    startTime: z
        .string()
        .regex(timeRegex, AppConstants.TIME_FORMAT_ERROR),
    endTime: z
        .string()
        .regex(timeRegex, AppConstants.TIME_FORMAT_ERROR),
    locationType: z
        .enum(["in-person", "online"])
        .default("in-person"),
    venue: z
        .string()
        .url(AppConstants.VALID_URL_ERROR)
        .optional()
        .or(z.literal("")),
    address: z
        .string()
        .optional(),
    state: z
        .string()
        .min(1, AppConstants.STATE_REQ_ERROR),
    city: z
        .string()
        .min(1, AppConstants.CITY_REQ_ERROR),
    ticketPrice: z
        .coerce.number()
        .min(1, AppConstants.PRICE_REQ_ERROR)
        .nullable(),
}).passthrough();