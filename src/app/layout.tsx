import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Hotel JD Villa - Luxury Accommodation in Goa | Direct Booking",
  description: "Experience luxury and comfort at Hotel JD Villa in Goa. Book directly for the best rates. Premium rooms, modern amenities, and exceptional service await you.",
  keywords: ["hotel in Goa", "luxury hotel", "Goa accommodation", "beach hotel", "direct booking", "Hotel JD Villa"],
  authors: [{ name: "Hotel JD Villa" }],
  openGraph: {
    title: "Hotel JD Villa - Luxury Accommodation in Goa",
    description: "Experience luxury and comfort at Hotel JD Villa in Goa. Book directly for the best rates.",
    type: "website",
    locale: "en_IN",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
