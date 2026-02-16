"use client";

import "./globals.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Footer from "./components/FooterComponent/Footer";
import Header from "./components/HeaderComponent/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-linear-to-br from-gray-800 via-zinc-900 to-stone-900 text-white">
        <main className="container relative min-h-screen pt-40 md:pt-32 min-w-full">
          <Header />
          <Provider store={store}>{children}</Provider>
          <Footer />
        </main>
      </body>
    </html>
  );
}
