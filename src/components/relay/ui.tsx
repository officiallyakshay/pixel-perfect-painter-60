import { useEffect, useRef, type ReactNode } from "react";
import { Check, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setTimeout(() => el.classList.add("in"), delay);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={cn("reveal", className)}>
      {children}
    </div>
  );
}

type Tone = "brand" | "success" | "warning" | "danger" | "neutral";
const toneMap: Record<Tone, string> = {
  brand: "bg-primary-soft text-primary",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  danger: "bg-destructive-soft text-destructive",
  neutral: "bg-muted text-muted-foreground",
};
const dotMap: Record<Tone, string> = {
  brand: "bg-primary text-primary",
  success: "bg-success text-success",
  warning: "bg-warning text-warning",
  danger: "bg-destructive text-destructive",
  neutral: "bg-muted-foreground text-muted-foreground",
};

export function Badge({ tone = "neutral", children, pulse }: { tone?: Tone; children: ReactNode; pulse?: boolean | undefined }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium", toneMap[tone])}>
      <Dot tone={tone} pulse={pulse} />
      {children}
    </span>
  );
}

export function Dot({ tone = "brand", pulse }: { tone?: Tone; pulse?: boolean | undefined }) {
  return <span className={cn("inline-block size-1.5 rounded-full", dotMap[tone], pulse && "pulse-dot")} />;
}

export function StepIcon({ state }: { state: "done" | "warn" | "danger" | "current" | "pending" }) {
  if (state === "done")
    return (
      <span className="grid size-5 place-items-center rounded-full bg-success-soft text-success">
        <Check className="size-3" strokeWidth={2.5} />
      </span>
    );
  if (state === "warn" || state === "danger")
    return (
      <span className={cn("grid size-5 place-items-center rounded-full", state === "warn" ? "bg-warning-soft text-warning" : "bg-destructive-soft text-destructive")}>
        <AlertTriangle className="size-3" strokeWidth={2.5} />
      </span>
    );
  if (state === "current")
    return (
      <span className="grid size-5 place-items-center rounded-full bg-primary-soft text-primary">
        <span className="size-2 rounded-full bg-primary pulse-dot" />
      </span>
    );
  return <span className="grid size-5 place-items-center rounded-full border border-border bg-surface" />;
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-3xl border border-border bg-card shadow-card", className)}>{children}</div>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export function SectionHead({ eyebrow, title, body, center }: { eyebrow?: string; title: ReactNode; body?: ReactNode; center?: boolean }) {
  return (
    <Reveal className={cn("max-w-3xl", center && "mx-auto text-center")}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-4 text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] text-foreground md:text-[46px]">{title}</h2>
      {body && <p className="mt-5 text-lg leading-relaxed text-muted-foreground md:text-xl">{body}</p>}
    </Reveal>
  );
}

export function PillButton({ href, children, variant = "primary", className }: { href: string; children: ReactNode; variant?: "primary" | "ink" | "ghost" | "inverse" | "inverse-ghost"; className?: string }) {
  const v = {
    primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
    ink: "bg-foreground text-background hover:opacity-90",
    ghost: "border border-border bg-surface text-foreground hover:bg-muted",
    inverse: "bg-ink-foreground text-ink hover:opacity-90",
    "inverse-ghost": "border border-ink-foreground/20 text-ink-foreground hover:bg-ink-foreground/10",
  }[variant];
  return (
    <a href={href} className={cn("inline-flex h-11 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-medium transition-colors", v, className)}>
      {children}
    </a>
  );
}
