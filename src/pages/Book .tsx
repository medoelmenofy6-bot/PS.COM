import { useMemo, useRef, useState, type FormEvent } from "react";
import {
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Clock,
  ShieldCheck,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { BrushButton, BrushHeading, BrushTag, KanjiMark } from "@/components/brush";
import { PageHero } from "@/components/PageHero";
import { LEVELS, LEVEL_HEX, TIME_SLOTS } from "@/data/site";
import { trpc } from "@/providers/trpc";

const PERKS = [
  { icon: Zap, title: "Quick Booking", text: "In just a few steps" },
  { icon: ShieldCheck, title: "Secure Payment", text: "Safe & easy" },
  { icon: Users, title: "Expert Coaches", text: "Professional & supportive" },
];

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const inputCls =
  "w-full rounded-md border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-neutral-500 outline-none transition-colors focus:border-[#e0252c] focus:ring-1 focus:ring-[#e0252c]/50 min-h-[44px]";

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function formatDisplay(d: Date) {
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

function formatISO(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function Book() {
  const [level, setLevel] = useState<number | null>(null);
  const today = useMemo(() => startOfDay(new Date()), []);
  const [viewMonth, setViewMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [date, setDate] = useState<Date | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [preferredLevel, setPreferredLevel] = useState<string>("");
  const [done, setDone] = useState<{ name: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);

  const mutation = trpc.booking.create.useMutation({
    onSuccess: (_r, vars) => {
      setDone({ name: vars.fullName });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    onError: (e) => setError(e.message),
  });

  // calendar cells: leading blanks so week starts on Monday
  const calendar = useMemo(() => {
    const first = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
    const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
    const lead = (first.getDay() + 6) % 7; // Mon=0
    const cells: (Date | null)[] = Array.from({ length: lead }, () => null);
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(new Date(viewMonth.getFullYear(), viewMonth.getMonth(), d));
    }
    return cells;
  }, [viewMonth]);

  const monthLabel = viewMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const selectedLevel = LEVELS.find((l) => l.id === level) ?? null;
  const canConfirm = !!(level && date && slot);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (!canConfirm) {
      setError("Please choose a class level, a date, and a time slot first.");
      step2Ref.current?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    const fd = new FormData(e.currentTarget);
    mutation.mutate({
      fullName: String(fd.get("fullName") ?? ""),
      age: Number(fd.get("age")),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      classLevel: level!,
      preferredLevel: preferredLevel ? Number(preferredLevel) : undefined,
      bookingDate: formatISO(date!),
      timeSlot: slot!,
      notes: String(fd.get("notes") ?? "") || undefined,
    });
  }

  if (done) {
    return (
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-4 py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[110px]"
          style={{ background: "radial-gradient(circle, #d61f26 0%, transparent 70%)" }}
        />
        <div className="ink-card relative max-w-lg p-10 text-center" style={{ borderColor: "#e0252c55" }}>
          <CheckCircle2 className="mx-auto h-16 w-16 text-[#e0252c]" strokeWidth={1.4} />
          <BrushHeading className="mt-5 text-4xl sm:text-5xl">YOU'RE BOOKED IN!</BrushHeading>
          <p className="mt-4 text-sm leading-relaxed text-neutral-300">
            Thanks{done.name ? `, ${done.name}` : ""}! Your booking request for{" "}
            <span className="font-bold text-white">
              Level {selectedLevel?.id} — {selectedLevel?.name}
            </span>{" "}
            on <span className="font-bold text-white">{date ? formatDisplay(date) : ""}</span> at{" "}
            <span className="font-bold text-white">{slot}</span> has been received.
          </p>
          <p className="mt-3 text-sm text-neutral-400">
            You'll receive a confirmation message with your booking details and payment instructions.
          </p>
          <BrushButton to="/" className="mt-8">
            Back to Home
          </BrushButton>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHero kicker="Book Your Class" title={<>TAKE THE FIRST STEP.</>}>
        <p>
          Choose your class, pick a time, and start your Parkour journey with us. It's fast, easy, and
          you're just a few clicks away from becoming stronger, braver, and more confident.
        </p>
      </PageHero>

      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-x-12 gap-y-5 px-4 py-7 sm:px-6 lg:px-8">
          {PERKS.map((p) => (
            <div key={p.title} className="flex items-center gap-3">
              <span className="icon-ring !h-12 !w-12">
                <p.icon className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <div>
                <p className="text-sm font-bold">{p.title}</p>
                <p className="text-xs text-neutral-500">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============ STEP 1: CHOOSE A CLASS ============ */}
      <section className="py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BrushTag>1. Choose a Class</BrushTag>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <BrushHeading as="h2" className="text-4xl sm:text-5xl">
              FIND YOUR LEVEL
            </BrushHeading>
            <p className="text-sm text-neutral-400">
              Not sure which class is right for you?{" "}
              <a href="/levels" className="font-semibold text-[#e0252c] underline underline-offset-4">
                Check our Levels →
              </a>
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {LEVELS.map((lv) => {
              const hex = LEVEL_HEX[lv.color];
              const active = level === lv.id;
              return (
                <button
                  key={lv.id}
                  type="button"
                  onClick={() => {
                    setLevel(lv.id);
                    setPreferredLevel(String(lv.id));
                  }}
                  className={`ink-card overflow-hidden p-0 text-left ${active ? "ring-2" : ""}`}
                  style={active ? { borderColor: hex, ["--tw-ring-color" as string]: hex } : { borderColor: `${hex}55` }}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={lv.image} alt={`Level ${lv.id} ${lv.name}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <span className="font-brush absolute bottom-2 left-4 text-2xl" style={{ color: hex }}>
                      LEVEL {lv.id}.
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-sm font-extrabold tracking-wider">
                      LEVEL {lv.id}{" "}
                      <span className="font-brush ml-1" style={{ color: hex }}>
                        {lv.name.toUpperCase()}
                      </span>
                    </h3>
                    <p className="mt-2 min-h-[60px] text-xs leading-relaxed text-neutral-400">{lv.short}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs text-neutral-400">
                        <Star className="h-3.5 w-3.5" style={{ color: hex }} /> {lv.ages}
                      </span>
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors ${
                          active ? "border-transparent" : "border-neutral-500"
                        }`}
                        style={active ? { background: hex } : undefined}
                      >
                        {active && <BadgeCheck className="h-4 w-4 text-white" />}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ STEP 2: DATE & TIME ============ */}
      <section ref={step2Ref} className="relative overflow-hidden border-t border-white/10 py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BrushTag>2. Select Date &amp; Time</BrushTag>
          <BrushHeading as="h2" className="mt-4 text-4xl sm:text-5xl">
            PICK A TIME THAT WORKS
          </BrushHeading>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr_0.9fr]">
            {/* Calendar */}
            <div className="ink-card p-5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-bold">
                  <CalendarDays className="h-4 w-4 text-[#e0252c]" /> {monthLabel}
                </span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    aria-label="Previous month"
                    className="flex h-9 w-9 items-center justify-center rounded-md text-neutral-300 hover:bg-white/10"
                    onClick={() =>
                      setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1))
                    }
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next month"
                    className="flex h-9 w-9 items-center justify-center rounded-md text-neutral-300 hover:bg-white/10"
                    onClick={() =>
                      setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1))
                    }
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[11px] font-bold tracking-wider text-neutral-500">
                {WEEKDAYS.map((d) => (
                  <span key={d} className="py-1">
                    {d}
                  </span>
                ))}
              </div>
              <div className="mt-1 grid grid-cols-7 gap-1">
                {calendar.map((d, i) => {
                  if (!d) return <span key={`x${i}`} />;
                  const past = d < today;
                  const isSelected = date && d.getTime() === date.getTime();
                  const isToday = d.getTime() === today.getTime();
                  return (
                    <button
                      key={d.toISOString()}
                      type="button"
                      disabled={past}
                      onClick={() => setDate(d)}
                      className={`flex min-h-[44px] items-center justify-center rounded-md text-sm transition-colors ${
                        isSelected
                          ? "bg-[#e0252c] font-bold text-white"
                          : past
                            ? "text-neutral-700"
                            : isToday
                              ? "border border-[#e0252c]/60 text-[#e0252c] hover:bg-[#e0252c]/15"
                              : "text-neutral-300 hover:bg-white/10"
                      }`}
                    >
                      {d.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time slots */}
            <div className="ink-card p-5">
              <p className="flex items-center gap-2 text-sm font-bold">
                <Clock className="h-4 w-4 text-[#e0252c]" /> Available Times
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {TIME_SLOTS.map((t) => {
                  const active = slot === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSlot(t)}
                      className={`flex min-h-[48px] items-center justify-between rounded-md border px-4 text-sm transition-colors ${
                        active
                          ? "border-[#e0252c] bg-[#e0252c] font-bold text-white"
                          : "border-white/15 text-neutral-300 hover:border-[#e0252c]/60"
                      }`}
                    >
                      {t}
                      {active && <BadgeCheck className="h-4 w-4" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Your selection */}
            <div className="ink-card relative overflow-hidden p-6" style={{ borderColor: "#e0252c44" }}>
              <img
                src="/images/booking-side.png"
                alt=""
                aria-hidden
                className="absolute inset-0 h-full w-full object-cover opacity-25"
                loading="lazy"
              />
              <div className="relative">
                <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#e0252c]">
                  Your Selection
                </p>
                <ul className="mt-6 flex flex-col gap-5 text-sm">
                  <li className="flex items-start gap-3">
                    <Users className="mt-0.5 h-5 w-5 shrink-0 text-[#e0252c]" strokeWidth={1.7} />
                    <div>
                      <p className="text-xs text-neutral-500">Class</p>
                      <p className="font-semibold">
                        {selectedLevel ? `Level ${selectedLevel.id} — ${selectedLevel.name}` : "Not selected"}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-[#e0252c]" strokeWidth={1.7} />
                    <div>
                      <p className="text-xs text-neutral-500">Date</p>
                      <p className="font-semibold">{date ? formatDisplay(date) : "Not selected"}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#e0252c]" strokeWidth={1.7} />
                    <div>
                      <p className="text-xs text-neutral-500">Time</p>
                      <p className="font-semibold">{slot ?? "Not selected"}</p>
                    </div>
                  </li>
                </ul>
                <BrushButton
                  className="mt-8 w-full"
                  onClick={() => step3Ref.current?.scrollIntoView({ behavior: "smooth" })}
                >
                  Next Step
                </BrushButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STEP 3: DETAILS ============ */}
      <section ref={step3Ref} className="relative overflow-hidden border-t border-white/10 py-14 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:px-8">
          <div>
            <BrushTag>3. Fill In Your Details</BrushTag>
            <BrushHeading as="h2" className="mt-4 text-4xl sm:text-5xl">
              BOOK YOUR SPOT
            </BrushHeading>

            <form onSubmit={submit} className="mt-8 grid gap-4 sm:grid-cols-2">
              <input name="fullName" required placeholder="Full Name *" className={inputCls} maxLength={120} />
              <input name="age" required type="number" min={5} max={100} placeholder="Age *" className={inputCls} />
              <input name="email" required type="email" placeholder="Email Address *" className={inputCls} maxLength={255} />
              <select
                name="preferredLevel"
                value={preferredLevel}
                onChange={(e) => setPreferredLevel(e.target.value)}
                className={`${inputCls} appearance-none`}
              >
                <option value="" className="bg-neutral-900">
                  Preferred Level (if any)
                </option>
                {LEVELS.map((lv) => (
                  <option key={lv.id} value={lv.id} className="bg-neutral-900">
                    Level {lv.id} — {lv.name}
                  </option>
                ))}
              </select>
              <input name="phone" required type="tel" placeholder="Phone Number *" className={inputCls} maxLength={40} />
              <input name="notes" placeholder="Additional Notes (optional)" className={inputCls} maxLength={1000} />

              {error && (
                <p className="flex items-center gap-2 text-sm text-red-400 sm:col-span-2">
                  <CircleAlert className="h-4 w-4" /> {error}
                </p>
              )}

              <p className="flex items-start gap-2 text-xs text-neutral-500 sm:col-span-2">
                <CircleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#e0252c]" />
                You'll receive a confirmation message with your booking details and payment instructions.
              </p>

              <div className="sm:col-span-2">
                <BrushButton type="submit" disabled={mutation.isPending} className="w-full sm:w-auto sm:min-w-[300px]">
                  {mutation.isPending ? "CONFIRMING..." : "CONFIRM BOOKING"}
                </BrushButton>
              </div>
            </form>
          </div>

          <div className="relative min-h-[320px] overflow-hidden rounded-2xl max-lg:hidden">
            <img
              src="/images/booking-side.png"
              alt="Silhouette of an athlete beside a torii gate under a red moon"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
            <div className="absolute bottom-6 right-6 text-right">
              <KanjiMark className="text-[5rem]" />
              <p className="font-brush mt-1 text-2xl leading-tight text-white">
                TRAIN
                <br />
                GROW
                <br />
                BELONG
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
