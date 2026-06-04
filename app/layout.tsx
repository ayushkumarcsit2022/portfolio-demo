import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gbenga Owadokun | Senior Network Security & Cybersecurity Engineer",
  description: "Senior Network & Cybersecurity Engineer with 10+ years of experience specializing in Palo Alto NGFW, Zero Trust architecture, SASE, Prisma SD-WAN, and cloud security architectures.",
  keywords: [
    "Gbenga Owadokun",
    "Network Security Engineer",
    "Cybersecurity Architect",
    "Palo Alto PCNSE",
    "Zero Trust Architecture",
    "Prisma SASE",
    "Cortex XDR",
    "Cisco CCNA",
    "Security Engineering"
  ],
  authors: [{ name: "Gbenga Owadokun" }],
  openGraph: {
    title: "Gbenga Owadokun | Senior Network Security & Cybersecurity Engineer",
    description: "Architecting the secure perimeter. Senior Engineer with 10+ years of experience specializing in Palo Alto firewalls, Zero Trust, and Cloud security.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gbenga Owadokun | Senior Network Security & Cybersecurity Engineer",
    description: "Architecting the secure perimeter. Senior Engineer with 10+ years of experience specializing in Palo Alto firewalls, Zero Trust, and Cloud security.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-text-primary">
        {children}
      </body>
    </html>
  );
}
