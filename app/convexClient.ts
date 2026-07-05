import { ConvexReactClient } from "convex/react";

// create a single instance for use throughout the app
export const convexClient = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
