import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata = {
  title: "SourceCode - Premium Source Code Marketplace",
  description: "Buy and download premium source code projects. Build amazing apps with ready-to-use source code.",
  keywords: "source code, buy code, download code, web development, app development",
};

export const viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
