import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import ExplorePageComponent from "@/app/components/ExplorePageComponent/ExplorePageComponent";

export default async function ExplorePage() {
  const [preloadedFeatured, preloadedPopular, preloadedCategoryCounts] =
    await Promise.all([
      preloadQuery(api.eventService.getFeaturingEvents, { limit: 3 }),
      preloadQuery(api.eventService.getPopularEvents, {}),
      preloadQuery(api.eventService.getEventCountsByCategory, {}),
    ]);

  return (
    <ExplorePageComponent
      preloadedFeatured={preloadedFeatured}
      preloadedPopular={preloadedPopular}
      preloadedCategoryCounts={preloadedCategoryCounts}
    />
  );
}
