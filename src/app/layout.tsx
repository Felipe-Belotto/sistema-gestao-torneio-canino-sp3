import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import dynamic from "next/dynamic";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";
import Header from "@/components/layout/Header";
import HeaderDesktop from "@/components/layout/HeaderDesktop";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Carregamento dinâmico do Sidebar para evitar problemas de SSR
const DynamicSidebar = dynamic(
  () => import("@/components/layout/sidebar/Sidebar"),
  {
    ssr: false,
  }
);

export const metadata: Metadata = {
  title: "3º Torneio de Cães de Polícia do Interior Paulista",
  description:
    "Participe do 3º Torneio de Cães de Polícia do Interior Paulista. Um evento emocionante que destaca as habilidades e o trabalho em equipe de cães e seus condutores.",
  keywords:
    "torneio, cães de polícia, interior paulista, evento, competição, faro de drogas",
  authors: [{ name: "Organização do Evento", url: "https://www.exemplo.com" }],
  openGraph: {
    title: "3º Torneio de Cães de Polícia do Interior Paulista",
    description:
      "Venha prestigiar o 3º Torneio de Cães de Polícia do Interior Paulista, um evento que une adrenalina e trabalho em equipe.",
    url: "https://www.exemplo.com",
    siteName: "Torneio de Cães de Polícia",
    images: [
      {
        url: "/images/banner.png",
        width: 800,
        height: 600,
        alt: "Banner do 3º Torneio de Cães de Polícia do Interior Paulista",
      },
    ],
    locale: "pt-BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@exemplo",
    title: "3º Torneio de Cães de Polícia do Interior Paulista",
    description: "Um evento que celebra as habilidades de cães de polícia.",
    image: "/images/banner.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} font-sans antialiased flex flex-col text-primary w-full h-full`}
      >
        <Providers>
          <Suspense fallback={<div>Loading...</div>}>
            <DynamicSidebar />
            <HeaderDesktop />
            <main className="flex-grow overflow-auto">{children}</main>
            <Header />
          </Suspense>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
