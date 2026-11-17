import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppState } from "@/lib/store";

export function RequireAuth({ children, needsProfile = true }) {
  const user = useAppState((s) => s.user);
  const profile = useAppState((s) => s.profile);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login", { replace: true });
    else if (needsProfile && !profile) navigate("/onboarding", { replace: true });
  }, [user, profile, needsProfile, navigate]);

  if (!user || (needsProfile && !profile)) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="h-3 w-3 bg-primary pulse-dot" />
      </div>
    );
  }
  return <>{children}</>;
}