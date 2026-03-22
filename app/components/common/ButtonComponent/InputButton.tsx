import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ButtonProps {
    label: string;
    onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    className?: string;
    size?: "sm" | "default" | "xs" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg";
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    navigateTo?: string;
    asChild?: boolean;
    icon?: React.ReactNode;
    iconClassName?: string;
    type?: "button" | "submit" | "reset";
    error?: any;
}

const InputButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            label,
            onClick,
            disabled,
            className,
            size,
            variant,
            navigateTo,
            asChild,
            icon,
            iconClassName,
            type = "button",
            error,
            ...props
        },
        ref
    ) => {
        return (
            <>
                <Button
                    ref={ref}
                    onClick={onClick}
                    disabled={disabled}
                    className={`${className ?? ""} cursor-pointer`}
                    size={size}
                    variant={variant}
                    asChild={asChild || !!navigateTo}
                    type={type}
                    {...props}
                >
                    {navigateTo ? (
                        <Link href={navigateTo} className="flex items-center gap-2">
                            {icon && <span className="w-4 h-4">{icon}</span>}
                            {label && <span className={iconClassName}>{label}</span>}
                        </Link>
                    ) : (
                        <span className="flex items-center gap-2">
                            {icon && <span className="w-4 h-4">{icon}</span>}
                            {label && <span className={iconClassName}>{label}</span>}
                        </span>
                    )}
                </Button>
                {error &&
                    <p className="text-sm text-red-500 mt-1">{String(error)}</p>
                }
            </>
        );
    }
);

InputButton.displayName = "InputButton";

export default InputButton;