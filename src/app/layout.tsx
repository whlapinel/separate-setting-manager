import { Roboto } from "next/font/google";
import { Metadata } from 'next';
import "./globals.css";
import Navbar from "./(components)/navbar";
import Footer from "./(components)/footer";
import { Suspense } from "react";
import { NavigationEvents } from "./(components)/navigation-events";
import { ClerkProvider } from "@clerk/nextjs";
import SideNav from "./(components)/side-nav";

const roboto = Roboto({ weight: ["400"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Separate Setting Manager",
  description: "by Will Lapinel"
};

const userOptions = [
  { name: 'User Home', url: `/` },
  { name: 'Apply for Role', url: `/apply-for-role` },
]

export default function RootLayout({ children }) {


  return (
    <ClerkProvider>
      <html lang="en">
        <body className={roboto.className}>
          <header>
            <Navbar />
          </header>
          <main className="grid grid-cols-[1fr_4fr] min-h-screen">
              {children}
          </main>
          <Suspense fallback={null}>
            <NavigationEvents />
          </Suspense>
          <footer className="text-center">
            <Footer />
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
