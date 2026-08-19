import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, Send, Calculator, BookOpen, FolderOpen, Sparkles } from "lucide-react";
import { askClinicalAi, getClinicalAccess } from "@/lib/clinical.functions";
import { CLINICAL_MODES, type ClinicalModeId } from "@/lib/clinical/modes";
import {
  CALCULATORS,
  FIELD_LABELS,
  runCalculator,
  type CalcStep,
  type CalculatorId,
} from "@/lib/clinical/calculators";
import agentManual from "@/content/clinical/AGENT_MANUAL.md?raw";
import workflowGuide from "@/content/clinical/WORKFLOW_GUIDE.md?raw";
import calculatorGuide from "@/content/clinical/CALCULATOR_GUIDE.md?raw";
import referenceFrameworks from "@/content/clinical/REFERENCE_FRAMEWORKS.md?raw";

export const Route = createFileRoute("/_authenticated/clinical")({
  head: () => ({
    meta: [
      { title: "Clinical Pharmacist Workspace — BioBlend" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ClinicalWorkspace,
});

type Msg = { role: "user" | "assistant"; content: string };
type Tab = "assistant" | "calculators" | "reference" | "cases";
type CaseRow = { id: string; title: string; mode: string; status: string; updated_at: string };

const DOCS = [
  { id: "manual", label: "Agent manual", body: agentManual },
  { id: "workflow", label: "Clinical workflow", body: workflowGuide },
  { id: "calc", label: "Calculator guide", body: calculatorGuide },
  { id: "frameworks", label: "Reference frameworks", body: referenceFrameworks },
];

function ClinicalWorkspace() {
  const checkAccess = useServerFn(getClinicalAccess);
  const [access, setAccess] = useState<"loading" | "granted" | "denied">("loading");
  const [tab, setTab] = useState<Tab>("assistant");

  useEffect(() => {
    checkAccess()
      .then((r) => setAccess(r.allowed ? "granted" : "denied"))
      .catch(() => setAccess("denied"));
  }, [checkAccess]);

  if (access === "loading") {
    return (
      <div className="grid min-h-screen place-items-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (access === "denied") {
    return (
      <div className="min-h-screen bg-background pt-28 pb-16">
        <div className="mx-auto max-w-xl px-4 text-center">
          <p className="eyebrow">Restricted</p>
          <h1 className="mt-3 font-serif text-3xl text-primary">Clinical workspace</h1>
          <div className="mx-auto mt-4 gold-rule" />
          <p className="mt-6 text-muted-foreground">
            This module is reserved for BioBlend clinical pharmacists. Ask a pharmacy
            administrator to grant your account clinical access.
          </p>
          <Button asChild className="mt-6 rounded-full">
            <Link to="/portal">Back to portal</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="mx-auto w-full max-w-5xl px-4">
        <header className="text-center">
          <p className="eyebrow">Clinical Pharmacist AI</p>
          <h1 className="mt-3 font-serif text-3xl text-primary md:text-4xl">
            Decision support, mentoring &amp; care planning
          </h1>
          <div className="mx-auto mt-4 gold-rule" />
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground">
            Deterministic compounding maths, evidence-graded formulation review and a
            17-point safety gate — every output is labelled KNOWN, CALCULATED, INFERRED,
            UNKNOWN or REQUIRES VERIFICATION. Decision support only; the responsible
            pharmacist verifies before dispensing.
          </p>
        </header>

        <nav className="mt-8 flex flex-wrap justify-center gap-2">
          {(
            [
              ["assistant", "Assistant", Sparkles],
              ["calculators", "Calculators", Calculator],
              ["reference", "Reference", BookOpen],
              ["cases", "My cases", FolderOpen],
            ] as const
          ).map(([id, label, Icon]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold tracking-wide transition-colors ${
                tab === id
                  ? "border-[color:var(--brand-gold)] bg-[color:var(--brand-gold)]/15 text-primary"
                  : "border-border/70 text-foreground/70 hover:border-primary hover:text-primary"
              }`}
            >
              <Icon className="h-3.5 w-3.5" /> {label}
            </button>
          ))}
        </nav>

        <div className="mt-8">
          {tab === "assistant" && <AssistantPanel />}
          {tab === "calculators" && <CalculatorPanel />}
          {tab === "reference" && <ReferencePanel />}
          {tab === "cases" && <CasesPanel onOpen={() => setTab("assistant")} />}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Assistant ---------------- */

function AssistantPanel() {
  const ask = useServerFn(askClinicalAi);
  const [mode, setMode] = useState<ClinicalModeId>("care_plan");
  const [patientContext, setPatientContext] = useState("");
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [busy, setBusy] = useState(false);
  const [caseId, setCaseId] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const activeMode = useMemo(
    () => CLINICAL_MODES.find((m) => m.id === mode) ?? CLINICAL_MODES[0]!,
    [mode],
  );

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, busy]);

  const persist = useCallback(
    async (userText: string, assistantText: string) => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return;
      let id = caseId;
      if (!id) {
        const { data } = await supabase
          .from("clinical_cases")
          .insert({
            created_by: u.user.id,
            title: userText.slice(0, 80),
            mode,
            patient_context: { notes: patientContext },
          })
          .select("id")
          .single();
        id = data?.id ?? null;
        setCaseId(id);
      }
      if (!id) return;
      await supabase.from("clinical_case_messages").insert([
        { case_id: id, role: "user", content: userText },
        { case_id: id, role: "assistant", content: assistantText },
      ]);
    },
    [caseId, mode, patientContext],
  );

  const submit = useCallback(async () => {
    const text = question.trim();
    if (!text || busy) return;
    setBusy(true);
    setQuestion("");
    const history = messages.slice(-10);
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    try {
      const { answer } = await ask({
        data: { mode, patientContext, history, question: text },
      });
      setMessages((prev) => [...prev, { role: "assistant", content: answer }]);
      await persist(text, answer);
    } catch (e) {
      toast.error((e as Error).message || "The clinical AI could not answer that request.");
      setMessages((prev) => prev.slice(0, -1));
      setQuestion(text);
    } finally {
      setBusy(false);
    }
  }, [ask, busy, messages, mode, patientContext, persist, question]);

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <aside className="space-y-2">
        {CLINICAL_MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`w-full rounded-xl border p-3 text-left transition-colors ${
              mode === m.id
                ? "border-[color:var(--brand-gold)] bg-[color:var(--brand-gold)]/10"
                : "border-border/70 hover:border-primary/50"
            }`}
          >
            <span className="block text-sm font-medium text-primary">{m.label}</span>
            <span className="mt-0.5 block text-xs text-muted-foreground">{m.blurb}</span>
          </button>
        ))}
        <div className="rounded-xl border border-border/70 p-3">
          <label className="text-xs font-medium text-primary">Case context (optional)</label>
          <Textarea
            value={patientContext}
            onChange={(e) => setPatientContext(e.target.value)}
            rows={5}
            placeholder="Age, sex, weight, diagnoses, labs, allergies, current medication…"
            className="mt-2 text-xs"
          />
        </div>
      </aside>

      <section className="flex min-h-[460px] flex-col rounded-2xl border border-border/70 bg-card/60">
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.length === 0 && (
            <p className="text-sm text-muted-foreground">
              {activeMode.placeholder}
            </p>
          )}
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[92%] rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap ${
                m.role === "user"
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "border border-[color:var(--brand-gold)]/30 bg-background"
              }`}
            >
              {m.content}
            </div>
          ))}
          {busy && (
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Working through the clinical
              workflow…
            </p>
          )}
          <div ref={endRef} />
        </div>
        <div className="border-t border-border/60 p-3">
          <div className="flex items-end gap-2">
            <Textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) void submit();
              }}
              rows={3}
              placeholder={activeMode.placeholder}
              className="text-sm"
            />
            <Button onClick={() => void submit()} disabled={busy} className="rounded-full">
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">
            ⌘/Ctrl + Enter to send. Decision support only — the responsible pharmacist
            verifies every recommendation before it reaches a patient.
          </p>
        </div>
      </section>
    </div>
  );
}

/* ---------------- Calculators ---------------- */

function CalculatorPanel() {
  const [id, setId] = useState<CalculatorId>("bsa_mosteller");
  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<CalcStep | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calc = CALCULATORS.find((c) => c.id === id)!;

  function compute() {
    try {
      setResult(runCalculator(id, values));
      setError(null);
    } catch (e) {
      setResult(null);
      setError((e as Error).message);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <aside className="space-y-1.5">
        {CALCULATORS.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              setId(c.id);
              setValues({});
              setResult(null);
              setError(null);
            }}
            className={`w-full rounded-lg border px-3 py-2 text-left text-xs transition-colors ${
              id === c.id
                ? "border-[color:var(--brand-gold)] bg-[color:var(--brand-gold)]/10 text-primary"
                : "border-border/70 text-foreground/75 hover:border-primary/50"
            }`}
          >
            {c.label}
          </button>
        ))}
      </aside>

      <section className="rounded-2xl border border-border/70 bg-card/60 p-5">
        <h2 className="font-serif text-xl text-primary">{calc.label}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {calc.fields.map((f) => (
            <div key={f}>
              <label className="text-xs text-muted-foreground">{FIELD_LABELS[f] ?? f}</label>
              <Input
                value={values[f] ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, [f]: e.target.value }))}
                placeholder={f === "sex" ? "M or F" : "0"}
                className="mt-1"
              />
            </div>
          ))}
        </div>
        <Button onClick={compute} className="mt-4 rounded-full">
          Calculate
        </Button>

        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

        {result && (
          <dl className="mt-6 space-y-2 rounded-xl border border-[color:var(--brand-gold)]/40 bg-background p-4 text-sm">
            <Row label="Result" value={result.result} strong />
            <Row label="Formula" value={result.formula} />
            <Row label="Inputs" value={result.inputs} />
            <Row label="Working" value={result.working} />
            <Row label="Reasonableness check" value={result.check} />
            {result.flag && <Row label="Flag" value={result.flag} />}
            <p className="pt-2 text-[11px] text-muted-foreground">
              Label this value CALCULATED when documenting it, and paste it into the case
              context so the assistant reuses it instead of recomputing.
            </p>
          </dl>
        )}
      </section>
    </div>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[150px_1fr]">
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className={strong ? "font-medium text-primary" : "text-foreground/85"}>{value}</dd>
    </div>
  );
}

/* ---------------- Reference ---------------- */

function ReferencePanel() {
  const [doc, setDoc] = useState(DOCS[0]!.id);
  const body = DOCS.find((d) => d.id === doc)!.body;
  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
      <aside className="space-y-1.5">
        {DOCS.map((d) => (
          <button
            key={d.id}
            onClick={() => setDoc(d.id)}
            className={`w-full rounded-lg border px-3 py-2 text-left text-xs transition-colors ${
              doc === d.id
                ? "border-[color:var(--brand-gold)] bg-[color:var(--brand-gold)]/10 text-primary"
                : "border-border/70 text-foreground/75 hover:border-primary/50"
            }`}
          >
            {d.label}
          </button>
        ))}
      </aside>
      <article className="max-h-[70vh] overflow-y-auto rounded-2xl border border-border/70 bg-card/60 p-5">
        <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground/85">
          {body}
        </pre>
      </article>
    </div>
  );
}

/* ---------------- Cases ---------------- */

function CasesPanel({ onOpen }: { onOpen: () => void }) {
  const [cases, setCases] = useState<CaseRow[] | null>(null);
  const [open, setOpen] = useState<{ id: string; messages: Msg[] } | null>(null);

  useEffect(() => {
    supabase
      .from("clinical_cases")
      .select("id, title, mode, status, updated_at")
      .order("updated_at", { ascending: false })
      .limit(50)
      .then(({ data }) => setCases(data ?? []));
  }, []);

  async function openCase(id: string) {
    const { data } = await supabase
      .from("clinical_case_messages")
      .select("role, content")
      .eq("case_id", id)
      .order("created_at");
    setOpen({ id, messages: (data ?? []) as Msg[] });
  }

  if (!cases) {
    return <Loader2 className="mx-auto h-5 w-5 animate-spin text-primary" />;
  }

  if (open) {
    return (
      <div className="rounded-2xl border border-border/70 bg-card/60 p-5">
        <Button variant="ghost" onClick={() => setOpen(null)} className="mb-4">
          ← All cases
        </Button>
        <div className="space-y-4">
          {open.messages.map((m, i) => (
            <div
              key={i}
              className={`rounded-xl px-4 py-3 text-sm whitespace-pre-wrap ${
                m.role === "user"
                  ? "bg-secondary"
                  : "border border-[color:var(--brand-gold)]/30 bg-background"
              }`}
            >
              {m.content}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (cases.length === 0) {
    return (
      <p className="text-center text-sm text-muted-foreground">
        No saved cases yet — start one in the{" "}
        <button onClick={onOpen} className="underline">
          assistant
        </button>
        .
      </p>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {cases.map((c) => (
        <button
          key={c.id}
          onClick={() => void openCase(c.id)}
          className="rounded-xl border border-border/70 p-4 text-left transition-colors hover:border-[color:var(--brand-gold)]"
        >
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {CLINICAL_MODES.find((m) => m.id === c.mode)?.label ?? c.mode}
          </p>
          <p className="mt-1 text-sm font-medium text-primary line-clamp-2">{c.title}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            {new Date(c.updated_at).toLocaleString()}
          </p>
        </button>
      ))}
    </div>
  );
}
