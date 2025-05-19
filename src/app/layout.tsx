import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";
import { initEmailJS } from '../utils/emailjs';

// Initialize EmailJS
initEmailJS();
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Compact Seguridad y Construcción - Equipos de Protección Personal",
  description: "Proveedor líder de equipos de protección personal y seguridad industrial en Chiclayo, Perú. Ofrecemos soluciones integrales para la protección de los trabajadores.",
  keywords: "Equipos de Protección Personal, Seguridad Industrial, Chiclayo, Perú, Protección de Trabajadores, Equipo de Protección de Higiene, Equipo de Protección de Salud, Equipo de Protección de Trabajo, EPP, EPP Perú",
  authors: [{ name: "Compact Seguridad", url: "https://e-commerce-eta-roan.vercel.app" }],
  creator: "Compact Seguridad",
  publisher: "Compact Seguridad",
  openGraph: {
    title: "Compact Seguridad | Expertos en Protección Personal y Materiales de Construcción",
    description:
      "Distribuidores de confianza en equipos de protección personal certificados. Envíos a todo el Perú. Compra segura y rápida.",
    siteName: "Compact Seguridad",
    images: [
      {
        url: "https://e-commerce-eta-roan.vercel.app/og-image.jpg", // asegúrate de subir una imagen real
        width: 1200,
        height: 630,
        alt: "Compact Seguridad - EPP de alta calidad",
      },
    ],
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compact Seguridad | EPP y Materiales de Construcción",
    description:
      "Compra equipos de protección personal certificados. Envíos rápidos y seguros a todo el Perú. Compra online con confianza.",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>
          {children}
          <WhatsAppButton />
          <Toaster position="top-right" />
        </CartProvider>
      </body>
    </html>
  );
}
