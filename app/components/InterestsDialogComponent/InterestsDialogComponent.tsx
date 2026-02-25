import { AppConstants } from "@/app/constants/AppConstants";
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
import { Heart, MapPin } from "lucide-react";
import { useState } from "react";

interface DialogProps {
    isOpen: boolean,
    onClose: () => void,
    onComplete: () => void
}

const InterestsDialogComponent = (props: DialogProps) => {
    const [step, setStep] = useState(1);
    const { isOpen, onClose, onComplete } = props;

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
                <div>Content</div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export default InterestsDialogComponent;