import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { FlowerOfLife } from "@/components/FlowerOfLife";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Healing Journeys — Sacred Therapy",
  description: "Guided multi-day programs for nervous system regulation, self-worth, and the soft rebuilding of you.",
};

const journeys = [
  {
    title: "21 Days to a Regulated Nervous System",
    duration: "21 days",
    tag: "Foundational",
    description: "A gentle, daily practice to teach the body what safety feels like. Guided breathwork, nervous system education, somatic check-ins, and evening wind-downs.",
    includes: ["21 guided audio sessions", "Daily journaling prompts", "Somatic awareness exercises", "Nervous system education"],
  },
  {
    title: "Rebuilding Self-Worth",
    duration: "14 days",
    tag: "Inner Work",
    description: "For the woman who has been performing her worth for others. A journey back to the quiet knowing that was always there.",
    includes: ["14 hypnosis sessions", "Inner child meditations", "Self-compassion practices", "Reflective journaling"],
  },
  {
    title: "Releasing the Anxious Mind",
    duration: "10 days",
    tag: "Calming",
    description: "When the mind won't stop running. Short, daily practices to interrupt the spiral and teach the body a new rhythm.",
    includes: ["10 guided breathwork sessions", "Anxiety psychoeducation", "Grounding techniques", "Sleep-prep rituals"],
  },
  {
    title: "The Grief Companion",
    duration: "12 days",
    tag: "Tender",
    description: "Grief doesn't move on a schedule. This journey gives it room — through breath, through sound, through the quiet company of being witnessed.",
    includes: ["12 somatic sessions", "Grief-honouring rituals", "Sound healing tracks", "Gentle movement prompts"],
  },
  {
    title: "Coming Home to the Body",
    duration: "7 days",
    tag: "Somatic",
    description: "For the woman who lives in her head. A week of gentle practices to land back in the body and remember it is safe to feel.",
    includes: ["7 body-scan meditations", "Breathwork for presence", "Interoception exercises", "Sensory grounding"],
  },
  {
    title: "The Sleep Restoration",
    duration: "14 days",
    tag: "Rest",
    description: "When rest doesn't come easily. A nightly journey of theta-wave hypnosis, oceanic breathwork, and the slow permission to let go.",
    includes: ["14 sleep hypnosis recordings", "Evening wind-down rituals", "Breathwork for rest", "Sleep hygiene guidance"],
  },
];

export default function JourneysPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <SiteHeader />
      <FlowerOfLife className="pointer-events-none absolute -right-40 top-20 h-[640px] w-[640px] text-foreground/[0.05] breathe-slow" />

      <section className="relative mx-auto max-w-4xl px-6 md:px-10 pt-48 pb-20 text-center">
        <Image
          src="/images/journey-ocean.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-20 -z-10"
        />
        <p className="label-caps label-caps-accent reveal">— Transformation Journeys —</p>
        <h1 className="reveal reveal-delay-1 mt-6 font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[1.05]">
          The long, gentle work.
        </h1>
        <p className="reveal reveal-delay-2 mt-8 text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto">
          Guided multi-day programs for nervous system regulation, self-worth, and
          the soft rebuilding of you.
        </p>
      </section>

      <section className="relative mx-auto max-w-6xl px-6 md:px-10 pb-32">
        <div className="grid md:grid-cols-2 gap-6">
          {journeys.map((j) => (
            <article
              key={j.title}
              className="group rounded-3xl border border-border/60 bg-card p-8 md:p-10 transition-all duration-700 hover:border-accent/40 hover:shadow-[var(--shadow-soft)] hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[0.6rem] tracking-[0.28em] uppercase text-sand bg-sand/10 px-3 py-1 rounded-full">
                  {j.tag}
                </span>
                <span className="text-xs text-muted-foreground">{j.duration}</span>
              </div>

              <h3 className="font-serif text-2xl md:text-3xl leading-snug group-hover:text-accent transition-colors duration-500">
                {j.title}
              </h3>
              <p className="mt-4 text-foreground/70 leading-relaxed">{j.description}</p>

              <div className="mt-6 pt-6 border-t border-border/60">
                <p className="text-[0.65rem] tracking-[0.25em] uppercase text-muted-foreground mb-3">
                  What&apos;s included
                </p>
                <ul className="space-y-2 text-sm text-foreground/65">
                  {j.includes.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 rounded-full bg-honey shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/membership"
                className="mt-8 inline-flex text-xs uppercase tracking-[0.22em] border-b border-foreground/30 pb-1 hover:border-accent hover:text-accent transition-colors duration-500"
              >
                Begin this journey &rarr;
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-sm text-foreground/60">
            All journeys are included with{" "}
            <Link href="/membership" className="text-foreground border-b border-honey/60 pb-0.5 hover:border-honey">
              The Sanctuary
            </Link>{" "}
            membership.
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
