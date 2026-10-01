import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Bookmark, Compass } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { mentor, team, type ProjectPerson } from "@/lib/team";

export const metadata: Metadata = {
  title: "About Us",
  description: "Meet the mentor and student team behind LibriHub, a library discovery project.",
  openGraph: {
    title: "About Us | LibriHub",
    description: "Meet the mentor and student team behind LibriHub.",
  },
};

const features = [
  {
    Icon: Compass,
    title: "Find your next read",
    text: "Search the Open Library catalog and explore books by subject.",
  },
  {
    Icon: BookOpen,
    title: "Go beyond the cover",
    text: "Discover book descriptions, authors, and related subjects.",
  },
  {
    Icon: Bookmark,
    title: "Make it your own",
    text: "Save books in this browser and follow your reading progress.",
  },
];

function PersonPhoto({
  person,
  featured = false,
}: {
  person: ProjectPerson;
  featured?: boolean;
}) {
  return (
    <div
      className={`relative grid w-full place-items-center overflow-hidden bg-[#e8eee4] ${
        featured ? "h-[260px]" : "h-[240px]"
      }`}
    >
      {person.image ? (
        <Image
          src={person.image}
          alt={`Portrait of ${person.name}`}
          fill
          sizes="(max-width: 560px) 100vw, (max-width: 760px) 50vw, 33vw"
          className="object-cover object-center"
        />
      ) : (
        <span className="grid size-[84px] place-items-center rounded-full border border-[#c5d5c3] bg-[#f7f9f4] text-2xl font-bold tracking-[.03em] text-[#174e3b]">{person.initials}</span>
      )}
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <div className="pt-8 pb-[30px] min-[561px]:pt-11 max-w-[770px] !pt-[60px]">
        <p className="mb-3 text-[.6875rem] font-extrabold leading-normal tracking-[.15em] text-[#174e3b]">ABOUT LIBRIHUB</p>
        <h1 className="text-5xl font-bold leading-[1.2] tracking-[-.025em] max-[560px]:text-[2.45rem]">Built for curious readers.</h1>
        <p className="mt-[15px] leading-[1.8] text-[#646b62]">
          LibriHub is a student library discovery project: a quiet place to find
          books, meet their authors, and keep track of what you want to read.
        </p>
        <Link href="/#subjects" className="mt-[22px] inline-flex items-center gap-[7px] text-sm font-semibold text-[#174e3b] underline-offset-4 hover:underline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#367557]">
          Explore the bookshelf <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>

      <section
        className="mt-2.5 grid grid-cols-1 gap-[30px] border-y border-[#e0e2d8] py-[35px] min-[561px]:grid-cols-3 min-[561px]:gap-5 min-[761px]:gap-9"
        aria-label="What you can do on LibriHub"
      >
        {features.map(({ Icon, title, text }) => (
          <div key={title}>
            <Icon className="mb-[18px] text-[#174e3b]" size={26} strokeWidth={1.4} aria-hidden="true" />
            <h2 className="mb-3 text-2xl font-bold leading-[1.2] tracking-[-.025em]">{title}</h2>
            <p className="text-[.9375rem] text-[#646b62]">{text}</p>
          </div>
        ))}
      </section>

      <section
        className="mt-12 max-[560px]:mt-[38px]"
        aria-labelledby="mentor-heading"
      >
        <div className="mb-[22px]">
          <p className="mb-3 text-[.6875rem] font-extrabold leading-normal tracking-[.15em] text-[#174e3b]">THE PEOPLE BEHIND THE PROJECT</p>
          <h2 id="mentor-heading" className="text-[clamp(1.65rem,3vw,2.1rem)] font-bold leading-[1.2] tracking-[-.025em]">Meet Our Mentor</h2>
          <p className="mt-2 text-[.9375rem] text-[#646b62]">The mentor supporting our team as we learn and build LibriHub.</p>
        </div>

        <Card className="grid max-w-[860px] grid-cols-1 overflow-hidden rounded-[9px] shadow-none min-[561px]:grid-cols-[minmax(0,310px)_minmax(0,1fr)]">
          <PersonPhoto person={mentor} />
          <CardContent className="flex flex-col justify-center px-[22px] pt-[25px] pb-7 min-[561px]:px-[34px] min-[561px]:py-[30px]">
            <p className="mb-3 text-[.6875rem] font-extrabold leading-normal tracking-[.15em] text-[#174e3b]">{mentor.role}</p>
            <h3 className="text-[clamp(1.6rem,3vw,2.15rem)] font-bold leading-[1.2]">{mentor.name}</h3>
            <p className="mt-[13px] max-w-[40ch] text-[.9375rem] text-[#646b62]">{mentor.description}</p>
          </CardContent>
        </Card>
      </section>

      <section
        className="mt-12 max-[560px]:mt-[38px]"
        aria-labelledby="team-heading"
      >
        <div className="mb-[22px]">
          <p className="mb-3 text-[.6875rem] font-extrabold leading-normal tracking-[.15em] text-[#174e3b]">OUR PROJECT TEAM</p>
          <h2 id="team-heading" className="text-[clamp(1.65rem,3vw,2.1rem)] font-bold leading-[1.2] tracking-[-.025em]">Meet Our Team</h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {team.map((person, index) => (
            <Card
              key={person.name}
              className={`overflow-hidden rounded-[9px] shadow-none ${
                index === 0
                  ? "col-span-full w-full justify-self-center sm:w-1/2 lg:w-1/3"
                  : ""
              }`}
            >
              <PersonPhoto person={person} />
              <CardContent className="px-[22px] pt-[19px] pb-[25px]">
                <p className="mb-3 text-[.6875rem] font-extrabold leading-normal tracking-[.15em] text-[#174e3b]">{person.role}</p>
                <h3 className="break-words text-xl font-bold leading-[1.3]">{person.name}</h3>
                <p className="mt-[9px] text-sm text-[#646b62]">{person.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
