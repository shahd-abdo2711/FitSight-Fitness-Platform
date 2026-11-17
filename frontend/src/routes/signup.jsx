import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/fit/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { actions } from "@/lib/store";
 

export function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Sign Up";
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (name.trim().length < 2) return setError("Please enter your name.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Enter a valid email address.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    actions.signup(name.trim(), email.trim());
    navigate("/onboarding");
  };

  return (
    <AuthLayout title="Create Account" subtitle="Two quick steps and your AI coach is ready.">
      <form onSubmit={submit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex Morgan" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" className="w-full">Sign Up</Button>
      </form>
      <p className="mt-6 text-sm text-muted-foreground">
        Already a member?{" "}
        <Link to="/login" className="font-semibold text-primary hover:underline">Log in</Link>
      </p>
    </AuthLayout>
  );
}