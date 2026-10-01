import { BrushButton, BrushHeading, KanjiMark } from "./brush";

/** Full-width call-to-action band with the torii / red-sun artwork. */
export function CtaBand({
  kicker = "READY TO MOVE?",
  title = "JOIN OUR CLASSES TODAY!",
  sub = "Be stronger. Be freer. Be a Samurai.",
  cta = "Book Your Class",
}: {
  kicker?: string;
  title?: string;
  sub?: string;
  cta?: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <img
        src="/images/cta-wide.png"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e0252c]/70 to-transparent" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-24">
        <p className="text-sm font-extrabold uppercase tracking-[0.3em] text-[#e0252c]">{kicker}</p>
        <BrushHeading as="h2" className="mt-4 text-4xl sm:text-5xl lg:text-6xl">
          {title}
        </BrushHeading>
        <p className="mt-4 text-neutral-300">{sub}</p>
        <BrushButton to="/book" className="mt-8">
          {cta}
        </BrushButton>
      </div>

      <KanjiMark className="absolute -right-4 bottom-2 text-[8rem] opacity-80 sm:text-[10rem]" />
    </section>
  );
}
