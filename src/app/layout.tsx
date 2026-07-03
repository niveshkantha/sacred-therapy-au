import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sacred Therapy — A Sanctuary For Becoming",
  description:
    "A digital sanctuary for emotional healing, nervous system regulation, hypnotherapy and breathwork. For women becoming, quietly.",
  openGraph: {
    title: "Sacred Therapy — A Sanctuary For Becoming",
    description: "A sanctuary for the quiet work of becoming.",
    type: "website",
    siteName: "Sacred Therapy AU",
  },
  twitter: {
    card: "summary",
    site: "@SacredTherapyAU",
    title: "Sacred Therapy — A Sanctuary For Becoming",
    description:
      "A digital sanctuary for emotional healing, nervous system regulation, hypnotherapy and breathwork.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
