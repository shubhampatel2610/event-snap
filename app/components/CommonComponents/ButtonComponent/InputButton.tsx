import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ButtonProps {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    size?: "sm" | "default" | "xs" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg" | null | undefined;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    navigateTo?: string;
    asChild?: boolean;
    icon?: React.ReactNode;
}
const InputButton = (props: ButtonProps) => {
    const { label, onClick, disabled, className, size, variant, navigateTo, asChild, icon } = props;

    return (
        <>
            <Button
                onClick={onClick}
                disabled={disabled}
                className={className + " cursor-pointer"}
                size={size}
                variant={variant}
                asChild={asChild}
            >
                {navigateTo ?
                    <Link href={navigateTo}>
                        {icon && <span className="w-4 h-4">{icon}</span>}
                        <span className={icon ? "hidden sm:inline" : ""}>{label}</span>
                    </Link> :
                    label
                }
            </Button>
        </>
    )
}

export default InputButton;
