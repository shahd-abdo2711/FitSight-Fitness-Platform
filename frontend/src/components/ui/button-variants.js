import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-[13px] font-semibold tracking-wide cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border border-primary hover:bg-ink hover:border-ink hover:text-ink-foreground",
        ink: "bg-ink text-ink-foreground border border-ink hover:bg-primary hover:border-primary hover:text-primary-foreground",
        light:
          "bg-ink-foreground text-ink border border-ink-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground",
        "ink-outline":
          "border border-ink-border text-ink-foreground bg-transparent hover:bg-ink-foreground hover:text-ink",
        destructive:
          "bg-destructive text-destructive-foreground border border-destructive hover:bg-destructive/90",
        outline:
          "border border-foreground/70 bg-transparent text-foreground hover:bg-foreground hover:text-background",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-6",
        sm: "h-8 px-4 text-xs",
        lg: "h-12 px-8 text-sm",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);