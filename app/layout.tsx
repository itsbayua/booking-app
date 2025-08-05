import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home",
  description: "Online Booking Hotel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${raleway.variable} antialiased`}>
        <SessionProvider>
          <Navbar />
          <main className="bg-gray-50 min-h-screen">{children}</main>
          <Footer />
        </SessionProvider>
     
      </body>
    </html>
  );
}
