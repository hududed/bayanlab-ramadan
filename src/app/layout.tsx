import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ramadan Finder | Powered by BayanLab",
  description:
    "Find masajid, halal restaurants, and halal markets near you this Ramadan. Powered by the BayanLab API.",
  openGraph: {
    title: "Ramadan Finder",
    description:
      "Find masajid, halal eateries, and halal markets near you this Ramadan.",
    url: "https://ramadan.bayanlab.com",
    siteName: "Ramadan Finder",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
