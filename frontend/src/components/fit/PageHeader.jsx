export function PageHeader({ eyebrow, title, description, actions }) {
  return (
    <header className="fade-up mb-10 flex flex-col gap-5 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
        )}
        <h1 className="text-3xl leading-tight md:text-4xl">{title}</h1>
        {description && <p className="body-copy mt-3">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
    </header>
  );
}

export function StatCard({ label, value, unit, hint, accent }) {
  return (
    <div
      className={
        accent
          ? "bg-ink p-6 text-ink-foreground"
          : "border border-border bg-card p-6 text-card-foreground"
      }
    >
      <p
        className={
          "text-[11px] font-bold uppercase tracking-[0.18em] " +
          (accent ? "text-primary" : "text-muted-foreground")
        }
      >
        {label}
      </p>
      <p className="mt-3 font-display text-4xl font-bold">
        {value}
        {unit && <span className="ml-1 text-base font-semibold opacity-70">{unit}</span>}
      </p>
      {hint && (
        <p className={"mt-2 text-xs " + (accent ? "text-ink-muted" : "text-muted-foreground")}>
          {hint}
        </p>
      )}
    </div>
  );
}

export function InkPanel({ children, className = "" }) {
  return <div className={"bg-ink p-7 text-ink-foreground md:p-9 " + className}>{children}</div>;
}