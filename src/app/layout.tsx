import type { Metadata } from "next";
import { inter, jetbrains } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aivex-UI",
  description: "High-end Crypto & AI component library",
};

import { AivexToastProvider } from "@/components/ui/core/AivexToaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdn.hugeicons.com/font/hgi-stroke-rounded.css" />
      </head>
      <body
        className={`${inter.className} ${inter.variable} ${jetbrains.variable} font-sans antialiased`}
      >
        <AivexToastProvider>
          {children}
        </AivexToastProvider>
      </body>
    </html>
  );
}
