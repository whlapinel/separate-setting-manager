import { Inter } from "next/font/google";
import styles from "./globals.css";
import Navbar from "./(components)/navbar";
import Footer from "./(components)/footer";

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
          <Navbar />
        </header>
        <main>{children}</main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
