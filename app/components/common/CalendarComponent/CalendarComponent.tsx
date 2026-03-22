import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import InputButton from "../ButtonComponent/InputButton";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import InputComponent from "../InputComponent/InputComponent";
import { format } from "date-fns";
import { AppConstants } from "@/app/constants/AppConstants";

interface CalendarProps {
    label?: string,
    placeHolder?: string,
    value?: any,
    registerTimeField?: any,
    error?: any,
    onDateSelect?: (value?: any) => void,
    disabled?: any
}

const CalendarComponent = (props: CalendarProps) => {
    const {
        label,
        placeHolder,
        value,
        registerTimeField,
        error,
        onDateSelect,
        disabled
    } = props;


    return (
        <div className="space-y-2">
            <Label className="text-sm mb-0">{label}</Label>
            <div className="grid grid-cols-[1fr_auto] gap-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <InputButton
                            className="bg-transparent border w-full focus-visible:ring-0 hover:bg-transparent"
                            label={value ? format(value, "PPP") : `${AppConstants.SELECT_PREFIX} ${label}`}
                            icon={<CalendarIcon className="w-4 h-4" />}
                        />
                    </PopoverTrigger>
                    <PopoverContent>
                        <Calendar
                            mode="single"
                            selected={value}
                            onSelect={onDateSelect}
                            disabled={disabled}
                        />
                    </PopoverContent>
                </Popover>
                <InputComponent
                    placeholder="HH:MM"
                    type="time"
                    registerField={registerTimeField}
                />
            </div>
            {(error) && (
                <p className="text-sm text-red-500 mt-1">
                    {error}
                </p>
            )}
        </div>
    )
}

export default CalendarComponent;