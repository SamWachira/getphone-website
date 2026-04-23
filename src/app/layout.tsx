import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
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
    default: "GetPhone — Affordable Smartphones, Flexible Payments",
    template: "%s | GetPhone",
  },
  description:
    "GetPhone helps people and businesses in Somalia access quality smartphones through flexible installment plans, trusted telecom integration, and daily connectivity benefits.",
  keywords: [
    "GetPhone",
    "smartphone financing",
    "Somalia",
    "installment plans",
    "affordable phones",
    "ZTE",
    "Hormuud",
    "EVC Plus",
    "device financing",
  ],
  metadataBase: new URL("https://getphonelimited.com"),
  icons: {
    icon: "/getphone_favicon.webp",
    apple: "/getphone_favicon.webp",
  },
  openGraph: {
    title: "GetPhone — Affordable Smartphones, Flexible Payments",
    description:
      "Access quality smartphones through flexible installment plans across Somalia.",
    type: "website",
    locale: "en_US",
    siteName: "GetPhone",
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
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
