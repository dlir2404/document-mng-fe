'use client'
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import { QueryClient, QueryClientProvider } from "react-query";
import AppProvider from "./app-provider";
import Header from "../../shared/components/layouts/Header";
import MainLayout from "../../shared/components/layouts/MainLayout";

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <MainLayout>
              {children}
            </MainLayout>
          </AppProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
