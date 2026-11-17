// import { Link } from "react-router-dom";
// import { ThemeToggle } from "./ThemeToggle";
// import { Logo } from "./Logo";

// export function AuthLayout({ image, title, subtitle, children }) {
//   return (
//     <div className="flex min-h-screen flex-col">
//       <header className="flex h-16 items-stretch border-b border-border">
//         <Logo />
//         <div className="ml-auto flex items-center pr-4">
//           <ThemeToggle />
//         </div>
//       </header>
//       <div className="grid flex-1 lg:grid-cols-2">
//         <div className="relative hidden overflow-hidden bg-ink lg:block">
//           <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" />
//           <div className="hero-overlay absolute inset-0" />
//           <div className="absolute bottom-0 left-0 max-w-sm bg-ink p-10 text-ink-foreground">
//             <div className="mb-4 h-1 w-10 bg-primary" />
//             <p className="font-display text-2xl font-bold">Every rep counted. Every form scored.</p>
//           </div>
//         </div>
//         <div className="flex items-center justify-center px-6 py-14">
//           <div className="fade-up w-full max-w-md">
//             <h1 className="text-3xl">{title}</h1>
//             <p className="body-copy mt-2">{subtitle}</p>
//             <div className="mt-8">{children}</div>
//             <p className="mt-10 text-center text-xs text-muted-foreground">
//               <Link to="/" className="hover:text-primary">← Back to FitSight</Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

export function AuthLayout({ image, title, subtitle, children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-16 items-stretch border-b border-border">
        <Logo />
        <div className="ml-auto flex items-center pr-4">
          <ThemeToggle />
        </div>
      </header>
      <div className={cn("grid flex-1", image && "lg:grid-cols-2")}>
        {image && (
          <div className="relative hidden overflow-hidden bg-ink lg:block">
            <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" />
            <div className="hero-overlay absolute inset-0" />
            <div className="absolute bottom-0 left-0 max-w-sm bg-ink p-10 text-ink-foreground">
              <div className="mb-4 h-1 w-10 bg-primary" />
              <p className="font-display text-2xl font-bold">Every rep counted. Every form scored.</p>
            </div>
          </div>
        )}
        <div className="flex items-center justify-center px-6 py-14">
          <div className="fade-up w-full max-w-md">
            <h1 className="text-3xl">{title}</h1>
            <p className="body-copy mt-2">{subtitle}</p>
            <div className="mt-8">{children}</div>
            <p className="mt-10 text-center text-xs text-muted-foreground">
              <Link to="/" className="hover:text-primary">← Back to FitSight</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}