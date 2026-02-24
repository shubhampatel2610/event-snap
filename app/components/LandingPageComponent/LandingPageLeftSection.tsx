"use client";

import { AppConstants } from "@/app/constants/AppConstants";
import InputButton from "../CommonComponents/ButtonComponent/InputButton";

const LandingPageLeftSection = () => {
    return (
        <div className="flex flex-col gap-10">
            <div>
                <h1 className="text-4xl sm:text-5xl md:text-5xl font-bold">
                    {AppConstants.LANDING_PAGE_HEADER}
                </h1>
            </div>
            <div className="flex flex-col gap-7">
                <div>
                    {AppConstants.LANDING_PAGE_TITLE.map((line, index) => (
                        <span key={index} className={`text-3xl sm:text-3xl md:text-4xl font-semibold 
              ${AppConstants.HIGHLIGHT_INDEXES.includes(index)
                                ? "bg-gradient-to-r from-[#8B5CF6] via-[#06B6D4] to-purple-400 bg-clip-text text-transparent"
                                : "text-[#ececec]"}`}
                        >
                            {line}{" "}
                        </span>
                    ))}
                </div>
                <span className="text-1xl text-[#acacac]">
                    {AppConstants.LANDING_PAGE_DESCRIPTION}
                </span>
                <div>
                    <InputButton
                        label={AppConstants.GET_STARTED_BTN_LABEL}
                        size="lg"
                        className={"rounded-full"}
                        navigateTo={AppConstants.EVENTS_ROUTE}
                        variant={"secondary"}
                    />
                </div>
            </div>
        </div>
    )
}

export default LandingPageLeftSection;