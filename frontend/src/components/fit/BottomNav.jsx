import { Link, NavLink } from "react-router-dom";
import { Dumbbell, Home, LineChart, ScanLine, User } from "lucide-react";
import { cn } from "@/lib/utils";

const item = ({ isActive }) =>
  cn(
    "flex flex-1 flex-col items-center justify-center gap-1 text-[10px] font-semibold uppercase tracking-wider",
    isActive ? "text-primary" : "text-muted-foreground",
  );

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex h-16 border-t border-border bg-background lg:hidden">
      <NavLink to="/home" className={item}>
        <Home className="h-5 w-5" /> Home
      </NavLink>
      <NavLink to="/workouts" className={item}>
        <Dumbbell className="h-5 w-5" /> Workouts
      </NavLink>
      <Link to="/recommendations" className="-mt-5 flex flex-1 flex-col items-center justify-start">
        <span className="flex h-12 w-12 items-center justify-center bg-primary text-primary-foreground shadow-card">
          <ScanLine className="h-5 w-5" />
        </span>
        <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          For You
        </span>
      </Link>
      <NavLink to="/progress" className={item}>
        <LineChart className="h-5 w-5" /> Progress
      </NavLink>
      <NavLink to="/profile" className={item}>
        <User className="h-5 w-5" /> Profile
      </NavLink>
    </nav>
  );
}