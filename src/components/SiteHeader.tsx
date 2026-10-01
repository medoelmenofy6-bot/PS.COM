import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { ArrowRight, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/data/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/85 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src="/images/logo.png" alt="Parkour Samurai" className="h-10 w-10 object-contain" />
          <span className="font-brush text-lg leading-none text-white sm:text-xl">
            PARKOUR
            <span className="block text-[#e0252c]">SAMURAI</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `relative pb-1 text-sm font-medium transition-colors ${
                  isActive ? "text-[#e0252c]" : "text-neutral-300 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <svg viewBox="0 0 60 8" className="absolute -bottom-1.5 left-0 h-2 w-full" aria-hidden>
                      <path d="M2 5 C 14 2, 30 7, 44 4 S 56 3, 58 5" fill="none" stroke="#e0252c" strokeWidth="2.6" strokeLinecap="round" />
                    </svg>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link to="/book" className="pill-btn">
            Book a Class <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-11 w-11 items-center justify-center rounded-md text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-white/10 bg-black/95 px-4 pb-6 pt-3 lg:hidden">
          <div className="flex flex-col">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`flex min-h-[48px] items-center border-b border-white/5 text-base font-medium ${
                  location.pathname === l.to ? "text-[#e0252c]" : "text-neutral-200"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link to="/book" onClick={() => setOpen(false)} className="pill-btn pill-btn-solid mt-4 justify-center">
              Book a Class <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
