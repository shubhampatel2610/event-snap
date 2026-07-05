import { cache } from "react";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import type { Metadata } from "next";
import { api } from "@/convex/_generated/api";
import EventDetailsComponent from "@/app/components/EventDetailsComponent/EventDetailsComponent";

interface EventDetailsPageProps {
  params: Promise<{ slug: string }>;
}

const getEvent = cache((slug: string) =>
  fetchQuery(api.eventService.getEventBySlug, { slug })
);

export async function generateMetadata({
  params,
}: EventDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    return {};
  }

  return {
    title: event.title,
    description: event.description?.slice(0, 160),
    openGraph: {
      title: event.title,
      description: event.description,
      images: event.bannerImageUrl ? [event.bannerImageUrl] : [],
    },
  };
}

export default async function EventDetailsPage({ params }: EventDetailsPageProps) {
  const { slug } = await params;
  const preloaded = await preloadQuery(api.eventService.getEventBySlug, { slug });

  return <EventDetailsComponent preloaded={preloaded} />;
}
