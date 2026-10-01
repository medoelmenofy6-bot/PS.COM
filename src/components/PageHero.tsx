import { type ReactNode } from "react";
import { BrushHeading, BrushUnderline, KanjiMark } from "./brush";

/**
 * Shared page hero: small red caps label, huge brush heading, intro copy,
 * hero athlete artwork on the right with the red enso circle.
 */
export function PageHero({
  kicker,
  title,
  children,
  accent,
}: {
  kicker: string;
  title: ReactNode;
  children?: ReactNode;
  accent?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      {/* backdrop glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[480px] w-[480px] rounded-full opacity-25 blur-[120px]"
        style={{ background: "radial-gradient(circle, #d61f26 0%, transparent 70%)" }}
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 pb-10 pt-12 sm:px-6 md:pt-16 lg:grid-cols-2 lg:gap-4 lg:px-8">
        <div className="relative z-10">
          <p className="mb-4 text-sm font-extrabold uppercase tracking-[0.25em] text-[#e0252c]">
            {kicker}
          </p>
          <BrushHeading className="text-6xl sm:text-7xl lg:text-8xl">{title}</BrushHeading>
          {children && <div className="mt-6 max-w-xl text-[15px] leading-relaxed text-neutral-300">{children}</div>}
          {accent && (
            <div className="mt-6">
              <p className="font-brush text-lg text-[#e0252c]">{accent}</p>
              <BrushUnderline className="mt-1" />
            </div>
          )}
        </div>

        <div className="relative h-64 sm:h-80 lg:h-[420px]">
          <img
            src="/images/hero-athlete.png"
            alt="Parkour athlete jumping in front of a red enso circle"
            className="absolute inset-0 h-full w-full object-cover object-center [mask-image:linear-gradient(to_right,transparent,black_18%,black_88%,transparent)] lg:[mask-image:linear-gradient(to_right,transparent,black_22%)]"
            loading="eager"
          />
          <KanjiMark className="absolute -right-1 bottom-0 hidden text-[7rem] sm:block lg:text-[9rem]" />
        </div>
      </div>
    </section>
  );
}
