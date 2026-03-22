/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppConstants } from "@/app/constants/AppConstants";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Controller } from "react-hook-form";

interface SelectComponentProps {
    label?: string,
    options: any[],
    value?: string,
    placeholderKey?: string,
    onChange?: (value?: string) => void,
    className?: string,
    disabled?: boolean,
    controlled?: boolean,
    control?: any,
    controlName?: any,
    error?: any
}

const SelectComponent = (props: SelectComponentProps) => {
    const {
        label,
        options,
        value,
        placeholderKey,
        onChange,
        className,
        disabled,
        controlled,
        control,
        controlName,
        error
    } = props;


    return (
        <div>
            <Label htmlFor={label?.toLowerCase()} className="mb-1">{label}</Label>
            {controlled ?
                <Controller
                    control={control}
                    name={controlName}
                    render={({ field }) => {
                        return (
                            <Select
                                value={field.value}
                                onValueChange={(val) => {
                                    field.onChange(val);
                                    onChange?.(val);
                                }}
                                disabled={field.disabled}
                            >
                                <SelectTrigger className="h-10 w-full" id={label?.toLowerCase()}>
                                    <SelectValue placeholder={`${AppConstants.SELECT_PREFIX} ${placeholderKey}`} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {options.map((opt: any) => (
                                            <SelectItem
                                                key={opt.isoCode ? opt.isoCode : opt.id}
                                                value={opt.name ? opt.name : opt.id}
                                            >
                                                {opt.name ?
                                                    opt.name :
                                                    opt.icon ?
                                                        `${opt.icon} ${opt.label}` :
                                                        opt.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )
                    }}
                /> :
                <Select value={value} onValueChange={onChange} disabled={disabled}>
                    <SelectTrigger className="h-10 w-full" id={label?.toLowerCase()}>
                        <SelectValue placeholder={`${AppConstants.SELECT_PREFIX} ${placeholderKey}`} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {options.map((opt: any) => (
                                <SelectItem
                                    key={opt.isoCode ? opt.isoCode : opt.id}
                                    value={opt.name ? opt.name : opt.id}
                                >
                                    {opt.name ?
                                        opt.name :
                                        opt.icon ?
                                            `${opt.icon} ${opt.label}` :
                                            opt.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            }
            {error &&
                <p className="text-sm text-red-500 mt-1">{String(error)}</p>
            }
        </div>
    )
}

export default SelectComponent;