import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from '@next/third-parties/google'

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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
      <body className={`${poppins.className} antialiased bg-gray-50`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
      </body>
    </html>
  );
}
