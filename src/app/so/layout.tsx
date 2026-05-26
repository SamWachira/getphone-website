import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "GetPhone Somalia — Affordable Smartphones & Flexible Payments",
    template: "%s | GetPhone Somalia",
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
  ],
  openGraph: {
    title: "GetPhone Somalia — Affordable Smartphones & Flexible Payments",
    description: "Access quality smartphones through flexible installment plans across Somalia with trusted telecom integration.",
    images: [
      {
        url: "/a36many.webp",
        width: 1200,
        height: 630,
        alt: "GetPhone Somalia Catalog",
      },
    ],
  },
};

export default function SomaliaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <Chatbot />
    </>
  );
}
