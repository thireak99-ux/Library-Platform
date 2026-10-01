"use client";

import Image from "next/image";
import { BookOpen } from "lucide-react";
import { useState } from "react";

export function BookCover({ coverId, title, large = false }: { coverId?: number; title: string; large?: boolean }) {
  const [failed, setFailed] = useState(false);
  const source = coverId && coverId > 0 ? `https://covers.openlibrary.org/b/id/${coverId}-${large ? "L" : "M"}.jpg?default=false` : "";

  return (
    <div className="relative aspect-[2/3] w-full">
      {source && !failed ? <Image src={source} alt={`Cover of ${title}`} fill unoptimized sizes={large ? "(max-width: 640px) 230px, 280px" : "(max-width: 640px) 40vw, 180px"} className="object-contain drop-shadow-[3px_5px_4px_#18231525]" onError={() => setFailed(true)} /> : <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 border border-[#bcc6b4] bg-[#dfe6d7] px-2.5 py-[15px] text-center text-[#3b5543]"><BookOpen size={30} strokeWidth={1.2} aria-hidden="true" /><span className="line-clamp-3 text-sm leading-[1.3]">{title}</span><small className="text-[.6875rem] leading-[1.4]">No cover available</small></div>}
    </div>
  );
}
