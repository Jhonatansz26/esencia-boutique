import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloating from "@/components/common/WhatsAppFloating";
import PromotionProvider from "@/components/promotions/PromotionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const SITE_URL = "https://accesoriosesenciaboutique.com"; 
const SITE_TITLE = "Esencia Boutique — Joyería Minimalista de Autor";
const SITE_DESCRIPTION =
  "Piezas atemporales elaboradas con materiales premium. Acero inoxidable, oro laminado y piedras naturales, diseñadas para acompañar tu esencia.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Esencia Boutique",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "joyería minimalista",
    "joyería Colombia",
    "accesorios de autor",
    "manillas artesanales",
    "cadenas acero inoxidable",
    "joyería Barranquilla",
  ],
  authors: [{ name: "Esencia Boutique" }],
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: SITE_URL,
    siteName: "Esencia Boutique",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/images/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Esencia Boutique — Joyería minimalista",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/og-cover.jpg"],
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
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <PromotionProvider />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloating />
      </body>
    </html>
  );
}
