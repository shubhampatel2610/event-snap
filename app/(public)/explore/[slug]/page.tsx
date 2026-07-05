import { notFound } from "next/navigation";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { AppConstants } from "@/app/constants/AppConstants";
import { getLocationDataFromSlug } from "@/app/utils/helperFunctions";
import EventsBySlugComponent from "@/app/components/DynamicExplorePageComponent/EventsBySlugComponent";

interface DynamicExplorePageProps {
  params: Promise<{ slug: string }>;
}

export default async function DynamicExplorePage({ params }: DynamicExplorePageProps) {
  const { slug } = await params;

  const category = AppConstants.CATEGORIES.find((item: { id: string }) => item.id === slug);

  if (category) {
    const preloaded = await preloadQuery(api.eventService.getEventsByCategory, {
      category: slug,
      limit: 50,
    });

    return (
      <EventsBySlugComponent
        slugType="category"
        slugTypeDetails={category}
        preloaded={preloaded}
      />
    );
  }

  const { city, state, validSlug } = getLocationDataFromSlug(slug);

  if (!validSlug || !city || !state) {
    notFound();
  }

  const preloaded = await preloadQuery(api.eventService.getEventsByLocation, {
    city,
    state,
    limit: 50,
  });

  return (
    <EventsBySlugComponent
      slugType="location"
      slugTypeDetails={{ city, state }}
      preloaded={preloaded}
    />
  );
}
