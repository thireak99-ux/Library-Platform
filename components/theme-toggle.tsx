"use client";

import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("librihub-theme");
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("librihub-theme", isDark ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Switch between light and dark mode"
      className="inline-flex size-11 items-center justify-center gap-2 rounded-md border border-[#e0e2d8] text-[#174e3b] hover:bg-[#e9eee6] dark:border-[#536b59] dark:text-[#b2dec0] dark:hover:bg-[#314838] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#367557] min-[1101px]:w-auto min-[1101px]:px-3"
    >
      <Moon size={18} className="dark:hidden" aria-hidden="true" />
      <Sun size={18} className="hidden dark:block" aria-hidden="true" />
      <span className="hidden min-[1101px]:inline dark:min-[1101px]:hidden">
        Dark mode
      </span>
      <span className="hidden dark:min-[1101px]:inline">
        Light mode
      </span>
    </button>
  );
}