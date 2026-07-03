import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { FlowerOfLife } from "@/components/FlowerOfLife";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Meet Neshi Jayamaha — Founder of Sacred Therapy",
  description:
    "Clinical psychotherapist, clinical hypnotherapist, breathwork practitioner, and Master NLP practitioner. The story behind Sacred Therapy AU.",
};

const modalities = [
  "Clinical Psychotherapist",
  "Clinical Hypnotherapist",
  "Master Practitioner of Neuro-Linguistic Programming",
  "Breathwork Practitioner",
  "Life Coach",
];

export default function AboutPage() {
  return (
    <main className="relative bg-background text-foreground overflow-x-hidden">
      <SiteHeader />

      {/* HERO */}
      <section className="relative">
        <div className="relative h-[70svh] min-h-[480px] w-full overflow-hidden">
          <Image
            src="/images/founder-neshi2.png"
            alt="Neshi standing on a wooden deck overlooking the ocean"
            fill
            priority
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-honey/15 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="relative -mt-40 md:-mt-56 z-10 mx-auto max-w-4xl px-6 md:px-10 text-center">
          <p className="label-caps label-caps-accent reveal">— Founder —</p>
          <h1 className="reveal reveal-delay-1 mt-6 font-serif text-[clamp(2.75rem,7vw,5.5rem)] leading-[1.02] tracking-tight">
            Meet Neshi.
          </h1>
          <p className="reveal reveal-delay-2 mt-6 font-serif italic text-xl md:text-2xl text-foreground/75 leading-relaxed">
            Clinical psychotherapist. Clinical hypnotherapist. Quiet student of
            the body&apos;s wisdom.
          </p>
        </div>
      </section>

      {/* THE STORY */}
      <section className="relative py-32 md:py-40">
        <FlowerOfLife className="pointer-events-none absolute -right-40 top-20 h-[560px] w-[560px] text-foreground/[0.04] breathe-slow" />
        <div className="relative mx-auto max-w-5xl px-6 md:px-10 grid md:grid-cols-[1fr_320px] gap-16 items-start">
        <div className="space-y-10 text-lg leading-[1.85] text-foreground/80 font-light">
          <p>
            Neshi didn&apos;t come to this work through a textbook. He came to it the way
            most healers do, slowly, and by needing it himself first. The body, he
            learned, holds what the mind cannot yet speak.
          </p>
          <p>
            Born in Sri Lanka, he grew up around the quiet rituals of an older
            world — where stillness, breath, and presence were never separate from
            healing. That early language stayed with him, long after the move to
            Australia, long after the years of training that followed.
          </p>
          <p>
            After training as a clinical psychotherapist and clinical
            hypnotherapist, becoming a Master Practitioner of Neuro-Linguistic
            Programming, and deepening into breathwork and life coaching, he built
            Sacred Therapy as the space he once searched for and couldn&apos;t find.
          </p>
          <p>
            His work sits at the meeting place of modern clinical psychology and
            older, embodied wisdom. There is no spiritual bypass here. No
            performative healing. No fixing of people who were never broken to
            begin with.
          </p>
          <p>
            Neshi believes the nervous system is the doorway. That self-worth
            is not built but remembered. That hypnosis, breath, and presence are
            some of the oldest, most precise tools we have for coming home to
            ourselves. This sanctuary is his offering — a quiet place to do the
            long, gentle work, held by someone who has done it himself.
          </p>
        </div>
        <div className="hidden md:block sticky top-32">
          <div className="relative overflow-hidden rounded-3xl aspect-[3/4]">
            <Image
              src="/images/founder-neshi.jpg"
              alt="Neshi and partner on a wooden deck overlooking the ocean"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-honey/10 mix-blend-multiply" />
          </div>
        </div>
        </div>
      </section>

      {/* CREDENTIALS */}
      <section className="relative py-24 md:py-32 bg-secondary/40">
        <div className="mx-auto max-w-xl px-6 text-center">
          <p className="label-caps label-caps-accent">— Training &amp; Modalities —</p>
          <ul className="mt-12 flex flex-col">
            {modalities.map((m, i) => (
              <li
                key={m}
                className={`py-5 font-serif italic text-xl md:text-2xl text-foreground/85 ${
                  i !== 0 ? "border-t border-foreground/15" : ""
                }`}
              >
                {m}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* A NOTE FROM NESH */}
      <section className="relative py-28 md:py-36 bg-secondary/40 overflow-hidden">
        <Image
          src="/images/journey-hands.jpg"
          alt=""
          fill
          className="object-cover opacity-10"
        />
        <div className="relative mx-auto max-w-2xl px-6 md:px-10 text-center">
          <p className="label-caps label-caps-accent">— A Note From Neshi —</p>
          <p className="mt-10 font-serif text-2xl md:text-[1.75rem] leading-[1.5] text-foreground/85">
            If you&apos;ve found your way here, something in you is asking to be
            heard. You don&apos;t have to know what it is yet. You don&apos;t have
            to be ready. You just have to be willing to soften, even a little.
            I&apos;ll meet you there.
          </p>
          <p className="mt-10 font-serif italic text-lg text-foreground/70">
            — Neshi Jayamaha
          </p>
        </div>
      </section>

      {/* SOFT CTA */}
      <section className="relative py-32 md:py-40">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <FlowerOfLife className="mx-auto h-10 w-10 text-accent breathe-slow" />
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-16">
            <Link
              href="/begin"
              className="text-sm uppercase tracking-[0.24em] border-b border-foreground/30 pb-1 hover:border-accent hover:text-accent transition-colors duration-500"
            >
              Begin your journey &rarr;
            </Link>
            <Link
              href="/membership"
              className="text-sm uppercase tracking-[0.24em] border-b border-foreground/30 pb-1 hover:border-accent hover:text-accent transition-colors duration-500"
            >
              Step into the Sanctuary &rarr;
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
