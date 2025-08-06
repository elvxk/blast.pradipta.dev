import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Email Blast Checker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head><meta name="apple-mobile-web-app-title" content="Blast Checker" /></head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="container mx-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
