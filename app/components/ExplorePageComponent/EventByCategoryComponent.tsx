/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppConstants } from "@/app/constants/AppConstants";
import { setEventsByCategory } from "@/app/store/eventSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const EventByCategoryComponent = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const eventsCountByCategory = useAppSelector((state) => state.event.eventsCountByCategory);

    const categoryEventCountData = AppConstants.CATEGORIES.map((category: any) => {
        return {
            ...category,
            count: eventsCountByCategory[category.id] || 0
        }
    });

    const handleCategoryClick = (categoryId: string) => {
        dispatch(setEventsByCategory([]));
        router.push(`${AppConstants.EXPLORE_ROUTE}/${categoryId}`);
    }

    const eventCountByCategoryRenderer = (category: any) => {
        return (
            <>
                <Card
                    key={category.id}
                    className="p-0 group cursor-pointer hover:shadow-accent transition-all hover:border-[#8B5CF6] bg-transparent"
                    onClick={() => handleCategoryClick(category.id)}
                >
                    <CardContent className="px-1 sm:p-5 flex items-center gap-2">
                        <span className="text-2xl sm:text-3xl">{category.icon}</span>
                        <div className="flex-1 min-w-0 text-start">
                            <h3 className="font-semibold text-white group-hover:text-[#06B6D4] transition-colors">
                                {category.label}
                            </h3>
                            <span className="text-sm text-muted-foreground">
                                {`${category.count} ${category.count <= 1 ? AppConstants.EVENT_SINGULAR_LABEL : AppConstants.EVENT_PLURAL_LABEL}`}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </>
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