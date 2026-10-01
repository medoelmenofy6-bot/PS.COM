import { Link } from "react-router";
import { ArrowRight, CalendarDays, MapPin, Mountain, ShieldCheck, Star, Swords, Users } from "lucide-react";
import { BrushHeading, BrushTag, KanjiMark } from "@/components/brush";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";

const VALUES = [
  {
    icon: Swords,
    title: "DISCIPLINE",
    text: "We build focus, control, and consistency — on and off the mat.",
  },
  {
    icon: Mountain,
    title: "PROGRESS",
    text: "Every step forward matters. We meet you where you are and help you grow.",
  },
  {
    icon: Users,
    title: "COMMUNITY",
    text: "You're not just a student — you're part of the Samurai family.",
  },
  {
    icon: ShieldCheck,
    title: "SAFETY",
    text: "Your well-being comes first. We train with proper guidance, structure, and care.",
  },
];

const STATS = [
  { icon: Users, value: "100+", label: "Students Trained" },
  { icon: CalendarDays, value: "5+", label: "Years of Experience" },
  { icon: Star, value: "4", label: "Levels of Progression" },
  { icon: MapPin, value: "Kuala Lumpur", label: "Our Home" },
];

const STORY_IMAGES = ["/images/class-basics.png", "/images/class-handstand.png", "/images/class-flip.png"];

export default function About() {
  return (
    <>
      <PageHero kicker="More Than Just A Gym." title="ABOUT US" accent="MOVE. GROW. BE A SAMURAI.">
        <p>
          Parkour Samurai is a training center in Kuala Lumpur focused on parkour, movement, and body
          control. We combine the discipline of the samurai with the freedom of parkour — helping
          people become stronger, braver, and more confident, both physically and mentally.
        </p>
      </PageHero>

      {/* ============ OUR STORY ============ */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <BrushTag>Our Story</BrushTag>
            <BrushHeading as="h2" className="mt-4 text-4xl sm:text-5xl">
              FROM PASSION TO PURPOSE
            </BrushHeading>
            <p className="mt-6 text-[15px] leading-relaxed text-neutral-400">
              Parkour Samurai started with a simple belief: movement can change lives. What began as a
              small community of enthusiasts has grown into a structured training center, where people
              of all ages and skill levels can learn, progress, and be part of something bigger.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-neutral-400">
              We are not just teaching parkour — we are building a community based on discipline,
              respect, and growth.
            </p>
          </div>

          <div className="relative flex items-center justify-center gap-3 sm:gap-5">
            {STORY_IMAGES.map((src, i) => (
              <div
                key={src}
                className={`ink-card relative w-1/3 overflow-hidden p-0 ${
                  i === 1 ? "rotate-2 lg:translate-y-3" : i === 0 ? "-rotate-2" : "rotate-1"
                }`}
              >
                <img src={src} alt="Parkour training" loading="lazy" className="aspect-[3/4] w-full object-cover" />
                <span className="absolute inset-0 border-2 border-[#e0252c]/40" aria-hidden />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ VALUES ============ */}
      <section className="border-t border-white/10 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BrushTag>Our Values</BrushTag>
          <div className="mt-4 flex flex-wrap items-end gap-6">
            <BrushHeading as="h2" className="text-4xl sm:text-5xl">
              WHAT WE STAND FOR
            </BrushHeading>
            <span className="ink-rule mb-3 hidden w-56 md:block" />
          </div>

          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title} className="flex flex-col items-center text-center">
                <span className="icon-ring">
                  <v.icon className="h-7 w-7" strokeWidth={1.7} />
                </span>
                <h3 className="font-brush mt-5 text-xl text-white">{v.title}</h3>
                <p className="mt-2 max-w-[240px] text-sm text-neutral-400">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TRAINERS / STATS ============ */}
      <section className="relative overflow-hidden border-t border-white/10 py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8">
          <div>
            <BrushTag>Who We Are</BrushTag>
            <BrushHeading as="h2" className="mt-4 text-4xl sm:text-5xl">
              TRAINERS. MENTORS. MOVEMENT LOVERS.
            </BrushHeading>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-neutral-400">
              Our team is made up of experienced coaches and passionate practitioners who live and
              breathe parkour. We're here to support you, challenge you, and help you reach your full
              potential — in a safe, fun, and motivating environment.
            </p>
            <Link to="/contact" className="pill-btn mt-7">
              Meet Our Team <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="ink-card relative p-8" style={{ borderColor: "#e0252c44" }}>
            <KanjiMark className="absolute -top-6 right-4 text-[5rem] opacity-60" />
            <ul className="grid gap-7 sm:grid-cols-2">
              {STATS.map((s) => (
                <li key={s.label} className="flex items-center gap-4">
                  <s.icon className="h-7 w-7 shrink-0 text-[#e0252c]" strokeWidth={1.7} />
                  <div>
                    <p className="text-lg font-extrabold text-[#e0252c]">{s.value}</p>
                    <p className="text-xs text-neutral-400">{s.label}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand kicker="READY TO TAKE THE NEXT STEP?" title="JOIN OUR COMMUNITY" sub="" cta="Book Your Class" />
    </>
  );
}
