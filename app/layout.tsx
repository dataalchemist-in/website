import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk, Young_Serif } from "next/font/google";
import "./globals.css";

const youngSerif = Young_Serif({
  variable: "--font-young-serif",
  weight: "400",
  subsets: ["latin"],
});

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
});

const title = "Data Alchemist: we make everyday business simple";
const description =
  "Data Alchemist is a product company from India. We take slow, paper-heavy work and turn it into small, clear products that anyone can use in a few taps.";
const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Data Alchemist",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://dataalchemist.in"),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Data Alchemist",
    locale: "en_IN",
    title,
    description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#ECEFEA",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${youngSerif.variable} ${schibstedGrotesk.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
