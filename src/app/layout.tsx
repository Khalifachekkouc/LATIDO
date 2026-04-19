import type { Metadata } from "next";
import { Archivo, Archivo_Black, Space_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const archivoblack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo-black",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LATIDO — Every Bite Drops a Beat",
  description: "Fast food with rhythm. Burgers, Tacos, Shots & more — order via WhatsApp instantly.",
  keywords: "latido, fast food, burgers, tacos, fes, morocco",
  openGraph: {
    title: "LATIDO — Every Bite Drops a Beat",
    description: "Fast food with rhythm. Order now.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`scroll-smooth ${archivo.variable} ${archivoblack.variable} ${spaceMono.variable}`}>
      <body>
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
