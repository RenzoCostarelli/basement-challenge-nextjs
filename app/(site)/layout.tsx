import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { client } from "@/sanity/lib/client";
import { getPageConfig } from "@/sanity/lib/queries";
import type { Metadata } from "next";
import "../globals.css";
import LenisProvider from "@/components/LenisProvider";

export const metadata: Metadata = {
  title: "Basement dev Challenge",
  description: "Renzo Costarelli",
};

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { navbar, footer } = await client.fetch(getPageConfig);

  return (
    <LenisProvider>
      <Navbar navBarConfig={navbar} />
      {children}
      <Footer footerConfig={footer} />
    </LenisProvider>
  );
}
