import Link from "next/link";
import {
  Sparkles,
  Compass,
  BookText,
  History,
  FlaskConical,
  Code2,
  Feather,
  Heart,
  ArrowUpRight,
} from "lucide-react";
import { subjectPath } from "@/lib/format";

const subjects = [
  { label: "Fantasy", key: "fantasy", Icon: Sparkles },
  { label: "Adventure", key: "adventure", Icon: Compass },
  { label: "Fiction", key: "fiction", Icon: BookText },
  { label: "History", key: "history", Icon: History },
  { label: "Science", key: "science", Icon: FlaskConical },
  { label: "Programming", key: "programming", Icon: Code2 },
  { label: "Poetry", key: "poetry", Icon: Feather },
  { label: "Romance", key: "romance", Icon: Heart },
];

export function SubjectLinks() {
  return (
    <div className="grid grid-cols-2 gap-3 min-[761px]:grid-cols-4">
      {subjects.map(({ label, key, Icon }) => (
        <Link
          href={subjectPath(key)}
          key={key}
          prefetch={false}
          className="flex items-center gap-3 rounded-md border border-[#e0e2d8] bg-[#fffefa] px-[17px] py-[15px] text-sm text-[#252d29] hover:border-[#829d85] hover:bg-[#f1f4eb] dark:border-[#405747] dark:bg-[#26382d] dark:text-[#f1f5ef] dark:hover:border-[#85ad90] dark:hover:bg-[#314838] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#367557] max-[560px]:gap-[9px] max-[560px]:p-3"
        >
          <Icon
            className="shrink-0 text-[#174e3b] dark:text-[#b2dec0]"
            size={20}
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <span>{label}</span>
          <ArrowUpRight
            className="ml-auto text-[#7a8779] dark:text-[#b2c5b7] max-[560px]:hidden"
            size={15}
            aria-hidden="true"
          />
        </Link>
      ))}
    </div>
  );
}