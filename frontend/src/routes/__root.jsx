import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

export function Root() {
  return (
    <>
      <Outlet />
      <Toaster position="top-center" />
    </>
  );
}