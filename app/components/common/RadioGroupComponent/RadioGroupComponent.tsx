import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Controller } from "react-hook-form";

interface FormRadioGroupProps {
    controlledName?: any;
    control?: any;
    radioOptions?: { label: string; value: string }[];
    error?: any;
    className?: string;
}

const RadioGroupComponent = (props: FormRadioGroupProps) => {
    const {
        controlledName,
        control,
        radioOptions,
        className,
        error
    } = props;

    return (
        <>
            <Controller
                name={controlledName}
                control={control}
                render={({ field }) => (
                    <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className={`flex flex-row flex-wrap gap-5 mt-1 ${className}`}
                    >
                        {radioOptions && radioOptions.map((option: any) => (
                            <div key={option.value} className="flex items-center gap-2">
                                <RadioGroupItem
                                    id={`${controlledName}-${option.value}`}
                                    value={option.value}
                                    className={(field.value === option.value)
                                        ? "bg-white border-white"
                                        : "bg-gray-200 border-gray-400"
                                    }
                                />
                                <Label htmlFor={`${controlledName}-${option.value}`}>{option.label}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                )}
            />
            {error &&
                <p className="text-sm text-red-500 mt-1">{String(error)}</p>
            }
        </>
    )
}

export default RadioGroupComponent;