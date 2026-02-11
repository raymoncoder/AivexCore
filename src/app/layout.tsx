import type { Metadata } from "next";
import { inter, jetbrains } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neural-UI",
  description: "High-end Crypto & AI component library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} ${inter.variable} ${jetbrains.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
