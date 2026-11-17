import { Link, NavLink } from "react-router-dom";
import { ChevronDown, Menu, User } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navBase = "text-[13px] text-foreground/80 transition-colors hover:text-primary";
const navLink = ({ isActive }) => cn(navBase, isActive && "text-primary");

const PRIMARY = [
  { to: "/home", label: "Home" },
  { to: "/workouts", label: "Workouts" },
  { to: "/progress", label: "Progress" },
  { to: "/history", label: "History" },
  { to: "/recommendations", label: "Recommendations" },
];

const MORE = [
  { to: "/diet", label: "Diet Plan" },
  { to: "/supplements", label: "Supplements" },
  { to: "/instruments", label: "Sport Instruments" },
  { to: "/coaches", label: "Coach Sessions" },
  { to: "/settings", label: "Settings" },
];

export function AppHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 flex h-16 items-stretch border-b border-border bg-background/95 backdrop-blur">
      <Logo to="/home" />
      <nav className="ml-auto hidden items-center gap-6 pr-6 lg:flex">
        {PRIMARY.map((l) => (
          <NavLink key={l.to} to={l.to} className={navLink}>
            {l.label}
          </NavLink>
        ))}
        <DropdownMenu>
          <DropdownMenuTrigger className={navBase + " inline-flex items-center gap-1 outline-none"}>
            More <ChevronDown className="h-3.5 w-3.5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-none">
            {MORE.map((l) => (
              <DropdownMenuItem key={l.to} asChild className="rounded-none">
                <Link to={l.to}>{l.label}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <ThemeToggle />
        <Link
          to="/profile"
          aria-label="Profile"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
        >
          <User className="h-4 w-4" />
        </Link>
      </nav>

      <div className="ml-auto flex items-center gap-2 pr-4 lg:hidden">
        <ThemeToggle />
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            aria-label="Open menu"
            className="inline-flex h-9 w-9 items-center justify-center border border-border"
          >
            <Menu className="h-4 w-4" />
          </SheetTrigger>
          <SheetContent side="right" className="w-72 rounded-none">
            <SheetHeader>
              <SheetTitle className="font-display">Menu</SheetTitle>
            </SheetHeader>
            <nav className="mt-4 flex flex-col px-4">
              {[...PRIMARY, { to: "/profile", label: "Profile" }, ...MORE].map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn("border-b border-border py-3 text-sm hover:text-primary", isActive && "text-primary")
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}