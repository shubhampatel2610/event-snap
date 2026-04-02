import { Card, CardContent } from "@/components/ui/card";
import { JSX } from "react";

interface CardProps {
    className?: string;
    iconComponent: React.ReactNode;
    cardContentTemplate: JSX.Element;
}

const StatsCardComponent = (props: CardProps) => {
    const { className, iconComponent, cardContentTemplate } = props;

    return (
        <Card className="py-0 bg-accent-foreground text-white">
            <CardContent className="p-4 flex items-center gap-3">
                <div className={`p-3 rounded-lg`}>
                    {iconComponent}
                </div>
                <div>
                    {cardContentTemplate}
                </div>
            </CardContent>
        </Card>
    )
}

export default StatsCardComponent;