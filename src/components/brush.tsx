import { type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

/** Red ink-brush section label, e.g. "1. CHOOSE A CLASS" */
export function BrushTag({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`brush-tag ${className}`}>{children}</span>;
}

/** Red brush-stroke button. Renders as Link when `to` is set. */
export function BrushButton({
  children,
  to,
  onClick,
  withArrow = true,
  className = "",
  type,
  disabled,
}: {
  children: ReactNode;
  to?: string;
  onClick?: () => void;
  withArrow?: boolean;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const inner = (
    <>
      <span>{children}</span>
      {withArrow && <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2.5} />}
    </>
  );
  if (to) {
    return (
      <Link to={to} className={`brush-btn ${className}`} onClick={onClick}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type ?? "button"} onClick={onClick} disabled={disabled} className={`brush-btn ${className}`}>
      {inner}
    </button>
  );
}

/** Brush-script page heading, e.g. "TAKE THE FIRST STEP." */
export function BrushHeading({
  children,
  className = "",
  as: Tag = "h1",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag className={`font-brush leading-[1.05] text-white ${className}`}>{children}</Tag>
  );
}

/** Red hand-drawn underline stroke */
export function BrushUnderline({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 14" className={`h-3 w-48 ${className}`} aria-hidden>
      <path
        d="M4 9 C 40 3, 90 12, 130 7 S 200 4, 216 8"
        fill="none"
        stroke="#e0252c"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M30 12 C 70 8, 140 13, 190 10"
        fill="none"
        stroke="#e0252c"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

/** Large decorative red kanji (侍) watermark */
export function KanjiMark({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`kanji-mark ${className}`}>
      侍
    </span>
  );
}

/** TikTok icon (lucide has no TikTok) */
export function TikTokIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.3 0 .6.05.87.13V9.4a6.33 6.33 0 0 0-1-.05A6.34 6.34 0 0 0 5 15.69a6.34 6.34 0 0 0 11.25 4.05c.13-.16.25-.33.36-.5a6.3 6.3 0 0 0 1.14-3.55V8.75a8.18 8.18 0 0 0 4.84 1.56V6.86a4.8 4.8 0 0 1-1-.17 4.83 4.83 0 0 1-2 0z" />
    </svg>
  );
}
