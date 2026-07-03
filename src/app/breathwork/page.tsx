"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FlowerOfLife } from "@/components/FlowerOfLife";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

type Intention = "Calm the body" | "Release" | "Sleep" | "Energise" | "Grief" | "Reset";

interface Practice {
  id: string;
  title: string;
  duration: string;
  intention: Intention;
  description: string;
}

const INTENTIONS: ("All" | Intention)[] = ["All", "Calm the body", "Release", "Sleep", "Energise", "Grief", "Reset"];

const PRACTICES: Practice[] = [
  { id: "settle", title: "Settle the Body", duration: "12 min", intention: "Calm the body", description: "Long, low exhales to tell the nervous system the danger has passed." },
  { id: "soft-release", title: "Soft Release", duration: "18 min", intention: "Release", description: "A gentle conscious-connected breath to let the body finish what it started." },
  { id: "ocean-sleep", title: "Ocean for Sleep", duration: "22 min", intention: "Sleep", description: "Slow oceanic breathing to draw you down into rest." },
  { id: "morning-light", title: "Morning Light", duration: "9 min", intention: "Energise", description: "A short, lifting breath for the days you wake heavy." },
  { id: "carry-this", title: "Carry This Gently", duration: "20 min", intention: "Grief", description: "Breath as company for the weight that has no words." },
  { id: "midday-reset", title: "Midday Reset", duration: "7 min", intention: "Reset", description: "A coherent breath to come back to yourself between things." },
  { id: "unclench", title: "Unclench", duration: "14 min", intention: "Release", description: "For the held jaw, the bracing shoulders, the breath you forgot you were holding." },
  { id: "deep-still", title: "Deep Still", duration: "30 min", intention: "Calm the body", description: "A longer practice for when you need to drop all the way down." },
];

type Class = {
  id: string;
  name: string;
  date: string;
  time?: string;
  durationMin?: number;
  location: string;
  spots?: number;
  price?: number;
  note?: string;
  completed?: boolean;
};

const CLASSES: Class[] = [
  { id: "sun-reset-jun-28", name: "Sunday Reset — Conscious Connected Breath", date: "Sun · 28 Jun 2026", location: "PhysiPro Athletic, Seaford", completed: true },
  { id: "sun-reset-aug-30", name: "Sunday Reset — Conscious Connected Breath", date: "Sun · 30 Aug 2026", location: "PhysiPro Athletic, Seaford" },
];

export default function BreathworkPage() {
  const [active, setActive] = useState<(typeof INTENTIONS)[number]>("All");
  const [playing, setPlaying] = useState<Practice | null>(null);

  const filtered = useMemo(
    () => (active === "All" ? PRACTICES : PRACTICES.filter((p) => p.intention === active)),
    [active]
  );

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <SiteHeader />

      {/* HERO */}
      <section className="relative h-[92svh] min-h-[640px] w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/journey-linen.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/video/breathwork.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-cream/40 via-cream/20 to-cream" />
        <FlowerOfLife className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[55%] h-[min(86vw,640px)] w-[min(86vw,640px)] text-espresso/[0.10] breathe-slow" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="label-caps label-caps-accent reveal">— Breathwork —</p>
          <h1 className="reveal reveal-delay-1 mt-6 font-serif text-[clamp(2.4rem,6.2vw,5rem)] leading-[1.04] max-w-4xl">
            Your breath is the one thing<br className="hidden md:inline" /> that was never taken from you.
          </h1>
          <p className="reveal reveal-delay-2 mt-8 max-w-xl text-base md:text-lg text-foreground/70 leading-relaxed">
            A quiet return to the body — through the only instrument you have always carried.
          </p>
        </div>
      </section>

      {/* WHY BREATH */}
      <section className="relative mx-auto max-w-3xl px-6 md:px-10 pt-28 pb-20">
        <p className="label-caps label-caps-accent reveal">— Why Breath —</p>
        <h2 className="reveal reveal-delay-1 mt-5 font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1]">
          The body keeps the score. The breath is how we begin to settle it.
        </h2>
        <div className="reveal reveal-delay-2 mt-10 space-y-7 text-[1.05rem] leading-[1.85] text-foreground/75">
          <p>
            Breathwork is not a trend, and it is not a performance. It is the oldest, most
            available tool we have to speak to the nervous system in a language it actually
            understands. When the mind cannot reason its way out of a spiral, the breath can
            reach the body directly — slowly, kindly, without needing the story.
          </p>
          <p>
            Most of us walk through the day in a low, shallow chest breath — a quiet bracing
            we no longer notice. That pattern keeps the body half-convinced something is still
            wrong. Long, slow exhales engage the vagus nerve and tell the system, gently and
            without argument, that it is safe to come down.
          </p>
          <p>
            Practiced regularly, breathwork begins to widen the room you have between a feeling
            and your response to it. Nothing dramatic. Just a little more space. A little more
            choice. A nervous system that remembers, slowly, what safety feels like.
          </p>
        </div>
      </section>

      {/* WHAT IT CAN SOFTEN */}
      <section className="relative mx-auto max-w-5xl px-6 md:px-10 pb-24">
        <div className="text-center reveal">
          <p className="label-caps label-caps-accent">— What it can soften —</p>
          <h2 className="mt-5 font-serif text-[clamp(1.75rem,3.5vw,2.5rem)]">
            Where this work tends to reach.
          </h2>
        </div>
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-10">
          {[
            { label: "Anxiety", body: "For the chest that runs ahead of the rest of you." },
            { label: "Insomnia", body: "When the body is tired but will not let you down." },
            { label: "Grief", body: "Breath as company for what cannot be hurried." },
            { label: "Burnout", body: "For the months you have been running on fumes and willpower." },
            { label: "Panic", body: "An exit ramp the body can find without thinking." },
            { label: "Emotional numbness", body: "When you have gone quiet inside and need a way back in." },
          ].map((item) => (
            <div key={item.label} className="reveal flex gap-5 border-t border-foreground/10 pt-6">
              <FlowerOfLife className="h-9 w-9 shrink-0 text-honey breathe-slow" />
              <div>
                <p className="font-serif text-xl text-foreground">{item.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/65">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="relative mx-auto max-w-3xl px-6 md:px-10 py-24 text-center">
        <FlowerOfLife className="mx-auto h-14 w-14 text-honey/80 breathe-slow" />
        <blockquote className="reveal mt-8 font-serif italic text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.35] text-foreground/85">
          &ldquo;I teach breathwork because there are nights the mind cannot be
          reasoned with, and the body still needs somewhere to go. The breath is
          that somewhere.&rdquo;
        </blockquote>
        <p className="mt-6 text-xs tracking-[0.3em] uppercase text-muted-foreground">
          — Neshi Jayamaha
        </p>
      </section>

      {/* PRACTICE LIBRARY */}
      <section className="relative bg-whisper/60 py-28">
        <FlowerOfLife className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] text-foreground/[0.04] breathe-slow" />
        <div className="relative mx-auto max-w-6xl px-6 md:px-10">
          <div className="text-center">
            <p className="label-caps label-caps-accent reveal">— Guided Practices —</p>
            <h2 className="reveal reveal-delay-1 mt-5 font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] max-w-2xl mx-auto">
              Practices for when you need to come back to yourself.
            </h2>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-2">
            {INTENTIONS.map((i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`px-5 py-2 rounded-full text-[0.7rem] uppercase tracking-[0.22em] transition-all duration-500 border ${
                  active === i
                    ? "bg-espresso text-cream border-espresso"
                    : "border-foreground/15 text-foreground/65 hover:border-honey hover:text-foreground"
                }`}
              >
                {i}
              </button>
            ))}
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <button
                key={p.id}
                onClick={() => setPlaying(p)}
                className="group text-left rounded-3xl overflow-hidden border border-foreground/10 bg-cream transition-all duration-700 hover:-translate-y-1 hover:border-honey/50 hover:shadow-[var(--shadow-soft)]"
              >
                <div className="relative aspect-[5/4] overflow-hidden bg-gradient-to-br from-beige to-sand/30">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FlowerOfLife className="h-24 w-24 text-foreground/15 breathe-slow" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-deep/60 via-deep/10 to-transparent" />
                  <span className="absolute left-4 top-4 px-3 py-1 rounded-full bg-cream/90 text-foreground text-[0.6rem] tracking-[0.25em] uppercase">
                    Coming Soon
                  </span>
                  <FlowerOfLife className="absolute right-4 top-4 h-10 w-10 text-cream/60 breathe-slow" />
                  <span className="absolute bottom-4 right-4 h-12 w-12 rounded-full bg-honey text-deep flex items-center justify-center shadow-[var(--shadow-glow)] opacity-90 group-hover:opacity-100 transition">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 ml-0.5" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-[0.65rem] tracking-[0.25em] uppercase text-sand">{p.intention}</p>
                  <p className="mt-2 font-serif text-2xl text-foreground">{p.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{p.duration}</p>
                  <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{p.description}</p>
                </div>
              </button>
            ))}
          </div>

          <p className="mt-14 text-center text-xs tracking-[0.28em] uppercase text-muted-foreground">
            New practices added each month
          </p>
        </div>
      </section>

      {/* LIVE CLASSES */}
      <section className="relative mx-auto max-w-4xl px-6 md:px-10 pt-28 pb-32">
        <div className="text-center">
          <p className="label-caps label-caps-accent reveal">— With Neshi, in person —</p>
          <h2 className="reveal reveal-delay-1 mt-5 font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1]">
            A room of people breathing, together.
          </h2>
        </div>
        <p className="reveal reveal-delay-2 mx-auto mt-10 max-w-2xl text-center text-[1.05rem] leading-[1.85] text-foreground/75">
          There is something solo practice cannot quite give you. Breathing in a
          room where everyone else has agreed to let their guard down — that is
          its own kind of medicine.
        </p>

        <ul className="mt-16 divide-y divide-foreground/10 border-y border-foreground/10">
          {CLASSES.map((c) => (
            <li
              key={c.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 py-7 md:py-8 items-start md:items-center"
            >
              <div className="md:col-span-3">
                <p className="font-serif text-lg text-foreground">{c.date}</p>
                <p className="mt-1 text-xs tracking-[0.2em] uppercase text-muted-foreground">
                  {c.time ?? "Time TBA"}
                </p>
              </div>
              <div className="md:col-span-5">
                <p className="font-serif text-xl leading-snug text-foreground">{c.name}</p>
                <p className="mt-1 text-sm text-foreground/65">
                  {[c.location, c.durationMin ? `${c.durationMin} min` : null, c.note].filter(Boolean).join(" · ")}
                </p>
              </div>
              <div className="md:col-span-2 md:text-right">
                {c.price != null ? (
                  <p className="text-sm text-foreground/80">A${c.price}</p>
                ) : (
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Pricing TBA</p>
                )}
                {c.spots != null && (
                  <p className={`mt-1 text-[0.65rem] tracking-[0.25em] uppercase ${c.spots <= 3 ? "text-honey" : "text-muted-foreground"}`}>
                    {c.spots <= 3 ? `${c.spots} seats left` : `${c.spots} seats`}
                  </p>
                )}
              </div>
              <div className="md:col-span-2 md:text-right">
                {c.completed ? (
                  <span className="text-sm tracking-[0.18em] uppercase text-muted-foreground">
                    Completed
                  </span>
                ) : (
                  <Link
                    href="/begin"
                    className="text-sm tracking-[0.18em] uppercase text-foreground border-b border-honey/60 pb-1 hover:border-honey transition-colors"
                  >
                    Register interest
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-14 text-center text-sm text-foreground/65">
          Hosting a private group or workplace session?{" "}
          <Link
            href="/begin"
            className="text-foreground border-b border-honey/60 pb-0.5 hover:border-honey"
          >
            Get in touch with Neshi
          </Link>
          .
        </p>
      </section>

      <SiteFooter />

      {/* PLAYER DRAWER */}
      {playing && (
        <div className="fixed inset-x-0 bottom-0 z-50 px-3 sm:px-6 pb-4 sm:pb-6 pointer-events-none">
          <div
            className="dark-section pointer-events-auto mx-auto max-w-3xl rounded-3xl bg-deep text-cream border border-cream/10 shadow-[var(--shadow-soft)] relative overflow-hidden reveal"
            style={{ animationDuration: "0.5s" }}
          >
            <div className="absolute inset-0 glow-amber opacity-30 pointer-events-none" />
            <FlowerOfLife className="pointer-events-none absolute -right-12 -bottom-12 h-64 w-64 text-honey/15 breathe-slow" />
            <div className="relative flex items-center gap-5 p-5 sm:p-6">
              <button
                aria-label="Play"
                className="h-14 w-14 shrink-0 rounded-full bg-honey text-deep flex items-center justify-center shadow-[var(--shadow-glow)]"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 ml-0.5" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <div className="min-w-0 flex-1">
                <p className="text-[0.6rem] tracking-[0.28em] uppercase text-honey">
                  {playing.intention}
                </p>
                <p className="mt-1 font-serif text-xl sm:text-2xl text-cream truncate">
                  {playing.title}
                </p>
                <div className="mt-3 h-px w-full bg-cream/20 relative">
                  <span className="absolute left-0 top-0 h-full bg-honey breathe" style={{ width: "8%" }} />
                </div>
                <p className="mt-2 text-[0.65rem] tracking-[0.25em] uppercase text-cream/45">
                  Audio coming soon — {playing.duration}
                </p>
              </div>
              <button
                onClick={() => setPlaying(null)}
                className="shrink-0 text-cream/60 hover:text-cream text-[0.65rem] tracking-[0.28em] uppercase"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
