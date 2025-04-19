import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "sonner";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans"
})

export const metadata: Metadata = {
  title: "EduSphere | Modern Learning Management System",
  description: "A powerful learning platform with courses for students and teachers",
  icons: "./edusphere-favicon.svg"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${dmSans.className} flex flex-col min-h-screen bg-background text-gray-800`}>
          <Providers>
            <div className="flex flex-col min-h-screen">{children}</div>
            <Toaster richColors closeButton position="top-right" />  
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}