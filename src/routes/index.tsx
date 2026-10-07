import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, Eye, GitCompare, Locate, Megaphone, RefreshCw, ShieldCheck, Users, ListChecks, X } from "lucide-react";
import { Badge, Card, Eyebrow, PillButton, Reveal, SectionHead } from "@/components/relay/ui";
import { CaseDetailMockup, HeroMockup, PatientMockup, ProviderMockup } from "@/components/relay/mockups";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Relay — Closed-loop healthcare handoffs" },
      { name: "description", content: "Relay uses AI agents to track every referral, diagnostic result, and handoff until the right team takes ownership and the patient knows what happens next." },
      { property: "og:title", content: "Relay — No patient should get lost between departments" },
      { property: "og:description", content: "Care coordination infrastructure for closed-loop referrals, results, and patient handoffs." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const wrap = "mx-auto w-full max-w-[1240px] px-5 md:px-8";

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className={cn(wrap, "flex h-16 items-center justify-between")}>
        <a href="#" className="flex items-center gap-2 text-[15px] font-semibold tracking-tight">
          <span className="grid size-6 place-items-center rounded-lg bg-primary text-primary-foreground"><RefreshCw className="size-3.5" /></span>
          Relay
        </a>
        <nav className="hidden items-center gap-7 text-[13px] text-muted-foreground lg:flex">
          {[["Platform", "#platform"], ["How it works", "#how"], ["For providers", "#providers"], ["Why it matters", "#problem"], ["About", "#principle"]].map(([l, h]) => (
            <a key={l} href={h} className="transition-colors hover:text-foreground">{l}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="#pilot" className="hidden px-3 text-[13px] font-medium text-muted-foreground hover:text-foreground sm:block">Talk to us</a>
          <PillButton href="#pilot" variant="ink" className="h-9 rounded-xl px-4 text-[13px]">Join the pilot</PillButton>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="blueprint pointer-events-none absolute inset-0 opacity-60" />
      <div className={cn(wrap, "relative grid items-center gap-14 pb-28 pt-16 md:pt-24 lg:grid-cols-[1fr_1.05fr] lg:pb-36")}>
        <Reveal>
          <Eyebrow>Care coordination infrastructure</Eyebrow>
          <h1 className="mt-5 text-[42px] font-semibold leading-[1.02] tracking-[-0.04em] md:text-[64px]">
            No patient should get lost between departments.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-[19px]">
            Relay uses AI agents to track every important healthcare handoff — from diagnostic results and referrals to specialist intake and scheduling — until the right team takes ownership and the patient knows what happens next.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PillButton href="#pilot">Join the pilot <ArrowRight className="size-4" /></PillButton>
            <PillButton href="#how" variant="ghost">See how it works</PillButton>
          </div>
          <p className="mt-8 max-w-md border-l-2 border-primary/30 pl-4 text-[13px] leading-relaxed text-muted-foreground">
            Built for specialty practices, care teams, and health systems managing complex patient handoffs.
          </p>
        </Reveal>
        <Reveal delay={150}><HeroMockup /></Reveal>
      </div>
    </section>
  );
}

function Problem() {
  const chain = ["Ordering physician", "Pathology", "Referral", "Wrong department", "Specialist intake", "Scheduling", "Patient"];
  const cards = [
    ["Sent does not mean received.", "A referral can leave one system without anyone confirming the correct destination took ownership."],
    ["Received does not mean acted on.", "Cases can sit in queues while each team assumes another team is handling the next step."],
    ["Patients become the tracking system.", "When coordination breaks down, patients and families are often forced to call multiple departments just to understand what is happening."],
  ];
  return (
    <section id="problem" className="border-y border-border bg-surface py-24 md:py-36">
      <div className={wrap}>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <SectionHead eyebrow="The problem" title="Healthcare still loses patients in the handoff." />
          <Reveal className="space-y-1 text-lg leading-relaxed text-muted-foreground md:pt-10 md:text-xl">
            <p>A report can be finalized.</p>
            <p>A referral can be sent.</p>
            <p>A department can receive it.</p>
            <p className="pt-4 text-foreground">And the patient can still have no idea where their case is, who owns it, or what is supposed to happen next.</p>
          </Reveal>
        </div>
        <Reveal className="mt-16 flex flex-wrap items-center gap-2 rounded-3xl border border-dashed border-border bg-surface-soft p-5 md:p-7">
          {chain.map((c, i) => (
            <div key={c} className="flex items-center gap-2">
              <span className={cn(
                "rounded-xl border px-3.5 py-2 text-[13px] font-medium",
                c === "Wrong department" ? "border-destructive/30 bg-destructive-soft text-destructive" : "border-border bg-surface",
                i > 3 && "opacity-50",
              )}>
                {c === "Wrong department" && <X className="mr-1 inline size-3.5 -translate-y-px" />}{c}
              </span>
              {i < chain.length - 1 && <ArrowRight className={cn("size-3.5", i === 2 ? "text-destructive" : "text-muted-foreground/60")} />}
            </div>
          ))}
        </Reveal>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {cards.map(([t, b], i) => (
            <Reveal key={t} delay={i * 80}>
              <Card className="lift h-full bg-surface-soft p-7">
                <p className="font-mono text-[11px] text-muted-foreground">0{i + 1}</p>
                <h3 className="mt-6 text-xl font-semibold tracking-tight">{t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{b}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Value() {
  const items = [
    [Locate, "Know where it is", "See the current department, queue, team, and workflow state instead of a generic “processing” status."],
    [Users, "Know who owns it", "Make responsibility visible so every handoff has a clear accountable team."],
    [ListChecks, "Know what happens next", "Track the expected next action, required documents, acknowledgment status, and timing."],
    [ShieldCheck, "Verify that it happened", "AI agents confirm outcomes rather than assuming a handoff succeeded because something was sent."],
  ] as const;
  return (
    <section id="platform" className="py-24 md:py-36">
      <div className={wrap}>
        <SectionHead eyebrow="Closed-loop handoffs" title="Every case has a location, an owner, a next action, and a deadline." body="Relay turns fragmented referrals and diagnostic follow-up into a continuously tracked workflow." />
        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {items.map(([Icon, t, b], i) => (
            <Reveal key={t} delay={i * 70}>
              <Card className="lift h-full p-8 md:p-10">
                <span className="grid size-10 place-items-center rounded-2xl bg-primary-soft text-primary"><Icon className="size-[18px]" /></span>
                <h3 className="mt-10 text-2xl font-semibold tracking-tight">{t}</h3>
                <p className="mt-3 max-w-md text-[16px] leading-relaxed text-muted-foreground">{b}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function How() {
  const steps = [
    [Eye, "Observe", "Relay watches referral events, diagnostic results, documents, and workflow updates."],
    [GitCompare, "Reconcile", "The system compares intended destination, actual destination, current ownership, and expected next steps."],
    [ShieldCheck, "Verify", "Agents confirm whether the receiving team acknowledged the case and whether required actions occurred."],
    [Megaphone, "Escalate", "If a case stalls, routes incorrectly, or misses an expected handoff, Relay surfaces it for action."],
    [RefreshCw, "Update", "Providers and patients see a clear, current status instead of having to chase information manually."],
  ] as const;
  return (
    <section id="how" className="border-y border-border bg-surface py-24 md:py-36">
      <div className={wrap}>
        <SectionHead eyebrow="How it works" title="AI agents that follow the workflow all the way through." />
        <div className="relative mt-16">
          <div className="absolute left-5 top-0 h-full w-px bg-border lg:left-0 lg:top-5 lg:h-px lg:w-full" />
          <ol className="grid gap-10 lg:grid-cols-5 lg:gap-6">
            {steps.map(([Icon, t, b], i) => (
              <Reveal key={t} delay={i * 90}>
                <li className="relative flex gap-5 lg:block">
                  <span className={cn("relative z-10 grid size-10 shrink-0 place-items-center rounded-full border bg-surface", i === 3 ? "border-warning/40 text-warning" : "border-primary/30 text-primary")}>
                    <Icon className="size-4" />
                  </span>
                  <div className="lg:mt-6">
                    <p className="font-mono text-[11px] text-muted-foreground">Step {i + 1}</p>
                    <h3 className="mt-1 text-lg font-semibold tracking-tight">{t}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{b}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function CaseDetail() {
  return (
    <section className="py-24 md:py-36">
      <div className={wrap}>
        <SectionHead eyebrow="Case detail" title="From “referral sent” to a complete chain of custody." center />
        <Reveal className="mt-14"><CaseDetailMockup /></Reveal>
      </div>
    </section>
  );
}

function Views() {
  return (
    <section id="providers" className="pb-24 md:pb-36">
      <div className={cn(wrap, "grid gap-6 lg:grid-cols-2")}>
        <Reveal>
          <Card className="h-full bg-surface-soft p-8 md:p-10">
            <Badge tone="brand">Provider view</Badge>
            <h3 className="mt-6 text-3xl font-semibold tracking-tight">One operational view for the care team.</h3>
            <p className="mt-3 text-[16px] leading-relaxed text-muted-foreground">See every active case, handoff, exception, and pending action without relying on fragmented inboxes and manual follow-up.</p>
            <div className="mt-10"><ProviderMockup /></div>
          </Card>
        </Reveal>
        <Reveal delay={100}>
          <Card className="h-full bg-primary-soft p-8 md:p-10">
            <Badge tone="success">Patient view</Badge>
            <h3 className="mt-6 text-3xl font-semibold tracking-tight">A clear answer for the patient.</h3>
            <p className="mt-3 text-[16px] leading-relaxed text-muted-foreground">Instead of calling multiple departments, patients can understand where their case currently is and what happens next.</p>
            <div className="mt-10"><PatientMockup /></div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}

function Difference() {
  const old = ["Referral sent", "Status: Processing", "Manual phone calls", "Unclear ownership", "Problems found late"];
  const relay = ["Referral sent", "Destination verified", "Owner identified", "Next action tracked", "Patient updated", "Exceptions escalated"];
  return (
    <section className="border-y border-border bg-surface py-24 md:py-36">
      <div className={wrap}>
        <SectionHead eyebrow="More than status tracking" title="The difference is verification." />
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          <Reveal>
            <Card className="h-full bg-surface-soft p-8 shadow-none">
              <p className="text-sm font-medium text-muted-foreground">Traditional workflow</p>
              <ul className="mt-6 space-y-3">
                {old.map((o) => (
                  <li key={o} className="flex items-center gap-3 border-b border-border pb-3 text-[15px] text-muted-foreground last:border-0">
                    <span className="size-1.5 rounded-full bg-muted-foreground/40" />{o}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
          <Reveal delay={100}>
            <Card className="h-full border-primary/25 p-8 shadow-float">
              <p className="text-sm font-medium text-primary">Relay</p>
              <ul className="mt-6 space-y-3">
                {relay.map((o) => (
                  <li key={o} className="flex items-center gap-3 border-b border-border pb-3 text-[15px] font-medium last:border-0">
                    <span className="grid size-5 place-items-center rounded-full bg-success-soft text-success"><Check className="size-3" strokeWidth={2.5} /></span>{o}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>
        <Reveal className="mt-14 max-w-3xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
          <p>The goal is not to create another dashboard.</p>
          <p className="mt-2 text-foreground">The goal is to make every important handoff observable and accountable until the loop is closed.</p>
        </Reveal>
      </div>
    </section>
  );
}

function UseCases() {
  const cases = [
    ["Biopsy follow-up", "Track pathology-to-specialist handoffs and prevent referrals from disappearing between departments."],
    ["Abnormal imaging", "Make sure findings requiring follow-up reach the correct care pathway."],
    ["Specialist referrals", "Track intake, document completeness, acknowledgment, and scheduling."],
    ["Post-discharge care", "Keep follow-up tasks visible across teams after a patient leaves the hospital."],
  ];
  return (
    <section className="py-24 md:py-36">
      <div className={wrap}>
        <SectionHead eyebrow="Use cases" title="Start with the highest-stakes transitions." />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cases.map(([t, b], i) => (
            <Reveal key={t} delay={i * 70}>
              <Card className="lift flex h-full flex-col p-7">
                <p className="font-mono text-[11px] text-muted-foreground">0{i + 1}</p>
                <h3 className="mt-12 text-lg font-semibold tracking-tight">{t}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{b}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Integrations() {
  const chips = ["EHR", "FHIR", "HL7", "Direct Messaging", "Fax", "Referral queues", "Pathology systems", "Patient communication"];
  return (
    <section className="pb-24 md:pb-36">
      <div className={wrap}>
        <Card className="grid gap-10 p-8 md:p-14 lg:grid-cols-[1fr_1fr]">
          <div>
            <Eyebrow>Planned interoperability</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-[40px]">Designed to work with existing healthcare workflows.</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">Relay is being designed as a coordination layer around the systems care teams already use — not a replacement for the EHR.</p>
          </div>
          <div className="self-center">
            <p className="mb-4 text-[12px] text-muted-foreground">Designed to support</p>
            <div className="flex flex-wrap gap-2">
              {chips.map((c) => (
                <span key={c} className="rounded-full border border-border bg-surface-soft px-4 py-2 font-mono text-[12px]">{c}</span>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

function Principle() {
  return (
    <section id="principle" className="border-t border-border bg-surface py-28 md:py-44">
      <div className={cn(wrap, "max-w-[1000px]")}>
        <Reveal>
          <Eyebrow>Our principle</Eyebrow>
          <p className="mt-8 text-[30px] font-semibold leading-[1.15] tracking-[-0.03em] md:text-[48px]">
            Healthcare should not require an unusually persistent patient to prevent an administrative mistake from becoming a medical delay.
          </p>
        </Reveal>
        <Reveal className="mt-14 grid gap-6 border-t border-border pt-10 md:grid-cols-[200px_1fr]">
          <p className="text-[14px] text-muted-foreground">Relay is being built around one principle:</p>
          <p className="text-xl leading-relaxed md:text-2xl">No important patient handoff should disappear into a queue without a clear <span className="text-primary">owner</span>, <span className="text-primary">next action</span>, and <span className="text-primary">path to resolution</span>.</p>
        </Reveal>
      </div>
    </section>
  );
}

function Pilot() {
  return (
    <section id="pilot" className="px-3 pb-3 md:px-5 md:pb-5">
      <div className="relative overflow-hidden rounded-[28px] bg-ink py-24 text-ink-foreground md:py-32">
        <div className="blueprint pointer-events-none absolute inset-0 opacity-[0.07]" />
        <div className={cn(wrap, "relative max-w-[900px] text-center")}>
          <h2 className="text-[36px] font-semibold leading-[1.05] tracking-[-0.035em] md:text-[54px]">Help us build the coordination layer healthcare is missing.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-foreground/70">We are speaking with specialty practices, care teams, and health systems that manage complex referrals and diagnostic follow-up.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <PillButton href="mailto:pilot@relay.health" variant="inverse">Join the pilot <ArrowRight className="size-4" /></PillButton>
            <PillButton href="mailto:hello@relay.health" variant="inverse-ghost">Talk to us</PillButton>
          </div>
          <p className="mt-10 text-[13px] text-ink-foreground/50">Early design partners will help shape the workflows, integrations, and operational model.</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-14">
      <div className={cn(wrap, "flex flex-col gap-10 md:flex-row md:items-start md:justify-between")}>
        <div>
          <p className="text-[15px] font-semibold tracking-tight">Relay</p>
          <p className="mt-1 text-[13px] text-muted-foreground">Closed-loop healthcare handoffs.</p>
        </div>
        <nav className="flex flex-wrap gap-6 text-[13px] text-muted-foreground">
          {[["Platform", "#platform"], ["How it works", "#how"], ["For providers", "#providers"], ["About", "#principle"], ["Contact", "#pilot"]].map(([l, h]) => (
            <a key={l} href={h} className="hover:text-foreground">{l}</a>
          ))}
        </nav>
      </div>
      <div className={cn(wrap, "mt-12 flex flex-col gap-2 border-t border-border pt-6 text-[12px] text-muted-foreground md:flex-row md:justify-between")}>
        <p>© 2026 Relay. All rights reserved.</p>
        <p>Built to make healthcare handoffs visible, accountable, and complete.</p>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Value />
        <How />
        <CaseDetail />
        <Views />
        <Difference />
        <UseCases />
        <Integrations />
        <Principle />
        <Pilot />
      </main>
      <Footer />
    </div>
  );
}
