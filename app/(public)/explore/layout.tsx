"use client";

import InputButton from "@/app/components/FormComponents/ButtonComponent/InputButton";
import { AppConstants } from "@/app/constants/AppConstants";
import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";

const ExplorePagelayout = ({ children }: { children: React.ReactNode }) => {
    const pathName = usePathname();
    const isMainExplorePage = pathName === AppConstants.EXPLORE_ROUTE;

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto px-7">
                {!isMainExplorePage && (
                    <InputButton
                        label="Back"
                        className="text-white px-0 my-2"
                        icon={<ArrowLeft />}
                        variant={"link"}
                        navigateTo={AppConstants.EXPLORE_ROUTE}
                        size={"sm"}
                        asChild
                    />
                )}
                {children}
            </div>
        </div>
    );
}

export default ExplorePagelayout;