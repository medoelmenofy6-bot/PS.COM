export type LevelColor = "orange" | "red" | "blue" | "purple";

export interface Level {
  id: number;
  name: string;
  tagline: string;
  short: string;
  description: string;
  skills: string[];
  perfectFor: string[];
  ages: string;
  color: LevelColor;
  image: string;
}

export const LEVELS: Level[] = [
  {
    id: 1,
    name: "Foundation",
    tagline: "Build Your Basics",
    short: "Learn the basics, build confidence, and develop your core skills.",
    description:
      "Level 1 is the starting point. You'll learn the fundamentals of parkour — balance, vaults, landing, and safe movement. We focus on building your confidence and body control in a supportive environment.",
    skills: [
      "Basic movement techniques (balance, vaults, landing)",
      "Body control & coordination",
      "Safety and proper form",
      "Build confidence",
    ],
    perfectFor: ["Beginners", "No prior experience", "Ages 7+"],
    ages: "Ages 7+",
    color: "orange",
    image: "/images/level-1.png",
  },
  {
    id: 2,
    name: "Progression",
    tagline: "Build Your Strength",
    short: "Master complex movements, boost your strength, and improve control.",
    description:
      "Now you'll take it further. Level 2 focuses on more complex movements, increased strength, and better control. You'll be challenged to move with more speed, power, and precision.",
    skills: [
      "Advanced vaults & climbs",
      "Strength & endurance",
      "Better control & precision",
      "More complex combinations",
    ],
    perfectFor: ["Completed Level 1", "Want more challenge", "Ages 8+"],
    ages: "Ages 8+",
    color: "red",
    image: "/images/level-2.png",
  },
  {
    id: 3,
    name: "Mastery",
    tagline: "Expand Your Skills",
    short: "Refine your skills, add speed and flow, and take your parkour to the next level.",
    description:
      "Level 3 is where you start to connect movements and explore more advanced skills. You'll gain more freedom, fluidity, and confidence in your abilities.",
    skills: [
      "Flow and link movements",
      "Advanced techniques (e.g. wall runs, precision)",
      "Speed and agility",
      "Problem solving & creativity",
    ],
    perfectFor: ["Completed Level 2", "Confident with basics", "Ages 10+"],
    ages: "Ages 10+",
    color: "blue",
    image: "/images/level-3.png",
  },
  {
    id: 4,
    name: "Elite",
    tagline: "Push Your Limits",
    short: "Advanced combos, leadership, and coaching opportunities.",
    description:
      "Level 4 is for those who want to go beyond. You'll master advanced skills, complex flows, and prepare for real-world challenges — with a focus on discipline, consistency, and leadership.",
    skills: [
      "Advanced combinations & flow",
      "High-level skills (e.g. flips, precision, climbing)",
      "Mental focus & discipline",
      "Leadership & community",
    ],
    perfectFor: ["Completed Level 3", "Serious about parkour", "Ages 12+"],
    ages: "Ages 12+",
    color: "purple",
    image: "/images/level-4.png",
  },
];

export const LEVEL_HEX: Record<LevelColor, string> = {
  orange: "#f97316",
  red: "#e0252c",
  blue: "#3b82f6",
  purple: "#a855f7",
};

export interface ClassOffer {
  title: string;
  description: string;
  image: string;
  icon: "run" | "flow" | "strength" | "handstand";
}

export const CLASS_OFFERS: ClassOffer[] = [
  {
    title: "Parkour Basics",
    description:
      "Learn the fundamentals of parkour: balance, vaults, landing, and movement.",
    image: "/images/class-basics.png",
    icon: "run",
  },
  {
    title: "Freerunning",
    description:
      "Express yourself through flow, creativity and smooth movement.",
    image: "/images/class-flip.png",
    icon: "flow",
  },
  {
    title: "Strength & Conditioning",
    description:
      "Build the power, endurance and flexibility you need for better movement.",
    image: "/images/class-strength.png",
    icon: "strength",
  },
  {
    title: "Handstands & Calisthenics",
    description:
      "Master control, balance and body awareness with handstands and calisthenics.",
    image: "/images/class-handstand.png",
    icon: "handstand",
  },
];

export const TIME_SLOTS = [
  "9:00 AM - 11:00 AM",
  "11:00 AM - 1:00 PM",
  "2:00 PM - 4:00 PM",
  "4:00 PM - 6:00 PM",
  "6:00 PM - 8:00 PM",
];

export interface ScheduleCell {
  level: number;
  time: string;
}

// Weekly schedule: [timeRow][dayIndex 0=Mon..6=Sun]
export const SCHEDULE_ROWS: { time: string; cells: (ScheduleCell | null)[] }[] = [
  {
    time: "9:00 - 11:00 AM",
    cells: [null, { level: 1, time: "9:00 - 11:00" }, null, null, { level: 2, time: "9:00 - 11:00" }, null, null],
  },
  {
    time: "11:00 AM - 2:00 PM",
    cells: [null, null, null, { level: 3, time: "11:00 - 2:00" }, null, { level: 4, time: "11:00 - 2:00" }, null],
  },
  {
    time: "2:00 - 5:00 PM",
    cells: [{ level: 2, time: "2:00 - 5:00" }, null, { level: 1, time: "2:00 - 5:00" }, null, { level: 3, time: "2:00 - 5:00" }, null, { level: 4, time: "2:00 - 5:00" }],
  },
  {
    time: "5:00 - 7:00 PM",
    cells: [null, { level: 3, time: "5:00 - 7:00" }, null, { level: 4, time: "5:00 - 7:00" }, null, { level: 1, time: "5:00 - 7:00" }, null],
  },
  {
    time: "7:00 - 9:00 PM",
    cells: [{ level: 4, time: "7:00 - 9:00" }, null, { level: 2, time: "7:00 - 9:00" }, null, { level: 1, time: "7:00 - 9:00" }, { level: 3, time: "7:00 - 9:00" }, null],
  },
];

export const CLASS_TIMES = [
  { level: 1, name: "Foundation", time: "5:00 - 7:00 PM", days: "(Mon, Thu, Sat)" },
  { level: 2, name: "Progression", time: "2:00 - 5:00 PM", days: "(Mon, Fri, Sun)" },
  { level: 3, name: "Mastery", time: "11:00 AM - 2:00 PM", days: "(Thu, Sat)" },
  { level: 4, name: "Elite", time: "5:00 - 7:00 PM", days: "(Tue, Fri)" },
];

export const CONTACT = {
  location: "Parkour Samurai Training Center\nKuala Lumpur, Malaysia",
  locationNote: "(Exact location will be shared after booking or upon inquiry)",
  phone: "+60 12 345 6789",
  phoneNote: "(Mon - Sun, 9:00 AM - 9:00 PM)",
  email: "info@parkoursamurai.my",
  emailNote: "We usually reply within 24 hours.",
  hours: "Monday - Sunday\n9:00 AM - 9:00 PM",
};

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Classes", to: "/classes" },
  { label: "Levels", to: "/levels" },
  { label: "Schedule", to: "/schedule" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export const SOCIALS = [
  { name: "Instagram", handle: "@parkoursamurai", href: "https://instagram.com/parkoursamurai", icon: "instagram" },
  { name: "TikTok", handle: "@parkoursamurai", href: "https://tiktok.com/@parkoursamurai", icon: "tiktok" },
  { name: "YouTube", handle: "Parkour Samurai", href: "https://youtube.com/@parkoursamurai", icon: "youtube" },
  { name: "Facebook", handle: "Parkour Samurai", href: "https://facebook.com/parkoursamurai", icon: "facebook" },
] as const;
