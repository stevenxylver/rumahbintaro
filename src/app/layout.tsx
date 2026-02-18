import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Rumah Bintaro - Portal Properti Terpercaya",
    template: "%s | Rumah Bintaro"
  },
  description: "Temukan rumah impian Anda di Bintaro. Portal properti terpercaya dengan pilihan terbaik dan harga terjangkau.",
  keywords: ["properti", "rumah", "bintaro", "jual rumah", "tangerang selatan"],
  openGraph: {
    title: "Rumah Bintaro - Portal Properti Terpercaya",
    description: "Temukan rumah impian Anda di Bintaro",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} antialiased bg-gray-50`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
