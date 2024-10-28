import type { Metadata } from "next";
import "./globals.css";

import { cn } from "@/lib/utils";


export const metadata: Metadata = {
  title: "MedHealthCatalyst",
  description: "A healthcare management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(`min-h-screen bg-dark-300  font-mono`)}
      >
        {children}
      </body>
    </html>
  );
}
