import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Pencil } from "lucide-react";
import { toast } from "sonner";
import { PageHeader, StatCard } from "@/components/fit/PageHeader";
import { ProfileForm } from "@/components/fit/ProfileForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GOALS, LEVELS } from "@/lib/data";
import { actions, useAppState } from "@/lib/store";

const DIET_LABEL = { none: "No preference", vegetarian: "Vegetarian", vegan: "Vegan", keto: "Keto", halal: "Halal" };
const EQUIP_LABEL = { none: "No equipment", basic: "Basic home kit", full_gym: "Full gym" };

export function ProfilePage() {
  const profile = useAppState((s) => s.profile);
  const user = useAppState((s) => s.user);
  const sessions = useAppState((s) => s.sessions);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    document.title = "Your Profile";
  }, []);

  const bmi = profile.weightKg / (profile.heightCm / 100) ** 2;
  const goal = GOALS.find((g) => g.value === profile.goal);
  const level = LEVELS.find((l) => l.value === profile.level);

  return (
    <div>
      <PageHeader
        eyebrow="Profile"
        title={profile.name}
        description={user.email}
        actions={
          <>
            <Button variant="outline" onClick={() => setEditing(true)}>
              <Pencil /> Edit Profile
            </Button>
            <Button asChild variant="ink">
              <Link to="/home">
                Go to Home <ArrowRight />
              </Link>
            </Button>
          </>
        }
      />

      <section>
        <h2 className="mb-4 text-lg">Personal Data</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="Age" value={profile.age} unit="yrs" />
          <StatCard label="Height" value={profile.heightCm} unit="cm" />
          <StatCard label="Weight" value={profile.weightKg} unit="kg" />
          <StatCard
            label="BMI"
            value={bmi.toFixed(1)}
            hint={bmi < 18.5 ? "Under range" : bmi < 25 ? "Healthy range" : "Above range"}
          />
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="bg-ink p-8 text-ink-foreground">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Fitness Goal</p>
          <p className="mt-3 font-display text-2xl font-bold">{goal.label}</p>
          <p className="mt-2 text-sm text-ink-muted">{goal.blurb}</p>
        </div>
        <div className="border border-border p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Fitness Level</p>
          <p className="mt-3 font-display text-2xl font-bold">{level.label}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {level.blurb} Training {profile.daysPerWeek} days a week.
          </p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-lg">User Preferences &amp; Information</h2>
        <div className="grid gap-px border border-border bg-border sm:grid-cols-3">
          {[
            ["Diet", DIET_LABEL[profile.diet]],
            ["Equipment", EQUIP_LABEL[profile.equipment]],
            ["Limitations", profile.injuries || "None noted"],
            ["Workouts logged", String(sessions.length)],
            [
              "Gender",
              profile.gender === "other"
                ? "Not specified"
                : profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1),
            ],
            ["Member", user.email],
          ].map(([k, v]) => (
            <div key={k} className="bg-card p-5">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">{k}</p>
              <p className="mt-1 truncate font-semibold">{v}</p>
            </div>
          ))}
        </div>
        <p className="body-copy mt-3 text-xs">
          Your preferences power the personalized{" "}
          <Link to="/diet" className="text-primary hover:underline">Diet Plan</Link>,{" "}
          <Link to="/supplements" className="text-primary hover:underline">Supplements</Link> and{" "}
          <Link to="/instruments" className="text-primary hover:underline">Sport Instruments</Link> recommendations.
        </p>
      </section>

      <Dialog open={editing} onOpenChange={setEditing}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto rounded-none">
          <DialogHeader>
            <DialogTitle className="font-display">Edit Profile</DialogTitle>
          </DialogHeader>
          <ProfileForm
            initial={profile}
            submitLabel="Save Changes"
            onSubmit={(p) => {
              actions.saveProfile(p);
              setEditing(false);
              toast.success("Profile updated — recommendations refreshed.");
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}