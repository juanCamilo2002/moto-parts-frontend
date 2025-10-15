import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/Providers";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Moto Parts",
  description: "A Progressive Web App built with Next.js 15",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <ServiceWorkerRegister />
        {children}
      </body>
    </html>
    </Providers>
    
  );
}
