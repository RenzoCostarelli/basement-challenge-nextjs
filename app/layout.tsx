import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans antialiased ${geist.className} ${geistMono.className}`}
      >
        {children}
      </body>
    </html>
  );
}
