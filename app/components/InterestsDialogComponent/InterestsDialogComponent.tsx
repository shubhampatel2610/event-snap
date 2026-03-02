/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppConstants } from "@/app/constants/AppConstants";
import { removeSelectedInterests, setSelectedInterests, setSelectedLocation } from "@/app/store/eventSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { ArrowLeft, Heart, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useMemo, useState } from "react";
import InputButton from "../CommonComponents/ButtonComponent/InputButton";
import { useConvexMutations } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { City, State } from "country-state-city";
import SelectComponent from "../CommonComponents/SelectComponent/SelectComponent";

interface DialogProps {
    isOpen: boolean,
    onClose: () => void,
    onComplete: () => void
}

const InterestsDialogComponent = (props: DialogProps) => {
    const dispatch = useAppDispatch();
    const [step, setStep] = useState(1);
    const { isOpen, onClose, onComplete } = props;

    const selectedInterests = useAppSelector((state) => state.event.selectedInterests);
    const selectedLocation = useAppSelector((state) => state.event.selectedLocation);
    const { mutateData: userOnboardingData, isLoading } = useConvexMutations(api.users.userOnBoarding);
    const indianStates = State.getStatesOfCountry("IN");

    const stateCities = useMemo(() => {
        if (!selectedLocation.state) {
            return [];
        }

        const selectedState = indianStates.find((state: any) => state.name === selectedLocation.state);
        if (!selectedState) {
            return [];
        }

        return City.getCitiesOfState("IN", selectedState.isoCode);
    }, [selectedLocation.state, indianStates])


    const selectCategories = (id: string) => {
        if (selectedInterests.includes(id)) {
            dispatch(removeSelectedInterests(id));
        } else {
            dispatch(setSelectedInterests(id));
        }
    }

    const categoryRenderer = () => {
        return (AppConstants.CATEGORIES.map((category: any) => {
            return <button
                key={category.id}
                onClick={() => selectCategories(category.id)}
                className={`p-3 rounded-lg border-1 transition-all hover:scale-105 ${selectedInterests.includes(category.id)
                    ? "border-[#8B5CF6] bg-[#8B5CF6/10] bg-opacity-10 shadow-md shadow-[#8B5CF6/50]"
                    : "border-border hover:border-[#06B6D4]"}`}
            >
                <div className="text-xl mb-1">{category.icon}</div>
                <div className="text-sm font-medium">{category.label}</div>
            </button>;
        }))
    }

    const handleSaveClick = () => {
        if (step === 1 && selectedInterests.length < 3) {
            toast.error("Please Select Atleast 3 Interests");
            return;
        }

        if (step === 2 && (!selectedLocation.city || !selectedLocation.state)) {
            toast.error("Please Select City and State");
            return;
        }

        if (step === 1) {
            setStep(2);
        } else {
            handleSaveInterests();
        }
    }

    const handleSaveInterests = () => {

    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-2xl bg-[#121212] border-[#2e2e2e]">
                <DialogHeader>
                    <DialogTitle className="flex gap-2.5 items-center text-2xl">
                        {(step === 1) ?
                            <>
                                <Heart className="w-6 h-6" />
                                <span>{AppConstants.STEP_1_HEADER}</span>
                            </> :
                            <>
                                <MapPin className="w-6 h-6" />
                                <span>{AppConstants.STEP_2_HEADER}</span>
                            </>
                        }
                    </DialogTitle>
                    <DialogDescription>
                        {(step === 1) ?
                            <>
                                <span>{AppConstants.STEP_1_SUBHEADER}</span>
                            </> :
                            <>
                                <span>{AppConstants.STEP_2_SUBHEADER}</span>
                            </>
                        }
                    </DialogDescription>
                </DialogHeader>
                <div className="py-3">
                    {step === 1 ?
                        <div className="space y-5">
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h[500px] overflow-auto p-2">
                                {categoryRenderer()}
                            </div>
                            <div className="flex gap-2">
                                <Badge variant={selectedInterests.length >= 3 ? "secondary" : "default"}>
                                    {selectedInterests.length} {AppConstants.SELECTED_POSTFIX}
                                </Badge>
                                {selectedInterests.length >= 3 && <span className="text-sm text-green-500">{AppConstants.READY_TO_CONTINUE_TEXT}</span>}
                            </div>
                        </div> :
                        <div className="space y-2">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <SelectComponent
                                        label={AppConstants.STATE_LABEL}
                                        options={indianStates}
                                        value={selectedLocation.state}
                                        onChange={(value) => {
                                            dispatch(setSelectedLocation({
                                                ...selectedLocation, state: value
                                            }))
                                        }}
                                        placeholderKey={AppConstants.STATE_LABEL}
                                    />
                                </div>
                                <div>
                                    <SelectComponent
                                        label={AppConstants.CITY_LABEL}
                                        options={stateCities}
                                        value={selectedLocation.city}
                                        onChange={(value) => {
                                            dispatch(setSelectedLocation({
                                                ...selectedLocation, city: value
                                            }))
                                        }}
                                        placeholderKey={AppConstants.CITY_LABEL}
                                        disabled={!selectedLocation.state}
                                    />
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <DialogFooter>
                    {step === 2 &&
                        <InputButton
                            className="bg-transparent"
                            label={AppConstants.BACK_LABEL}
                            variant={"outline"}
                            onClick={() => setStep(1)}
                            icon={<ArrowLeft className="w-4 h-4" />}
                            asChild
                        />
                    }
                    <InputButton
                        className="flex-1"
                        label={step === 1 ? AppConstants.CONTINUE_LABEL : AppConstants.SAVE_LABEL}
                        variant={"secondary"}
                        disabled={isLoading}
                        onClick={handleSaveClick}
                    />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export default InterestsDialogComponent;