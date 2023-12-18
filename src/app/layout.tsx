import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./(components)/navbar";
import Footer from "./(components)/footer";
import { Suspense } from "react";
import { NavigationEvents } from "./(components)/navigation-events";
import SideNav from "./(components)/side-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Separate Setting Manager",
  description: "by Will Lapinel"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
  );
}
