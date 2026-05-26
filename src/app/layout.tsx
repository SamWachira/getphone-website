import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "GetPhone Limited — Pan-African Smartphone Distribution",
    template: "%s | GetPhone",
  },
  description:
    "GetPhone Limited bridges global OEMs with vibrant African markets through reliable supply chains, strategic brand partnerships, and localized distribution networks across the continent.",
  keywords: [
    "GetPhone",
    "GetPhone Limited",
    "smartphone distribution",
    "Africa tech",
    "mobile supply chain",
    "OEM partner",
    "device financing",
    "wholesale electronics",
  ],
  metadataBase: new URL("https://getphonelimited.com"),
  icons: {
    icon: "/getphone_favicon.webp",
    apple: "/getphone_favicon.webp",
  },
  openGraph: {
    title: "GetPhone Limited — Pan-African Smartphone Distribution",
    description: "Bridging global OEMs with African markets through reliable supply chains and localized distribution.",
    type: "website",
    locale: "en_US",
    siteName: "GetPhone Limited",
    images: [
      {
        url: "/herobg2.png",
        width: 1200,
        height: 630,
        alt: "GetPhone Limited Global Operations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GetPhone Limited — Pan-African Smartphone Distribution",
    description: "Bridging global OEMs with African markets through reliable supply chains and localized distribution.",
    images: ["/herobg2.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
