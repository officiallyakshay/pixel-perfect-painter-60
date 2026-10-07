import { ArrowRight, Bot, Building2, Clock, FileText, ShieldCheck, User } from "lucide-react";
import { Badge, Card, Dot, StepIcon } from "./ui";
import { cn } from "@/lib/utils";

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className={cn("mt-0.5 text-[13px] font-medium text-foreground", mono && "font-mono")}>{value}</p>
    </div>
  );
}

const heroTimeline = [
  { s: "done", t: "Biopsy completed", m: "Sep 14 · 9:08 AM" },
  { s: "done", t: "Pathology finalized", m: "Sep 17 · 8:42 AM" },
  { s: "done", t: "Physician reviewed", m: "Sep 17 · 10:04 AM" },
  { s: "warn", t: "Routing discrepancy detected", m: "Intended: GI Oncology · Received: General GI" },
  { s: "done", t: "Correction initiated", m: "Sep 17 · 10:22 AM" },
  { s: "current", t: "Current location", m: "GI Oncology Intake" },
] as const;

export function HeroMockup() {
  return (
    <div className="relative">
      <Card className="shadow-float p-0">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-full bg-muted text-xs font-semibold">MC</div>
            <div>
              <p className="text-sm font-semibold">Maria Chen</p>
              <p className="text-[11px] text-muted-foreground">Biopsy follow-up</p>
            </div>
          </div>
          <Badge tone="success">Routing corrected</Badge>
        </div>
        <div className="grid gap-0 sm:grid-cols-[1.15fr_1fr]">
          <ol className="space-y-3.5 px-5 py-5">
            {heroTimeline.map((r, i) => (
              <li key={i} className="relative flex gap-3">
                {i < heroTimeline.length - 1 && <span className="absolute left-[9.5px] top-6 h-[calc(100%-6px)] w-px bg-border" />}
                <StepIcon state={r.s} />
                <div className={cn("min-w-0", r.s === "warn" && "rounded-lg bg-warning-soft px-2 py-1 -my-1")}>
                  <p className={cn("text-[13px] font-medium", r.s === "current" && "text-primary")}>{r.t}</p>
                  <p className="text-[11px] text-muted-foreground">{r.m}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="grid grid-cols-2 content-start gap-4 border-t border-border bg-surface-soft px-5 py-5 sm:grid-cols-1 sm:border-l sm:border-t-0 sm:rounded-br-3xl">
            <Field label="Current owner" value="Oncology Referral Team" />
            <Field label="Current status" value="Clinical review" />
            <Field label="Next expected step" value="Scheduling outreach" />
            <Field label="Expected by" value="Tomorrow · 4:00 PM" />
            <div className="col-span-2 sm:col-span-1 flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <ShieldCheck className="size-3.5 text-success" /> Last verified 11:42 AM
            </div>
          </div>
        </div>
      </Card>
      <Card className="mt-4 w-full p-4 shadow-float lg:absolute lg:-bottom-14 lg:-left-16 lg:mt-0 lg:w-64">
        <div className="mb-3 flex items-center gap-2">
          <Bot className="size-4 text-primary" />
          <p className="text-xs font-semibold">Agent activity</p>
          <span className="ml-auto"><Dot tone="brand" pulse /></span>
        </div>
        <ul className="space-y-2.5">
          {[
            ["10:18 AM", "Routing mismatch detected", "warning"],
            ["10:22 AM", "Transfer request created", "brand"],
            ["10:47 AM", "GI Oncology confirmed receipt", "success"],
            ["10:49 AM", "Patient status updated", "success"],
          ].map(([t, l, tone]) => (
            <li key={t} className="flex items-start gap-2.5">
              <span className="mt-1.5"><Dot tone={tone as "brand"} /></span>
              <div>
                <p className="font-mono text-[10px] text-muted-foreground">{t}</p>
                <p className="text-[12px] font-medium">{l}</p>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

const caseTimeline = [
  ["9:08 AM", "Referral created", "done"],
  ["9:11 AM", "Documents attached", "done"],
  ["9:18 AM", "General GI received referral", "done"],
  ["9:19 AM", "Destination mismatch detected", "danger"],
  ["9:21 AM", "Transfer initiated", "warn"],
  ["9:44 AM", "GI Oncology acknowledged receipt", "done"],
  ["9:46 AM", "Patient updated", "done"],
] as const;

export function CaseDetailMockup() {
  return (
    <Card className="overflow-hidden shadow-float">
      <div className="flex items-center gap-2 border-b border-border bg-surface-soft px-5 py-3">
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <p className="ml-3 font-mono text-[11px] text-muted-foreground">relay / cases / RF-20931</p>
      </div>
      <div className="grid lg:grid-cols-[240px_1fr_1fr]">
        <aside className="hidden border-r border-border p-5 lg:block">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Queues</p>
          {[["All active", "148"], ["Needs attention", "12"], ["Mismatches", "4"], ["Awaiting ack", "7"], ["Escalated", "1"]].map(([l, n], i) => (
            <div key={l} className={cn("flex items-center justify-between rounded-xl px-3 py-2 text-[13px]", i === 2 ? "bg-primary-soft font-medium text-primary" : "text-muted-foreground")}>
              {l}<span className="font-mono text-[11px]">{n}</span>
            </div>
          ))}
        </aside>
        <div className="border-b border-border p-6 lg:border-b-0 lg:border-r">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-lg font-semibold tracking-tight">Daniel Carter</p>
              <p className="text-[13px] text-muted-foreground">Post-pathology GI Oncology Consultation</p>
            </div>
            <Badge tone="danger" pulse>Mismatch detected</Badge>
          </div>
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-border p-4">
            <div className="flex-1">
              <p className="text-[11px] text-muted-foreground">Intended destination</p>
              <p className="text-[13px] font-medium">GI Oncology</p>
            </div>
            <ArrowRight className="size-4 text-muted-foreground" />
            <div className="flex-1 rounded-xl bg-destructive-soft px-3 py-2">
              <p className="text-[11px] text-destructive">Actual destination</p>
              <p className="text-[13px] font-medium text-destructive">General Gastroenterology</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-5">
            <Field label="Origin" value="Primary Care" />
            <Field label="Current owner" value="General GI Referral Queue" />
            <Field label="Next action" value="Transfer to GI Oncology" />
            <div>
              <p className="text-[11px] text-muted-foreground">SLA</p>
              <p className="mt-0.5 flex items-center gap-1.5 font-mono text-[13px] font-medium text-warning"><Clock className="size-3.5" />1h 42m remaining</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Chain of custody</p>
          <ol className="space-y-3">
            {caseTimeline.map(([t, l, s], i) => (
              <li key={t} className="relative flex items-start gap-3">
                {i < caseTimeline.length - 1 && <span className="absolute left-[9.5px] top-6 h-[calc(100%-4px)] w-px bg-border" />}
                <StepIcon state={s} />
                <p className="w-16 shrink-0 pt-0.5 font-mono text-[11px] text-muted-foreground">{t}</p>
                <p className={cn("pt-px text-[13px] font-medium", s === "danger" && "text-destructive", s === "warn" && "text-warning")}>{l}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Card>
  );
}

export function ProviderMockup() {
  const items = [
    ["12", "referrals need attention", "brand"],
    ["4", "routing mismatches", "warning"],
    ["7", "awaiting acknowledgment", "neutral"],
    ["1", "overdue escalation", "danger"],
  ] as const;
  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map(([n, l, tone]) => (
        <Card key={l} className="lift p-5">
          <div className="flex items-center justify-between">
            <p className="text-3xl font-semibold tracking-tight">{n}</p>
            <Dot tone={tone} pulse={tone === "danger"} />
          </div>
          <p className="mt-2 text-[13px] text-muted-foreground">{l}</p>
        </Card>
      ))}
    </div>
  );
}

export function PatientMockup() {
  return (
    <Card className="mx-auto max-w-sm p-6">
      <p className="text-[11px] text-muted-foreground">Your referral</p>
      <ol className="mt-4 space-y-3">
        {["Pathology completed", "Physician reviewed", "Referral submitted", "Routing corrected"].map((l) => (
          <li key={l} className="flex items-center gap-3 text-[14px]"><StepIcon state="done" />{l}</li>
        ))}
        <li className="flex items-center gap-3 text-[14px] font-semibold text-primary"><StepIcon state="current" />GI Oncology Intake</li>
      </ol>
      <div className="mt-6 space-y-3 rounded-2xl bg-surface-soft p-4">
        <Field label="Current status" value="Clinical review" />
        <Field label="Next step" value="Scheduling will contact you" />
        <Field label="Expected" value="By tomorrow" />
      </div>
      <p className="mt-5 rounded-2xl bg-success-soft px-4 py-3 text-[13px] text-success">Nothing is required from you right now.</p>
    </Card>
  );
}

export const icons = { Building2, FileText, User };
