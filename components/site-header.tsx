"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Bookmark, Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const menu = [
  { title: "Home", url: "/" },
  { title: "Browse Subjects", url: "/#subjects" },
  { title: "About Us", url: "/about" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="border-b border-[#e0e2d8] bg-[#fffefa] dark:border-[#405747] dark:bg-[#202b23]">
      <div className="mx-auto flex min-h-[72px] w-[calc(100%-32px)] items-center gap-2 min-[561px]:w-[calc(100%-40px)] min-[761px]:w-[calc(100%-48px)] min-[1101px]:min-h-[84px] min-[1101px]:w-[calc(100%-80px)] min-[1101px]:max-w-[1200px] min-[1101px]:gap-6">
        <Logo />

        <nav
          aria-label="Main navigation"
          className="ml-auto hidden items-center gap-6 text-sm min-[1101px]:flex"
        >
          {menu.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              prefetch={false}
              aria-current={pathname === item.url ? "page" : undefined}
              className="relative py-[30px] hover:text-[#174e3b] dark:hover:text-[#b2dec0] aria-[current=page]:text-[#174e3b] dark:aria-[current=page]:text-[#b2dec0] aria-[current=page]:after:absolute aria-[current=page]:after:right-0 aria-[current=page]:after:bottom-[18px] aria-[current=page]:after:left-0 aria-[current=page]:after:h-0.5 aria-[current=page]:after:bg-[#174e3b] dark:aria-[current=page]:after:bg-[#b2dec0] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#367557]"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <Link
          href="/my-library"
          className="hidden min-h-11 items-center justify-center gap-2 rounded-md border border-[#e0e2d8] px-4 text-sm font-semibold text-[#174e3b] hover:bg-[#e9eee6] dark:border-[#536b59] dark:text-[#b2dec0] dark:hover:bg-[#314838] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#367557] min-[1101px]:inline-flex"
        >
          <Bookmark size={17} aria-hidden="true" />
          My Library
        </Link>

        <div className="ml-auto min-[1101px]:ml-0">
          <ThemeToggle />
        </div>

        <Button
          type="button"
          className="border-[#e0e2d8] bg-transparent px-3 text-[#174e3b] hover:bg-[#e9eee6] dark:border-[#536b59] dark:text-[#b2dec0] dark:hover:bg-[#314838] min-[1101px]:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <X size={20} aria-hidden="true" />
          ) : (
            <Menu size={20} aria-hidden="true" />
          )}
        </Button>
      </div>

      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="mx-auto flex w-[calc(100%-32px)] flex-col pb-5 min-[561px]:w-[calc(100%-40px)] min-[761px]:w-[calc(100%-48px)] min-[1101px]:hidden"
        >
          {menu.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              prefetch={false}
              onClick={() => setOpen(false)}
              className="border-t border-[#e0e2d8] py-3 dark:border-[#405747]"
            >
              {item.title}
            </Link>
          ))}
          <Link
            href="/my-library"
            onClick={() => setOpen(false)}
            className="border-t border-[#e0e2d8] py-3 dark:border-[#405747]"
          >
            My Library
          </Link>
        </nav>
      )}
    </header>
  );
}