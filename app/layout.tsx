import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import Providers from "./providers";
import Header from "./components/HeaderComponent/Header";
import Footer from "./components/FooterComponent/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EventSnap",
  description:
    "Whether you are looking for concerts, sports, or community gatherings, EventSnap has got you covered. Join us and never miss out on the fun!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground`}
      >
        <Providers>
          <main className="container relative min-h-screen pt-26 md:pt-22 min-w-full">
            <Toaster position="top-right" richColors />
            <Header />
            {children}
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  );
}
