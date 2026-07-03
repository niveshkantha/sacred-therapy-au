"use client";

import Link from "next/link";
import { useState } from "react";
import { FlowerOfLife } from "./FlowerOfLife";

const nav = [
  { href: "/journeys", label: "Journeys" },
  { href: "/sound-sanctuary", label: "Sound Sanctuary" },
  { href: "/breathwork", label: "Breathwork" },
  { href: "/about", label: "About" },
  { href: "/membership", label: "Collect Your Key" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-40">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/70 via-background/25 to-transparent" />
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-7 md:px-10">
        <Link href="/" className="flex items-center gap-3 group">
          <FlowerOfLife className="h-9 w-9 text-foreground breathe-slow opacity-90 group-hover:opacity-100 transition-opacity" />
          <span className="hidden sm:block text-[0.7rem] tracking-[0.32em] uppercase font-medium">
            Sacred Therapy
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-xs uppercase tracking-[0.22em] font-medium text-foreground/90 hover:text-foreground transition-colors duration-500"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/begin" className="btn-ghost !py-2.5 !px-5 text-[0.7rem]">
            Begin
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-px bg-foreground transition-all duration-500 ${open ? "rotate-45 translate-y-[4px]" : ""}`} />
            <span className={`block w-5 h-px bg-foreground transition-all duration-500 ${open ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-px bg-foreground transition-all duration-500 ${open ? "-rotate-45 -translate-y-[4px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border/60 reveal" style={{ animationDuration: "0.4s" }}>
          <nav className="flex flex-col items-center gap-6 py-10">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="text-sm uppercase tracking-[0.22em] text-foreground/70 hover:text-foreground transition-colors"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
