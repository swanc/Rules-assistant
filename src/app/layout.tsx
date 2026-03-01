import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Board Game Rules Assistant",
  description:
    "Ask questions about board game rules for Arcs, Root, and Pax Pamir 2nd Edition",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
