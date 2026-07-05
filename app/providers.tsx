"use client";

import { ReactNode } from "react";
import { ThemeProvider, useTheme } from "next-themes";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ConvexClientProvider } from "./utils/ConvexClientProvider";

function ClerkThemeBridge({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme();

  return (
    <ClerkProvider
      appearance={{ baseTheme: resolvedTheme === "dark" ? dark : undefined }}
    >
      {children}
    </ClerkProvider>
  );
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ClerkThemeBridge>
        <ConvexClientProvider>
          <Provider store={store}>{children}</Provider>
        </ConvexClientProvider>
      </ClerkThemeBridge>
    </ThemeProvider>
  );
}
