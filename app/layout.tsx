import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { client } from "@/sanity/lib/client";
import { getPageConfig } from "@/sanity/lib/queries";
import type { Metadata } from "next";
import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Basement dev Challenge",
  description: "Renzo Costarelli",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { navbar, footer } = await client.fetch(getPageConfig);

  return (
    <html lang="en">
      <body
        className={`font-sans antialiased ${geist.className} ${geistMono.className}`}
      >
        <Navbar navBarConfig={navbar} />
        {children}
        <Footer footerConfig={footer} />
      </body>
    </html>
  );
}
