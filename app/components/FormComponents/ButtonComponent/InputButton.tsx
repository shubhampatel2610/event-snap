import { Button } from "@/components/ui/button";

interface ButtonProps {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    size?: "sm" | "default" | "xs" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg" | null | undefined;
}
const InputButton = (props: ButtonProps) => {
    const { label, onClick, disabled, className, size } = props;

    return (
        <>
            <Button
                onClick={onClick}
                disabled={disabled}
                className={className + "cursor-pointer"}
                size={size}
            >
                {label}
            </Button>
        </>
    )
}

export default InputButton;
