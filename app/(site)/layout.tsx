import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { client } from "@/sanity/lib/client";
import { getPageConfig } from "@/sanity/lib/queries";
import type { Metadata } from "next";
import "../globals.css";

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
    <>
      <Navbar navBarConfig={navbar} />
      {children}
      <Footer footerConfig={footer} />
    </>
  );
}
