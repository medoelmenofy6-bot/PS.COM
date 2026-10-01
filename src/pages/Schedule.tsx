import { CalendarDays, CheckCircle2, Clock, Droplets, HeartPulse, MapPin, Users } from "lucide-react";
import { BrushTag } from "@/components/brush";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { CLASS_TIMES, LEVELS, LEVEL_HEX, SCHEDULE_ROWS } from "@/data/site";

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

function levelName(id: number) {
  return LEVELS.find((l) => l.id === id)?.name ?? "";
}
function levelColor(id: number) {
  const lv = LEVELS.find((l) => l.id === id);
  return lv ? LEVEL_HEX[lv.color] : "#e0252c";
}

const NOTES = [
  { icon: CheckCircle2, text: "Arrive 15 minutes early for warm-up and preparation." },
  { icon: Droplets, text: "Bring water, comfortable clothing, and athletic shoes." },
  { icon: HeartPulse, text: "Make sure you're in good health and inform us of any medical conditions." },
];

export default function Schedule() {
  return (
    <>
      <PageHero kicker="Train. Move. Grow." title="SCHEDULE">
        <p className="font-semibold text-white">Plan your week. Build your skills.</p>
        <p className="mt-3">
          Check out our weekly class schedule and find the perfect time to train. All classes are led
          by certified coaches and designed for every level — from beginners to advanced practitioners.
        </p>
      </PageHero>

      {/* ============ WEEKLY SCHEDULE ============ */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <BrushTag>Weekly Schedule</BrushTag>
            <p className="flex items-center gap-2 text-sm text-neutral-400">
              <CalendarDays className="h-4 w-4 text-[#e0252c]" />
              Semester Schedule (Updated: June 2025)
            </p>
          </div>

          <div className="ink-card mt-8 overflow-x-auto">
            <table className="w-full min-w-[860px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-4 text-left text-xs font-extrabold tracking-widest text-neutral-400">TIME</th>
                  {DAYS.map((d) => (
                    <th key={d} className="p-4 text-center text-xs font-extrabold tracking-widest text-neutral-300">
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SCHEDULE_ROWS.map((row) => (
                  <tr key={row.time} className="border-b border-white/5 last:border-0">
                    <td className="whitespace-nowrap p-4 text-xs font-bold text-[#e0252c]">{row.time}</td>
                    {row.cells.map((cell, i) => (
                      <td key={i} className="p-2 text-center">
                        {cell ? (
                          <div
                            className="mx-auto inline-flex min-w-[104px] flex-col rounded-lg border px-3 py-2"
                            style={{
                              borderColor: `${levelColor(cell.level)}66`,
                              background: `${levelColor(cell.level)}14`,
                            }}
                          >
                            <span className="text-xs font-extrabold tracking-wide" style={{ color: levelColor(cell.level) }}>
                              LEVEL {cell.level}
                            </span>
                            <span className="text-[11px] font-semibold text-neutral-200">{levelName(cell.level)}</span>
                            <span className="mt-0.5 text-[10px] text-neutral-500">{cell.time}</span>
                          </div>
                        ) : (
                          <span className="text-neutral-700">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============ DETAILS ============ */}
      <section className="border-t border-white/10 py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-3 lg:gap-8 lg:px-8">
          {/* Class details */}
          <div>
            <BrushTag>Class Details</BrushTag>
            <ul className="mt-7 flex flex-col gap-6">
              <li className="flex items-start gap-4">
                <Clock className="mt-0.5 h-6 w-6 shrink-0 text-[#e0252c]" strokeWidth={1.7} />
                <div>
                  <h4 className="text-sm font-bold">Duration</h4>
                  <p className="text-sm text-neutral-400">2 – 3 hours per class (varies by level)</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Users className="mt-0.5 h-6 w-6 shrink-0 text-[#e0252c]" strokeWidth={1.7} />
                <div>
                  <h4 className="text-sm font-bold">Class Size</h4>
                  <p className="text-sm text-neutral-400">Max 12 students (per coach)</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <MapPin className="mt-0.5 h-6 w-6 shrink-0 text-[#e0252c]" strokeWidth={1.7} />
                <div>
                  <h4 className="text-sm font-bold">Location</h4>
                  <p className="text-sm text-neutral-400">Parkour Samurai Training Center Kuala Lumpur, Malaysia</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Class times */}
          <div className="lg:border-l lg:border-white/10 lg:pl-10">
            <BrushTag>Class Times</BrushTag>
            <ul className="mt-7 flex flex-col gap-5">
              {CLASS_TIMES.map((ct) => (
                <li key={ct.level} className="flex items-center gap-4">
                  <span
                    className="inline-flex min-w-[64px] justify-center rounded-md px-2 py-1 text-xs font-extrabold"
                    style={{ background: `${levelColor(ct.level)}22`, color: levelColor(ct.level), border: `1px solid ${levelColor(ct.level)}55` }}
                  >
                    Level {ct.level}
                  </span>
                  <div>
                    <p className="text-sm font-bold">{ct.name}</p>
                    <p className="text-xs text-neutral-400">
                      {ct.time} <span className="text-neutral-500">{ct.days}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Important notes */}
          <div className="lg:border-l lg:border-white/10 lg:pl-10">
            <BrushTag>Important Notes</BrushTag>
            <ul className="mt-7 flex flex-col gap-6">
              {NOTES.map((n) => (
                <li key={n.text} className="flex items-start gap-4">
                  <n.icon className="mt-0.5 h-6 w-6 shrink-0 text-[#e0252c]" strokeWidth={1.7} />
                  <p className="text-sm text-neutral-300">{n.text}</p>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-xs font-extrabold tracking-[0.3em] text-[#e0252c]/80">
              RESPECT · FOCUS · PROGRESS
            </p>
          </div>
        </div>
      </section>

      <CtaBand kicker="READY TO TRAIN?" title="BOOK YOUR CLASS TODAY!" sub="" cta="Book Your Spot" />
    </>
  );
}
