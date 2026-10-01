import Link from "next/link";
import { Logo } from "@/components/logo";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const links = [
  { name: "About Us", href: "/about" },
  { name: "My Library", href: "/my-library" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[#e0e2d8] bg-[#f3f3ec] py-8 [&_a:hover]:text-[#174e3b] [&_.logo]:text-[1.4rem] [&_.logo-mark]:size-[30px]">
      <div className="mx-auto w-[calc(100%-32px)] max-w-[1200px] sm:w-[calc(100%-40px)] lg:w-[calc(100%-80px)]">
        <div className="flex flex-col gap-6 border-b border-[#e0e2d8] pb-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Logo />
            <p className="mt-3 text-sm text-[#646b62]">
              A little curiosity. A new chapter.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-6 text-sm">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-6 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#646b62]">
            Book data & covers from{" "}
            <a
              className="inline-flex items-center gap-1 underline underline-offset-4"
              href="https://openlibrary.org"
              target="_blank"
              rel="noreferrer"
            >
              Open Library
              <ArrowUpRight size={14} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#646b62]">
              Organized and sponsored by
            </p>

            <div className="flex items-center ml-6 gap-4">
              <Image
                src="/images/istad.png"
                alt="ISTAD logo"
                width={72}
                height={72}
                className="h-[72px] w-[72px] shrink-0 rounded-full object-contain"
              />
              <p className="text-xl font-bold text-[#252d29]">ISTAD</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
