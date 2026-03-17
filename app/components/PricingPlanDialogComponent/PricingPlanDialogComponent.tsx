"use client";

import { AppConstants } from "@/app/constants/AppConstants";
import { setShowPricingPlans } from "@/app/store/dashboardSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PricingTable } from "@clerk/nextjs";
import { Sparkle, Sparkles } from "lucide-react";
import InputButton from "../common/ButtonComponent/InputButton";

interface PricingProps {
    triggerPath?: string
}

const PricingPlanDialogComponent = (props: PricingProps) => {
    const { triggerPath } = props;
    const dispatch = useAppDispatch();
    const showPricingPlans = useAppSelector((state) => state.dashboard.showPricingPlans);

    const onClose = () => {
        dispatch(setShowPricingPlans(false));
    }

    const renderSubHeaderText = (path?: string) => {
        switch (path) {
            case AppConstants.HEADER_TRIGGER_PATH:
                return AppConstants.HEADER_HEADER_MESSAGE;
            case AppConstants.FREE_TRIGGER_PATH:
                return AppConstants.FREE_HEADER_MESSAGE;
            case AppConstants.CUSTOM_TRIGGER_PATH:
                return AppConstants.CUSTOM_HEADER_MESSAGE;
            default:
                return AppConstants.DEFAULT_HEADER_MESSAGE;
        }
    }

    return (
        <Dialog open={showPricingPlans} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-2xl bg-[#121212] border-[#2e2e2e] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-6 h-6 text-yellow-500" />
                        <DialogTitle className="text-2xl">{AppConstants.UPGRADE_PLAN_HEADER}</DialogTitle>
                    </div>
                    <DialogDescription>
                        {renderSubHeaderText(triggerPath)}
                    </DialogDescription>
                </DialogHeader>
                <PricingTable
                    checkoutProps={{
                        appearance: {
                            elements: {
                                drawerRoot: {
                                    zIndex: 1000
                                }
                            }
                        }
                    }}
                />
                <div className="flex">
                    <InputButton
                        label={AppConstants.MAYBE_LATER_LABEL}
                        onClick={onClose}
                        className={"flex-1"}
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default PricingPlanDialogComponent;