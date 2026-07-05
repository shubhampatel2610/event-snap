/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppConstants } from "@/app/constants/AppConstants";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface EventByCategoryComponentProps {
    eventsCountByCategory: Record<string, number>;
}

const EventByCategoryComponent = (props: EventByCategoryComponentProps) => {
    const { eventsCountByCategory } = props;

    const categoryEventCountData = AppConstants.CATEGORIES.map((category: any) => {
        return {
            ...category,
            count: eventsCountByCategory[category.id] || 0
        }
    });

    const eventCountByCategoryRenderer = (category: any) => {
        return (
            <Card
                key={category.id}
                className="relative p-0 group cursor-pointer hover:shadow-accent transition-all hover:border-primary bg-transparent"
            >
                <Link
                    href={`${AppConstants.EXPLORE_ROUTE}/${category.id}`}
                    className="absolute inset-0 z-0"
                    aria-label={category.label}
                />

                <CardContent className="px-1 sm:p-5 flex items-center gap-2">
                    <span className="text-2xl sm:text-3xl">{category.icon}</span>
                    <div className="flex-1 min-w-0 text-start">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {category.label}
                        </h3>
                        <span className="text-sm text-muted-foreground">
                            {`${category.count} ${category.count <= 1 ? AppConstants.EVENT_SINGULAR_LABEL : AppConstants.EVENT_PLURAL_LABEL}`}
                        </span>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="flex flex-col gap-3 mt-5">
            <h2 className="text-2xl font-bold">{AppConstants.EVENTS_BY_CATEGORY_HEADER}</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 sm:grid-cols-3 gap-4">
                {categoryEventCountData?.length > 0 &&
                    categoryEventCountData.map((category: any) => eventCountByCategoryRenderer(category))
                }
            </div>
        </div>
    )
}

export default EventByCategoryComponent;
