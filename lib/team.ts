export type ProjectPerson = {
  name: string;
  role: string;
  description: string;
  initials: string;
  image?: string;
};

export const mentor: ProjectPerson = {
  name: "Srorng Sokcheat",
  role: "Project Mentor",
  description: "Project mentor for LibriHub.",
  initials: "SS",
  image: "/images/teacher_Cheat.png",
};

export const team: ProjectPerson[] = [
  {
    name: "Chour Sothirak",
    role: "Project Lead",
    description: "Project lead for LibriHub.",
    initials: "CS",
    image: "/images/Rak.png",
  },
  {
    name: "Da Sreyoun",
    role: "Project Teammate",
    description: "Part of the LibriHub team.",
    initials: "DS",
    image: "/images/Sreyoun.png",
  },
  {
    name: "Ouch Sovannreach",
    role: "Project Teammate",
    description: "Part of the LibriHub team.",
    initials: "OS",
    image: "/images/Reach.png",
  },
  {
    name: "Kuy Sombathphirom",
    role: "Project Teammate",
    description: "Part of the LibriHub team.",
    initials: "KS",
    image: "/images/Phirom.png",
  },
  {
    name: "Sokea Sokkong",
    role: "Project Teammate",
    description: "Part of the LibriHub team.",
    initials: "SS",
    image: "/images/Kong.png",
  },
  {
    name: "Srin Piseth",
    role: "Project Teammate",
    description: "Part of the LibriHub team.",
    initials: "SP",
    image: "/images/Piseth.png",
  },
  {
    name: "Dem Rathanak Paknith",
    role: "Project Teammate",
    description: "Part of the LibriHub team.",
    initials: "SP",
    image: "/images/Paknith.png",
  },
];
