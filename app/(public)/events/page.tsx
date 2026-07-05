import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import AllEventsComponent from "@/app/components/EventsPageComponent/AllEventsComponent";

export default async function EventsPage() {
  const preloaded = await preloadQuery(api.eventService.getAllUpcomingEvents, { limit: 50 });

  return <AllEventsComponent preloaded={preloaded} />;
}
