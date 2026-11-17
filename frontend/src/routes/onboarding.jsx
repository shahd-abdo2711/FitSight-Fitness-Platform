import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/fit/AuthLayout";
import { ProfileForm } from "@/components/fit/ProfileForm";
import { RequireAuth } from "@/components/fit/RequireAuth";
import { actions, useAppState } from "@/lib/store";
 

export function OnboardingPage() {
  return (
    <RequireAuth needsProfile={false}>
      <OnboardingForm />
    </RequireAuth>
  );
}

function OnboardingForm() {
  const navigate = useNavigate();
  const user = useAppState((s) => s.user);
  const existing = useAppState((s) => s.profile);

  useEffect(() => {
    document.title = "Create Your Profile";
  }, []);

  const initial = existing ?? {
    name: user?.name ?? "",
    age: 28,
    gender: "female",
    heightCm: 170,
    weightKg: 68,
    goal: "general",
    level: "beginner",
    daysPerWeek: 3,
    diet: "none",
    equipment: "basic",
    injuries: "",
  };

  return (
    <AuthLayout
       
      title="Create User Profile"
      subtitle="Personal data, fitness goal and fitness level — this shapes every recommendation."
    >
      <ProfileForm
        initial={initial}
        submitLabel="Create Profile"
        onSubmit={(p) => {
          actions.saveProfile(p);
          navigate("/profile");
        }}
      />
    </AuthLayout>
  );
}