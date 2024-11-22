import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rick and Morty Characters",
  description: "A list of Rick and Morty characters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-neutral-100">{children}</body>
    </html>
  );
}
