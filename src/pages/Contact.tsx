import { useState, type FormEvent } from "react";
import { Clock, Facebook, Instagram, Mail, MapPin, Phone, Youtube, CheckCircle2 } from "lucide-react";
import { BrushButton, BrushHeading, BrushTag, KanjiMark, TikTokIcon } from "@/components/brush";
import { PageHero } from "@/components/PageHero";
import { CONTACT, SOCIALS } from "@/data/site";
import { trpc } from "@/providers/trpc";

const INFO = [
  { icon: MapPin, title: "LOCATION", lines: [CONTACT.location, CONTACT.locationNote] },
  { icon: Phone, title: "PHONE / WHATSAPP", lines: [CONTACT.phone, CONTACT.phoneNote] },
  { icon: Mail, title: "EMAIL", lines: [CONTACT.email, CONTACT.emailNote] },
  { icon: Clock, title: "BUSINESS HOURS", lines: [CONTACT.hours] },
];

const SUBJECTS = ["Book a Class", "General Inquiry", "Private Training", "Events & Workshops", "Other"];

function SocialIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "instagram":
      return <Instagram className="h-6 w-6" />;
    case "tiktok":
      return <TikTokIcon className="h-6 w-6" />;
    case "youtube":
      return <Youtube className="h-6 w-6" />;
    case "facebook":
      return <Facebook className="h-6 w-6" />;
    default:
      return null;
  }
}

const inputCls =
  "w-full rounded-md border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-neutral-500 outline-none transition-colors focus:border-[#e0252c] focus:ring-1 focus:ring-[#e0252c]/50 min-h-[44px]";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mutation = trpc.contact.create.useMutation({
    onSuccess: () => setSent(true),
    onError: (e) => setError(e.message),
  });

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    mutation.mutate({
      fullName: String(fd.get("fullName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? "") || undefined,
      subject: String(fd.get("subject") ?? ""),
      message: String(fd.get("message") ?? ""),
    });
  }

  return (
    <>
      <PageHero kicker="Get In Touch" title="CONTACT" accent="LET'S CONNECT.">
        <p>
          Have questions? Want to book a class, learn more about our programs, or just say hello?
          We'd love to hear from you. Reach out to us — we're here to help!
        </p>
      </PageHero>

      {/* ============ INFO + FORM ============ */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.3fr] lg:gap-16 lg:px-8">
          {/* Reach us */}
          <div>
            <BrushTag>Our Contact Info</BrushTag>
            <BrushHeading as="h2" className="mt-4 text-4xl sm:text-5xl">
              REACH US
            </BrushHeading>
            <ul className="mt-10 flex flex-col gap-8">
              {INFO.map((item) => (
                <li key={item.title} className="flex items-start gap-5">
                  <span className="icon-ring !h-14 !w-14 shrink-0">
                    <item.icon className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  <div>
                    <h3 className="text-xs font-extrabold tracking-[0.2em] text-[#e0252c]">{item.title}</h3>
                    {item.lines.map((line, i) => (
                      <p
                        key={i}
                        className={`mt-1 whitespace-pre-line text-sm ${
                          i === 0 ? "font-semibold text-neutral-100" : "text-neutral-500"
                        }`}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <div>
            <BrushTag>Send Us A Message</BrushTag>
            <BrushHeading as="h2" className="mt-4 text-4xl sm:text-5xl">
              WE'LL GET BACK TO YOU
            </BrushHeading>

            {sent ? (
              <div className="ink-card mt-8 flex flex-col items-center gap-4 p-10 text-center" style={{ borderColor: "#e0252c55" }}>
                <CheckCircle2 className="h-14 w-14 text-[#e0252c]" strokeWidth={1.5} />
                <h3 className="font-brush text-3xl">MESSAGE SENT!</h3>
                <p className="max-w-md text-sm text-neutral-400">
                  Thanks for reaching out. We usually reply within 24 hours — talk soon!
                </p>
                <button
                  className="pill-btn mt-2"
                  onClick={() => setSent(false)}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input name="fullName" required placeholder="Full Name *" className={inputCls} maxLength={120} />
                  <input name="email" required type="email" placeholder="Email Address *" className={inputCls} maxLength={255} />
                </div>
                <input name="phone" type="tel" placeholder="Phone Number" className={inputCls} maxLength={40} />
                <select name="subject" required defaultValue="" className={`${inputCls} appearance-none`}>
                  <option value="" disabled className="bg-neutral-900">
                    Subject *
                  </option>
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s} className="bg-neutral-900">
                      {s}
                    </option>
                  ))}
                </select>
                <textarea
                  name="message"
                  required
                  placeholder="Your Message *"
                  rows={5}
                  className={`${inputCls} resize-y`}
                  maxLength={2000}
                />
                {error && <p className="text-sm text-red-400">{error}</p>}
                <div>
                  <BrushButton type="submit" disabled={mutation.isPending} className="w-full sm:w-auto sm:min-w-[280px]">
                    {mutation.isPending ? "SENDING..." : "SEND MESSAGE"}
                  </BrushButton>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ============ MAP + SOCIALS ============ */}
      <section className="border-t border-white/10 py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <BrushTag>Find Us</BrushTag>
            <BrushHeading as="h2" className="mt-4 text-4xl sm:text-5xl">
              OUR LOCATION
            </BrushHeading>
            <div className="ink-card mt-8 overflow-hidden p-0">
              <iframe
                title="Parkour Samurai Training Center — Kuala Lumpur"
                src="https://www.openstreetmap.org/export/embed.html?bbox=101.6700%2C3.1200%2C101.7100%2C3.1600&layer=mapnik&marker=3.1390%2C101.6869"
                className="dark-map h-[320px] w-full"
                loading="lazy"
              />
            </div>
            <p className="mt-4 text-sm text-neutral-500">
              Exact location and directions will be shared after booking or upon inquiry.
            </p>
          </div>

          <div className="relative">
            <BrushTag>Follow Our Journey</BrushTag>
            <BrushHeading as="h2" className="mt-4 text-4xl sm:text-5xl">
              STAY CONNECTED
            </BrushHeading>
            <p className="mt-5 text-sm text-neutral-400">
              Follow us on social media for class updates, training clips, events, and more!
            </p>
            <ul className="mt-8 flex flex-col gap-5">
              {SOCIALS.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-5"
                  >
                    <span className="icon-ring !h-14 !w-14 shrink-0 transition-transform group-hover:scale-105">
                      <SocialIcon icon={s.icon} />
                    </span>
                    <span>
                      <span className="block text-sm font-bold">{s.name}</span>
                      <span className="block text-sm text-neutral-500">{s.handle}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <KanjiMark className="absolute -right-2 top-0 hidden text-[7rem] opacity-60 lg:block" />
          </div>
        </div>
      </section>

      {/* ============ BOTTOM BAND ============ */}
      <section className="relative overflow-hidden border-t border-white/10">
        <img
          src="/images/cta-wide.png"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-bottom opacity-60"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060606] via-black/60 to-black/80" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
          <div className="text-center lg:text-left">
            <p className="text-sm font-extrabold uppercase tracking-[0.3em] text-[#e0252c]">
              Train. Move. Grow.
            </p>
            <BrushHeading as="h2" className="mt-3 text-4xl sm:text-5xl lg:text-6xl">
              PARKOUR SAMURAI
            </BrushHeading>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-300">
              Stronger bodies. Braver minds. A higher you.
            </p>
          </div>
          <BrushButton to="/book">Book Your Class</BrushButton>
        </div>
      </section>
    </>
  );
}
