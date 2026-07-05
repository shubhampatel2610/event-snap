"use client";

import { AppConstants } from "@/app/constants/AppConstants";
import { generateDataWithAI, setShowAIEventCreator } from "@/app/store/eventSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import TextareaComponent from "../common/TextareaComponent/TextareaComponent";
import { useState } from "react";
import InputButton from "../common/ButtonComponent/InputButton";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface DialogProps {
    setAIGeneratedData: (val?: any) => void;
}

const AIEventDataGeneratorComponent = (props: DialogProps) => {
    const { setAIGeneratedData } = props;
    const dispatch = useAppDispatch();
    const showAIEventCreator = useAppSelector((state) => state.event.showAIEventCreator);
    const [promptVal, setPromptVal] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    const onClose = () => {
        dispatch(setShowAIEventCreator(false));
    }

    const handleSubmitClick = async () => {
        if (!promptVal?.trim()) {
            toast.error(AppConstants.PROMPT_REQUIRED_ERROR);
            return;
        }

        setIsGenerating(true);
        try {
            const response: any = await dispatch(generateDataWithAI(promptVal));
            if (response.error) {
                toast.error(`${AppConstants.GENERATE_EVENT_ERROR}: `, response.payload);
                return;
            }
            setAIGeneratedData(response);
            toast.success(AppConstants.GENERATE_EVENT_SUCCESS);
            onClose();
            setPromptVal("");
        } catch (error: any) {
            console.error(`${AppConstants.GENERATE_EVENT_ERROR}: `, error.message);
        } finally {
            setIsGenerating(false);
        }
    }

    return (
        <Dialog open={showAIEventCreator} onOpenChange={onClose}>
            <DialogContent className={"flex flex-col overflow-hidden max-w-3xl! w-full max-h-[80vh]"}>
                <DialogHeader>
                    <DialogTitle className="flex gap-2.5 items-center text-2xl">
                        {AppConstants.GENERATE_EVENT_TITLE}
                    </DialogTitle>
                    <DialogDescription>
                        {AppConstants.GENERATE_EVENT_SUBTITLE}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-2">
                    <TextareaComponent
                        placeholder={AppConstants.GENERATE_EVENT_TEXTAREA_PLACEHOLDER}
                        value={promptVal}
                        onChange={(e) => setPromptVal(e.target.value)}
                    />
                </div>

                <DialogFooter>
                    <InputButton
                        className="flex-1"
                        label={AppConstants.GENERATE_LABEL}
                        variant={"secondary"}
                        onClick={handleSubmitClick}
                        disabled={isGenerating}
                        icon={isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : undefined}
                    />
                    <InputButton
                        className="bg-transparent"
                        label={AppConstants.CANCEL_LABEL}
                        variant={"outline"}
                        onClick={onClose}
                        disabled={isGenerating}
                    />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AIEventDataGeneratorComponent;