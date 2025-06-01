import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AC Repair Pro | Fast & Reliable Services",
  description: "Book professional AC & electrical repair services.",
  keywords: ["AC repair", "electrical services", "home maintenance"],
  openGraph: {
    images: "/og-image.png",
  },
  metadataBase: new URL("https://ac-repair-pro.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>

        {children}
        <Script id="schema" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HomeAndConstructionBusiness",
            "name": "AC Repair Pro",
            "serviceType": "AC Repair, Electrical Services",
          })}
        </Script>
      </body>
    </html>
  );
}