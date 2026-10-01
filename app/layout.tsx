import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LibraryProvider } from "@/components/library-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "LibriHub — Find your next chapter", template: "%s | LibriHub" },
  description: "Discover books, explore authors, and keep a personal reading list with LibriHub. Powered by Open Library.",
  applicationName: "LibriHub",
  keywords: ["LibriHub", "book discovery", "book search", "authors", "reading list", "Open Library"],
  openGraph: {
    type: "website",
    siteName: "LibriHub",
    title: "LibriHub — Find your next chapter",
    description: "Discover books, explore authors, and keep a personal reading list with LibriHub.",
  },
  twitter: {
    card: "summary",
    title: "LibriHub — Find your next chapter",
    description: "Discover books, explore authors, and keep a personal reading list with LibriHub.",
  },
  icons: { icon: "/favicon.svg" },
};

const nunito = localFont({
  src: [
    { path: "../public/fonts/nunito-latin-wght-normal.woff2", style: "normal", weight: "200 1000" },
    { path: "../public/fonts/nunito-latin-wght-italic.woff2", style: "italic", weight: "200 1000" },
  ],
  display: "swap",
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="scroll-smooth scroll-pt-8 motion-reduce:scroll-auto"><body className={`${nunito.className} min-h-screen bg-[#faf9f5] text-base leading-[1.6] text-[#252d29]`}><LibraryProvider><a className="fixed top-[-100px] left-5 z-[100] bg-[#174e3b] px-5 py-3 text-white focus:top-2.5 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#367557]" href="#main-content">Skip to content</a><SiteHeader /><main id="main-content" className="mx-auto w-[calc(100%-32px)] min-[561px]:w-[calc(100%-40px)] min-[761px]:w-[calc(100%-48px)] min-[1101px]:max-w-[1200px] min-[1101px]:w-[calc(100%-80px)] min-h-[calc(100vh-252px)] pb-16">{children}</main><SiteFooter /></LibraryProvider></body></html>;
}
