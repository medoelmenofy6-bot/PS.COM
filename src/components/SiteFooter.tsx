import { Link } from "react-router";
import { Facebook, Instagram, MapPin, Youtube } from "lucide-react";
import { NAV_LINKS, SOCIALS } from "@/data/site";
import { TikTokIcon } from "./brush";

function SocialIcon({ icon, className = "h-5 w-5" }: { icon: string; className?: string }) {
  switch (icon) {
    case "instagram":
      return <Instagram className={className} />;
    case "tiktok":
      return <TikTokIcon className={className} />;
    case "youtube":
      return <Youtube className={className} />;
    case "facebook":
      return <Facebook className={className} />;
    default:
      return null;
  }
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/images/logo.png" alt="Parkour Samurai" className="h-11 w-11 object-contain" />
            <span className="font-brush text-xl leading-none text-white">
              PARKOUR
              <span className="block text-[#e0252c]">SAMURAI</span>
            </span>
          </Link>

          <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            {NAV_LINKS.map((l) => (
              <Link key={l.to} to={l.to} className="text-sm text-neutral-300 transition-colors hover:text-[#e0252c]">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.name}
                className="flex h-11 w-11 items-center justify-center text-neutral-300 transition-colors hover:text-[#e0252c]"
              >
                <SocialIcon icon={s.icon} />
              </a>
            ))}
            <span className="hidden h-5 w-px bg-white/20 sm:block" />
            <span className="hidden items-center gap-1.5 text-xs text-neutral-400 sm:flex">
              <MapPin className="h-3.5 w-3.5 text-[#e0252c]" /> Kuala Lumpur, Malaysia
            </span>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-neutral-500">
          © 2025 Parkour Samurai. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
