"use client";

import "./globals.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Footer from "./components/FooterComponent/Footer";
import Header from "./components/HeaderComponent/Header";
import { ConvexClientProvider } from "./utils/ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-linear-to-br from-gray-800 via-zinc-900 to-stone-900 text-white">
        <ClerkProvider
          appearance={{
            theme: dark,
          }}
        >
          <ConvexClientProvider>
            <main className="container relative min-h-screen pt-26 md:pt-22 min-w-full">
              <Header />
              <Provider store={store}>{children}</Provider>
              <Footer />
            </main>
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
