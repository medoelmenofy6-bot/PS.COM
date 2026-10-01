import { Link } from "react-router";
import { ArrowRight, Brain, ShieldCheck, Users, Zap, Focus, Target, TrendingUp } from "lucide-react";
import { BrushButton, BrushHeading, KanjiMark } from "@/components/brush";
import { CtaBand } from "@/components/CtaBand";
import { LEVELS, LEVEL_HEX } from "@/data/site";

const FEATURES = [
  { icon: Zap, title: "BUILD STRENGTH", text: "Get stronger, move better, feel your best." },
  { icon: Brain, title: "IMPROVE FOCUS", text: "Train your mind as well as your body." },
  { icon: Users, title: "BE PART OF A COMMUNITY", text: "Make friends, grow together." },
  { icon: ShieldCheck, title: "SAFE & PROFESSIONAL", text: "Expert coaches, safe environment, structured training." },
];

const VALUES = [
  { icon: Focus, title: "DISCIPLINE", text: "Build good habits." },
  { icon: Target, title: "RESPECT", text: "For yourself and others." },
  { icon: TrendingUp, title: "PROGRESS", text: "Small steps. Big results." },
];

export default function Home() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-48 right-[-8%] h-[560px] w-[560px] rounded-full opacity-30 blur-[130px]"
          style={{ background: "radial-gradient(circle, #d61f26 0%, transparent 70%)" }}
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-14 sm:px-6 md:pt-20 lg:grid-cols-2 lg:px-8">
          <div className="relative z-10">
            <p className="mb-5 text-sm font-extrabold uppercase tracking-[0.3em] text-[#e0252c]">
              Parkour + Samurai
            </p>
            <BrushHeading className="text-5xl sm:text-6xl lg:text-7xl">
              TRAIN YOUR BODY. DISCIPLINE YOUR MIND.
            </BrushHeading>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-neutral-300">
              More than just movement. Parkour Samurai is a training center in Kuala Lumpur, where
              parkour meets discipline, strength and a stronger you.
            </p>
            <BrushButton to="/book" className="mt-8">
              Book Your Class
            </BrushButton>
          </div>

          <div className="relative h-72 sm:h-96 lg:h-[480px]">
            <img
              src="/images/hero-athlete.png"
              alt="Parkour athlete leaping in front of a red enso circle"
              className="absolute inset-0 h-full w-full object-cover object-center [mask-image:linear-gradient(to_right,transparent,black_20%,black_90%,transparent)] lg:[mask-image:linear-gradient(to_right,transparent,black_25%)]"
            />
            <KanjiMark className="absolute -right-2 bottom-0 hidden text-[8rem] sm:block lg:text-[10rem]" />
          </div>
        </div>

        {/* Feature row */}
        <div className="relative border-t border-white/10">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex flex-col items-center text-center">
                <span className="icon-ring">
                  <f.icon className="h-7 w-7" strokeWidth={1.8} />
                </span>
                <h3 className="mt-5 text-sm font-extrabold tracking-widest">{f.title}</h3>
                <p className="mt-2 max-w-[240px] text-sm text-neutral-400">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CLASSES FOR EVERY LEVEL ================= */}
      <section className="relative border-t border-white/10 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,340px)_1fr]">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-[#e0252c]">Our Classes</p>
              <BrushHeading as="h2" className="mt-3 text-4xl sm:text-5xl">
                CLASSES FOR EVERY LEVEL
              </BrushHeading>
              <p className="mt-5 text-[15px] leading-relaxed text-neutral-400">
                From complete beginners to advanced practitioners, our classes are designed to help you
                progress at your own pace, with expert coaching and real-world skills.
              </p>
              <Link to="/classes" className="pill-btn mt-7">
                View All Classes <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
              {LEVELS.map((lv, i) => (
                <Link
                  key={lv.id}
                  to="/levels"
                  className={`ink-card group overflow-hidden p-0 ${
                    i % 2 === 1 ? "lg:translate-y-4" : ""
                  }`}
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={lv.image}
                      alt={`Level ${lv.id} ${lv.name}`}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/55 to-transparent" />
                    <span
                      className="font-brush absolute left-4 top-4 text-3xl"
                      style={{ color: LEVEL_HEX[lv.color], textShadow: `0 0 18px ${LEVEL_HEX[lv.color]}` }}
                    >
                      L{lv.id}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <h3 className="text-sm font-extrabold tracking-wider">LEVEL {lv.id}</h3>
                      <p className="font-brush" style={{ color: LEVEL_HEX[lv.color] }}>
                        {lv.name}
                      </p>
                      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-neutral-400">{lv.short}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= MORE THAN A GYM ================= */}
      <section className="relative overflow-hidden border-t border-white/10">
        <div className="mx-auto grid max-w-7xl items-stretch gap-0 lg:grid-cols-[2fr_3fr]">
          <div className="relative min-h-[300px]">
            <img
              src="/images/about-back.png"
              alt="Athlete overlooking the Kuala Lumpur skyline"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#060606] max-lg:bg-gradient-to-t" />
          </div>

          <div className="relative grid gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-12 lg:py-20">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-[#e0252c]">
                About Parkour Samurai
              </p>
              <BrushHeading as="h2" className="mt-3 text-4xl sm:text-5xl">
                MORE THAN A GYM
              </BrushHeading>
              <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-neutral-400">
                We are a parkour and movement training center in Kuala Lumpur, built on the values of
                discipline, respect and self-improvement. Our goal is to help you move better, think
                stronger, and become the best version of yourself.
              </p>
              <Link to="/about" className="pill-btn mt-7">
                Learn More <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="flex flex-row justify-between gap-8 lg:flex-col lg:justify-center">
              {VALUES.map((v) => (
                <div key={v.title} className="flex items-center gap-4">
                  <v.icon className="h-8 w-8 shrink-0 text-[#e0252c]" strokeWidth={1.6} />
                  <div>
                    <h4 className="text-sm font-extrabold tracking-widest">{v.title}</h4>
                    <p className="text-xs text-neutral-400">{v.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <KanjiMark className="absolute -right-3 top-6 text-[6rem] opacity-70 lg:text-[8rem]" />
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <CtaBand />
    </>
  );
}
