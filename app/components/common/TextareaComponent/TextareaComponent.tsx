/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface TextareaComponentProps {
    label?: string,
    value?: string,
    placeholder?: string,
    onChange?: (e?: any) => void,
    className?: string,
    icon?: React.ReactNode;
    onFocus?: () => void,
    registerField?: any,
    error?: any,
    type?: string
}

const TextareaComponent = (props: TextareaComponentProps) => {
    const {
        label,
        value,
        placeholder,
        onChange,
        className,
        icon,
        onFocus,
        registerField,
        error,
        type
    } = props;


    return (
        <div className="flex-1 relative">
            {label && <Label htmlFor={label.toLowerCase()} className="mb-1">{label}</Label>}
            {icon &&
                <span className="absolute left-4 top-1/2 transform -translate-1/2 w-4 h-4 text-muted-foreground">{icon}</span>
            }
            <Textarea
                {...registerField}
                className={`${icon && "pl-7"} w-full h-9 rounded-1 ${className}`}
                onFocus={onFocus}
                onChange={onChange}
                placeholder={placeholder}
                value={value}
                type={type}
            />
            {error &&
                <p className="text-sm text-red-500 mt-1">{String(error)}</p>
            }
        </div>
    )
}

export default TextareaComponent;