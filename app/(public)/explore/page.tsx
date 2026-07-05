import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import ExplorePageComponent from "@/app/components/ExplorePageComponent/ExplorePageComponent";

export default async function ExplorePage() {
  const [preloadedFeatured, preloadedPopular, preloadedCategoryCounts, preloadedExpired] =
    await Promise.all([
      preloadQuery(api.eventService.getFeaturingEvents, { limit: 3 }),
      preloadQuery(api.eventService.getPopularEvents, {}),
      preloadQuery(api.eventService.getEventCountsByCategory, {}),
      preloadQuery(api.eventService.getExpiredEvents, { limit: 6 }),
    ]);

  return (
    <ExplorePageComponent
      preloadedFeatured={preloadedFeatured}
      preloadedPopular={preloadedPopular}
      preloadedCategoryCounts={preloadedCategoryCounts}
      preloadedExpired={preloadedExpired}
    />
  );
}
