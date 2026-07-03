"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { FlowerOfLife } from "@/components/FlowerOfLife";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getGift } from "@/lib/gifts";

const contexts = [
  "I'm not sure yet — just exploring",
  "Anxiety or overwhelm",
  "Self-worth or confidence",
  "Grief or loss",
  "Burnout or exhaustion",
  "Breathwork or nervous system support",
  "Something else",
];

// Loose match from a homepage feeling slug to the closest chip below —
// purely a UI nicety. The actual gift sent is decided by giftSlug, not this.
const FEELING_TO_CONTEXT: Record<string, string> = {
  anxious: "Anxiety or overwhelm",
  overwhelmed: "Anxiety or overwhelm",
  "burnt-out": "Burnout or exhaustion",
  "seeking-confidence": "Self-worth or confidence",
};

function BeginForm() {
  const searchParams = useSearchParams();
  const giftSlug = searchParams.get("feeling");
  const gift = getGift(giftSlug);

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [context, setContext] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (giftSlug && FEELING_TO_CONTEXT[giftSlug]) {
      setContext(FEELING_TO_CONTEXT[giftSlug]);
    }
  }, [giftSlug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/begin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, context, message, giftSlug }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <SiteHeader />
      <Image
        src="/images/journey-hands.jpg"
        alt=""
        fill
        className="object-cover opacity-30 pointer-events-none"
      />
      <FlowerOfLife className="pointer-events-none absolute -right-40 top-20 h-[640px] w-[640px] text-foreground/[0.05] breathe-slow" />

      <section className="relative mx-auto max-w-2xl px-6 md:px-10 pt-48 pb-32">
        {!submitted ? (
          <>
            <p className="label-caps label-caps-accent reveal">— Reach Out Gently —</p>
            <h1 className="reveal reveal-delay-1 mt-6 font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05]">
              What brings you here?
            </h1>
            <p className="reveal reveal-delay-2 mt-8 text-lg text-foreground/85 leading-relaxed">
              A soft place to start. Share what&apos;s true, and we&apos;ll meet you
              where you are. No pressure. No scripts. Leave your email and we&apos;ll
              send a little something to begin with — our first gift to you.
            </p>

            <form onSubmit={handleSubmit} className="reveal reveal-delay-3 mt-12 space-y-6">
              <div className="space-y-2">
                <label className="text-xs tracking-[0.2em] uppercase text-foreground/75">
                  What brings you here?{" "}
                  <span className="normal-case tracking-normal text-foreground/55">(optional)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {contexts.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setContext(c)}
                      className={`px-4 py-2 rounded-full text-xs transition-all duration-500 border ${
                        context === c
                          ? "bg-espresso text-cream border-espresso"
                          : "border-border text-foreground/80 hover:border-honey hover:text-foreground"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs tracking-[0.2em] uppercase text-foreground/75">
                  Anything you&apos;d like to share{" "}
                  <span className="normal-case tracking-normal text-foreground/55">(optional)</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={2000}
                  rows={4}
                  placeholder="No pressure. Say as much or as little as feels right."
                  className="w-full rounded-2xl bg-card border border-border px-5 py-3.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 transition resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs tracking-[0.2em] uppercase text-foreground/75">
                  Your name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  maxLength={120}
                  className="w-full rounded-2xl bg-card border border-border px-5 py-3.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 transition"
                  placeholder="First name is enough"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs tracking-[0.2em] uppercase text-foreground/75">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  maxLength={200}
                  className="w-full rounded-2xl bg-card border border-border px-5 py-3.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 transition"
                />
                <p className="text-xs text-foreground/55 leading-relaxed">
                  Just so we know where to send a reply. No newsletters unless you ask.
                </p>
              </div>

              {error && (
                <p className="text-xs text-red-700/80 leading-relaxed">{error}</p>
              )}

              <button type="submit" disabled={submitting} className="btn-soft w-full mt-4 disabled:opacity-60">
                {submitting ? "Sending…" : "Send gently"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-20">
            <FlowerOfLife className="mx-auto h-20 w-20 text-honey breathe-slow" />
            <h2 className="mt-10 font-serif text-3xl md:text-4xl">
              Thank you, {name}.
            </h2>
            <p className="mt-6 text-lg text-foreground/70 leading-relaxed max-w-md mx-auto">
              Your message has landed softly. Neshi will be in touch — gently,
              and without rush. Until then, take care of yourself.
            </p>
            <p className="mt-6 text-sm text-foreground/60 leading-relaxed max-w-md mx-auto">
              Check your inbox — &quot;{gift.trackTitle}&quot; is on its way to you.
            </p>
            <p className="mt-12 text-xs tracking-[0.25em] uppercase text-foreground/75">
              Until next time.
            </p>
          </div>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}

export default function BeginPage() {
  return (
    <Suspense fallback={null}>
      <BeginForm />
    </Suspense>
  );
}
