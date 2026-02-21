"use client";

import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ReactNode } from "react";
import { useAuth } from "@clerk/nextjs";

import { convexClient } from "../convexClient";

// reuse the singleton client created outside of React
const convex = convexClient;

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
    {children}
  </ConvexProviderWithClerk>;
}