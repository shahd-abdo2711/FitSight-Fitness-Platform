import { Link } from "react-router-dom";

export function Logo({ to = "/" }) {
  return (
    <Link
      to={to}
      className="flex h-full items-center gap-2.5 bg-ink px-5 text-ink-foreground sm:px-8"
      aria-label="FitSight home"
    >
      <span className="flex h-8 w-8 items-center justify-center border border-ink-border font-display text-[11px] font-semibold">
        Fit
      </span>
      <span className="font-display text-sm font-semibold tracking-wide">Sight</span>
    </Link>
  );
}