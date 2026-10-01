import { Check, Flame, Medal, Sparkles, Swords } from "lucide-react";
import { BrushButton, BrushHeading, BrushUnderline } from "@/components/brush";
import { PageHero } from "@/components/PageHero";
import { LEVELS, LEVEL_HEX, type LevelColor } from "@/data/site";

const LEVEL_ICONS: Record<LevelColor, typeof Flame> = {
  orange: Flame,
  red: Swords,
  blue: Sparkles,
  purple: Medal,
};

export default function Levels() {
  return (
    <>
      <PageHero kicker="Your Journey. Four Levels." title="LEVELS" accent="SAME SPIRIT. DIFFERENT CHALLENGES.">
        <p>
          At Parkour Samurai, we believe progress comes step by step. Our training is divided into 4
          levels, each designed to match your current ability and help you grow — physically,
          mentally, and as part of our community.
        </p>
      </PageHero>

      <section className="py-16 lg:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
          {LEVELS.map((lv) => {
            const hex = LEVEL_HEX[lv.color];
            const Icon = LEVEL_ICONS[lv.color];
            return (
              <article
                key={lv.id}
                className="ink-card grid overflow-hidden lg:grid-cols-[300px_1fr_minmax(0,1.2fr)_minmax(0,0.9fr)]"
                style={{ borderColor: `${hex}44` }}
              >
                {/* Image */}
                <div className="relative h-56 lg:h-auto">
                  <img
                    src={lv.image}
                    alt={`Level ${lv.id} ${lv.name}`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent lg:bg-gradient-to-r" />
                </div>

                {/* Title + description */}
                <div className="p-6 lg:p-8">
                  <p className="text-xs font-extrabold uppercase tracking-[0.25em]" style={{ color: hex }}>
                    Level {lv.id}
                  </p>
                  <BrushHeading as="h2" className="mt-2 text-4xl lg:text-5xl">
                    {lv.name.toUpperCase()}
                  </BrushHeading>
                  <p className="mt-1 text-sm font-extrabold uppercase tracking-widest" style={{ color: hex }}>
                    {lv.tagline}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-neutral-400">{lv.description}</p>
                </div>

                {/* Skills */}
                <ul className="flex flex-col justify-center gap-4 border-white/10 p-6 max-lg:border-t lg:border-l lg:p-8">
                  {lv.skills.map((s) => (
                    <li key={s} className="flex items-start gap-3 text-sm text-neutral-300">
                      <Icon className="mt-0.5 h-5 w-5 shrink-0" style={{ color: hex }} strokeWidth={1.8} />
                      {s}
                    </li>
                  ))}
                </ul>

                {/* Perfect for */}
                <div className="flex flex-col justify-center border-white/10 p-6 max-lg:border-t lg:border-l lg:p-8">
                  <span className="brush-tag" style={{ background: `linear-gradient(100deg, ${hex}, ${hex}bb)` }}>
                    Perfect For
                  </span>
                  <ul className="mt-5 flex flex-col gap-2.5">
                    {lv.perfectFor.map((p) => (
                      <li key={p} className="flex items-center gap-2.5 text-sm text-neutral-300">
                        <Check className="h-4 w-4" style={{ color: hex }} strokeWidth={3} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden border-t border-white/10 py-20 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[-160px] left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full opacity-25 blur-[110px]"
          style={{ background: "radial-gradient(circle, #d61f26 0%, transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-3xl px-4">
          <BrushHeading as="h2" className="text-4xl sm:text-5xl">
            DIFFERENT LEVELS. SAME FAMILY.
          </BrushHeading>
          <p className="mt-4 text-neutral-400">
            No matter where you start, you're part of the Parkour Samurai family. Train, grow, and
            achieve your next level with us.
          </p>
          <div className="mt-6 flex justify-center">
            <BrushUnderline />
          </div>
          <BrushButton to="/book" className="mt-8">
            Book Your Class
          </BrushButton>
        </div>
      </section>
    </>
  );
}
