import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata = {
  metadataBase: new URL("https://codewithturn.vercel.app"),
  title: {
    default: "SourceCode - Premium Source Code Marketplace | Buy & Download Production-Ready Code",
    template: "%s | SourceCode",
  },
  description:
    "Buy and download premium, production-ready source code for web apps, mobile apps, APIs, and more. Built with React, Next.js, Node.js, and modern frameworks. Ship faster, save development hours.",
  keywords: [
    "source code marketplace",
    "buy source code",
    "download code",
    "web development",
    "app development",
    "React templates",
    "Next.js projects",
    "Node.js boilerplate",
    "MERN stack",
    "production-ready code",
  ],
  authors: [{ name: "Pravinkumar" }],
  creator: "SourceCode",
  publisher: "SourceCode",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://codewithturn.vercel.app",
    siteName: "SourceCode",
    title: "SourceCode - Premium Source Code Marketplace",
    description:
      "Buy and download premium, production-ready source code for web apps, mobile apps, APIs, and more. Ship faster with expert-crafted code.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SourceCode - Premium Source Code Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SourceCode - Premium Source Code Marketplace",
    description:
      "Buy and download premium, production-ready source code. Ship faster with expert-crafted code.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
};

export const viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={geist.variable}>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8297143671299368"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
