"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Bookmark, Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

const menu = [
  { title: "Home", url: "/" },
  { title: "Browse Subjects", url: "/#subjects" },
  { title: "About Us", url: "/about" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="border-b border-[#e0e2d8] bg-[#fffefa]">
      <div className="mx-auto w-[calc(100%-32px)] min-[561px]:w-[calc(100%-40px)] min-[761px]:w-[calc(100%-48px)] min-[1101px]:max-w-[1200px] min-[1101px]:w-[calc(100%-80px)] flex min-h-[72px] items-center justify-between gap-2.5 min-[561px]:gap-3.5 min-[761px]:min-h-[84px] min-[761px]:gap-8">
        <Logo />
        <nav aria-label="Main navigation" className="ml-auto mr-0 hidden items-center gap-5 text-sm min-[761px]:flex min-[1101px]:mr-9 min-[1101px]:gap-[30px]">
          {menu.map((item) => <Link className="relative py-[30px] hover:text-[#174e3b] aria-[current=page]:text-[#174e3b] aria-[current=page]:after:absolute aria-[current=page]:after:right-0 aria-[current=page]:after:bottom-[18px] aria-[current=page]:after:left-0 aria-[current=page]:after:h-0.5 aria-[current=page]:after:bg-[#174e3b] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#367557]" key={item.title} href={item.url} prefetch={false} aria-current={pathname === item.url ? "page" : undefined}>{item.title}</Link>)}
        </nav>
        <Link href="/my-library" className="ml-auto inline-flex min-h-11 items-center justify-center gap-[9px] rounded-md border border-[#e0e2d8] bg-transparent px-[11px] py-[9px] text-xs font-semibold leading-[1.4] text-[#174e3b] transition-colors hover:bg-[#e9eee6] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#367557] min-[561px]:px-[18px] min-[561px]:py-2.5 min-[561px]:text-sm min-[761px]:ml-0 max-[560px]:[&_svg]:hidden"><Bookmark size={17} aria-hidden="true" />My Library</Link>
        <Button className="hidden border-[#e0e2d8] bg-transparent px-[11px] text-[#174e3b] hover:bg-[#e9eee6] max-[760px]:inline-flex" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</Button>
      </div>
      {open && <nav id="mobile-navigation" className="mx-auto flex w-[calc(100%-32px)] flex-col pb-5 min-[561px]:w-[calc(100%-40px)] min-[761px]:w-[calc(100%-48px)] min-[1101px]:max-w-[1200px] min-[1101px]:w-[calc(100%-80px)] [&_a]:border-t [&_a]:border-[#e0e2d8] [&_a]:py-3" aria-label="Mobile navigation">
        {menu.map((item) => <Link key={item.title} href={item.url} prefetch={false} onClick={() => setOpen(false)}>{item.title}</Link>)}
        <Link href="/my-library" onClick={() => setOpen(false)}>My Library</Link>
      </nav>}
    </header>
  );
}
