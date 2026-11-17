import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/fit/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { actions, getStateSnapshot } from "@/lib/store";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Log In";
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Enter a valid email address.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    actions.login(email.trim());
    navigate(getStateSnapshot().profile ? "/profile" : "/onboarding");
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Log in to pick up where you left off.">
      <form onSubmit={submit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" variant="ink" className="w-full">Log In</Button>
      </form>
      <p className="mt-6 text-sm text-muted-foreground">
        New here?{" "}
        <Link to="/signup" className="font-semibold text-primary hover:underline">Create an account</Link>
      </p>
    </AuthLayout>
  );
}