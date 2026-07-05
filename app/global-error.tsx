"use client";

import "./globals.css";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <div className="min-h-screen flex flex-col items-center justify-center gap-3 text-center px-5">
          <h1 className="text-3xl font-bold">Something went wrong</h1>
          <p className="text-muted-foreground max-w-md">
            A critical error occurred. Please try again.
          </p>
          <button
            onClick={reset}
            className="rounded-md border border-border px-4 py-2 text-sm hover:bg-accent transition-colors cursor-pointer"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
