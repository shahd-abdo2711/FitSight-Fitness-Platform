import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { GOALS, LEVELS } from "@/lib/data";
import { cn } from "@/lib/utils";

const SECTIONS = ["Personal Data", "Fitness Goal", "Fitness Level"];

const selectCls =
  "h-10 w-full border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring";

function Choice({ active, onClick, title, text }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative w-full border p-5 text-left transition-colors",
        active ? "border-primary bg-accent" : "border-border bg-card hover:border-foreground/50",
      )}
    >
      {active && (
        <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center bg-primary text-primary-foreground">
          <Check className="h-3 w-3" />
        </span>
      )}
      <span className="block font-display text-sm font-semibold">{title}</span>
      <span className="mt-1 block text-xs text-muted-foreground">{text}</span>
    </button>
  );
}

export function ProfileForm({ initial, submitLabel, onSubmit }) {
  const [step, setStep] = useState(0);
  const [p, setP] = useState(initial);
  const [error, setError] = useState("");
  const set = (k, v) => setP((prev) => ({ ...prev, [k]: v }));

  const validPersonal =
    p.name.trim().length > 1 &&
    p.age >= 13 && p.age <= 100 &&
    p.heightCm >= 100 && p.heightCm <= 250 &&
    p.weightKg >= 30 && p.weightKg <= 300;

  const next = () => {
    if (step === 0 && !validPersonal)
      return setError("Please check your name, age (13–100), height (100–250 cm) and weight (30–300 kg).");
    setError("");
    if (step < 2) setStep(step + 1);
    else onSubmit(p);
  };

  return (
    <div>
      <ol className="mb-8 grid grid-cols-3 border border-border">
        {SECTIONS.map((s, i) => (
          <li key={s}>
            <button
              type="button"
              onClick={() => (i === 0 || validPersonal ? setStep(i) : null)}
              className={cn(
                "flex w-full flex-col items-start gap-1 px-4 py-3 text-left transition-colors",
                i === step ? "bg-ink text-ink-foreground" : "bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              <span className={cn("text-[10px] font-bold uppercase tracking-[0.2em]", i === step && "text-primary")}>
                0{i + 1}
              </span>
              <span className="font-display text-xs font-semibold sm:text-sm">{s}</span>
            </button>
          </li>
        ))}
      </ol>

      {step === 0 && (
        <div className="fade-up grid gap-5 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="pname">Name</Label>
            <Input id="pname" value={p.name} onChange={(e) => set("name", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input id="age" type="number" value={p.age || ""} onChange={(e) => set("age", Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <select id="gender" className={selectCls} value={p.gender} onChange={(e) => set("gender", e.target.value)}>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Prefer not to say</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input id="height" type="number" value={p.heightCm || ""} onChange={(e) => set("heightCm", Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input id="weight" type="number" value={p.weightKg || ""} onChange={(e) => set("weightKg", Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="diet">Diet preference</Label>
            <select id="diet" className={selectCls} value={p.diet} onChange={(e) => set("diet", e.target.value)}>
              <option value="none">No preference</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="keto">Keto</option>
              <option value="halal">Halal</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="equipment">Equipment at home</Label>
            <select id="equipment" className={selectCls} value={p.equipment} onChange={(e) => set("equipment", e.target.value)}>
              <option value="none">None</option>
              <option value="basic">Basic (bands, dumbbells)</option>
              <option value="full_gym">Full gym access</option>
            </select>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="injuries">Injuries or limitations (optional)</Label>
            <Textarea id="injuries" value={p.injuries} onChange={(e) => set("injuries", e.target.value)} placeholder="e.g. sensitive left knee" />
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="fade-up grid gap-3 sm:grid-cols-2">
          {GOALS.map((g) => (
            <Choice key={g.value} active={p.goal === g.value} onClick={() => set("goal", g.value)} title={g.label} text={g.blurb} />
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="fade-up space-y-6">
          <div className="grid gap-3 sm:grid-cols-3">
            {LEVELS.map((l) => (
              <Choice key={l.value} active={p.level === l.value} onClick={() => set("level", l.value)} title={l.label} text={l.blurb} />
            ))}
          </div>
          <div>
            <Label>Training days per week</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {[2, 3, 4, 5, 6].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => set("daysPerWeek", d)}
                  className={cn(
                    "h-10 w-12 border text-sm font-semibold transition-colors",
                    p.daysPerWeek === d ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground/50",
                  )}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {error && <p className="mt-5 text-sm text-destructive">{error}</p>}

      <div className="mt-8 flex justify-between gap-3">
        <Button type="button" variant="outline" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
          Back
        </Button>
        <Button type="button" variant={step === 2 ? "default" : "ink"} onClick={next}>
          {step === 2 ? submitLabel : "Continue"}
        </Button>
      </div>
    </div>
  );
}