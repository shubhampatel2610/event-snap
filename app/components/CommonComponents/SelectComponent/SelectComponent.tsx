/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppConstants } from "@/app/constants/AppConstants";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SelectComponentProps {
    label: string,
    options: any[],
    value: string,
    placeholderKey?: string,
    onChange: (value: string) => void,
    className?: string,
    disabled?: boolean
}

const SelectComponent = (props: SelectComponentProps) => {
    const {
        label,
        options,
        value,
        placeholderKey,
        onChange,
        className,
        disabled
    } = props;


    return (
        <>
            <Label htmlFor={label.toLowerCase()} className="mb-1">{label}</Label>
            <Select value={value} onValueChange={(currValue: any) => onChange(currValue)} disabled={disabled}>
                <SelectTrigger className="h-10 w-full" id={label.toLowerCase()}>
                    <SelectValue placeholder={`${AppConstants.SELECT_PREFIX} ${placeholderKey}`} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {options.map((opt: any) => (
                            <SelectItem key={opt.isoCode} value={opt.name}>
                                {opt.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    )
}

export default SelectComponent;