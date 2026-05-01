import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Encrypted Wizards | Conjuring Digital Excellence",
  description: "IT Startup specializing in Web Development, Cybersecurity, and AI Solutions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth antialiased bg-background text-foreground`}>
      <body className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
