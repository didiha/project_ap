import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Providers from "./providers";
import Sidebar from "@/components/layout/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PG Dashboard",
  description: "Recruitment Dashboard Assignment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <div className="flex">
            {/* 사이드바 */}
            <Sidebar />

            {/* 메인 페이지 영역 */}
            <main className="flex-1 min-h-screen bg-gray-50">

              <div className="ml-56 p-6">
                {children}
              </div>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
