import { Link } from "react-router";
import { ArrowRight, Brain, ChartNoAxesColumn, PersonStanding, Repeat, ShieldCheck, Dumbbell, Users } from "lucide-react";
import { BrushHeading, BrushTag } from "@/components/brush";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { CLASS_OFFERS, LEVELS, LEVEL_HEX } from "@/data/site";

const OFFER_ICONS = {
  run: PersonStanding,
  flow: Repeat,
  strength: Dumbbell,
  handstand: ChartNoAxesColumn,
} as const;

const BENEFITS = [
  { icon: ShieldCheck, title: "Safe Environment", text: "Learn with proper guidance and safety." },
  { icon: ChartNoAxesColumn, title: "Build Strength", text: "Get stronger, inside and out." },
  { icon: Brain, title: "Improve Focus", text: "Train your mind as well as your body." },
  { icon: Users, title: "Be Part of a Community", text: "Train, make friends, grow together." },
];

const LEVEL_BLURBS = [
  "Get started with the basics and build confidence.",
  "Learn more complex moves and improve control.",
  "Take on bigger challenges with speed, strength and flow.",
  "Master advanced skills and high-level movements.",
];

export default function Classes() {
  return (
    <>
      <PageHero kicker="Train. Move. Grow." title="CLASSES">
        <p>
          At Parkour Samurai, we offer structured classes for all skill levels. Whether you're a
          beginner or an advanced athlete, our classes help you build strength, confidence, and real
          parkour skills in a safe and supportive environment.
        </p>
      </PageHero>

      {/* ============ WHAT WE OFFER ============ */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BrushTag>Our Classes</BrushTag>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <BrushHeading as="h2" className="text-4xl sm:text-5xl">
              What We Offer
            </BrushHeading>
            <span className="ink-rule hidden w-64 md:block" />
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {CLASS_OFFERS.map((c) => {
              const Icon = OFFER_ICONS[c.icon];
              return (
                <article key={c.title} className="ink-card group overflow-hidden">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={c.image}
                      alt={c.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0c] via-transparent to-transparent" />
                  </div>
                  <div className="p-5">
                    <Icon className="h-7 w-7 text-[#e0252c]" strokeWidth={1.8} />
                    <h3 className="mt-3 text-base font-bold">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-400">{c.description}</p>
                    <Link
                      to="/book"
                      className="mt-4 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-[#e0252c] hover:underline"
                    >
                      Learn More <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ FIND YOUR LEVEL ============ */}
      <section className="border-t border-white/10 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,320px)_1fr]">
            <div>
              <BrushTag>Class Levels</BrushTag>
              <BrushHeading as="h2" className="mt-4 text-4xl sm:text-5xl">
                Find Your Level
              </BrushHeading>
              <p className="mt-5 text-[15px] leading-relaxed text-neutral-400">
                Our classes are divided into levels to ensure the best learning experience for
                everyone. You'll progress step by step, at your own pace, with the right challenges
                and support.
              </p>
              <Link to="/levels" className="pill-btn mt-7">
                View Full Levels <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
              {LEVELS.map((lv, i) => (
                <div key={lv.id} className="ink-card p-5">
                  <span
                    className="font-brush inline-block text-4xl italic"
                    style={{
                      color: LEVEL_HEX[lv.color],
                      textShadow: `0 0 16px ${LEVEL_HEX[lv.color]}66`,
                      transform: "rotate(-4deg)",
                    }}
                  >
                    L{lv.id}
                  </span>
                  <h3 className="mt-3 text-sm font-extrabold tracking-wider">LEVEL {lv.id}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-400">{LEVEL_BLURBS[i]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ BENEFITS ============ */}
      <section className="border-t border-white/10 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BrushTag>Why Join?</BrushTag>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <BrushHeading as="h2" className="text-4xl sm:text-5xl">
              Benefits of Our Classes
            </BrushHeading>
            <span className="ink-rule hidden w-64 md:block" />
          </div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b) => (
              <div key={b.title} className="flex items-start gap-4">
                <span className="icon-ring !h-14 !w-14 shrink-0">
                  <b.icon className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <div>
                  <h3 className="text-sm font-extrabold tracking-wide">{b.title}</h3>
                  <p className="mt-1.5 text-sm text-neutral-400">{b.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
