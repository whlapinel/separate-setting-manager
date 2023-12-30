import { Roboto } from "next/font/google";
import { Metadata } from 'next';
import "./globals.css";
import Navbar from "./(components)/navbar";
import Footer from "./(components)/footer";
import { Suspense } from "react";
import { NavigationEvents } from "./(components)/navigation-events";
import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import { ClerkProvider } from "@clerk/nextjs";

const roboto = Roboto({weight: ["400"], subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Separate Setting Manager",
  description: "by Will Lapinel"
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={roboto.className}>
          
          <header>
            <Navbar/>
          </header>
          <main>{children}</main>
          <Suspense fallback={null}>
            <NavigationEvents />
          </Suspense>
          <footer>
            <Footer />
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
