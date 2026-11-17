import { Outlet } from "react-router-dom";
import { AppHeader } from "@/components/fit/SiteHeader";
import { SiteFooter } from "@/components/fit/SiteFooter";
import { BottomNav } from "@/components/fit/BottomNav";
import { RequireAuth } from "@/components/fit/RequireAuth";

export function ShellLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-5 pb-24 pt-10 sm:px-8 lg:pb-16">
        <RequireAuth>
          <Outlet />
        </RequireAuth>
      </main>
      <div className="pb-16 lg:pb-0">
        <SiteFooter />
      </div>
      <BottomNav />
    </div>
  );
}