import Image from "next/image";
import Link from "next/link";
import { FlowerOfLife } from "@/components/FlowerOfLife";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const feelings = [
  { slug: "anxious", label: "Anxious", note: "racing thoughts, tight chest" },
  { slug: "overwhelmed", label: "Overwhelmed", note: "too much, too fast" },
  { slug: "disconnected", label: "Disconnected", note: "from self, from body" },
  { slug: "burnt-out", label: "Burnt out", note: "the empty kind of tired" },
  { slug: "seeking-confidence", label: "Seeking confidence", note: "ready to come back to you" },
];

const promises = [
  {
    title: "Nervous System Regulation",
    body: "Practices rooted in polyvagal theory and somatic healing — to gently bring the body home.",
  },
  {
    title: "Emotional Safety",
    body: "A space without performance. Without pressure. Without the noise of becoming someone else.",
  },
  {
    title: "Quiet Transformation",
    body: "The kind of change that doesn’t announce itself. The kind that lasts.",
  },
];

const journeys = [
  { title: "21 Days to a Regulated Nervous System", duration: "21 days", tag: "Foundational" },
  { title: "Rebuilding Self-Worth", duration: "14 days", tag: "Inner Work" },
  { title: "Releasing the Anxious Mind", duration: "10 days", tag: "Calming" },
];

const sanctuaryTracks = [
  { title: "Soft Landing", mood: "I can't sleep", duration: "7 min" as string | null },
  { title: "Sacred Stillness", mood: "I feel emotionally overwhelmed", duration: "23 min" as string | null },
  { title: "Rejuvenating Your Inner Energy", mood: "I feel drained", duration: "13 min" as string | null },
];

export default function Home() {
  return (
    <main className="relative overflow-x-hidden bg-background text-foreground">
      <SiteHeader />

      {/* HERO */}
      <section className="relative min-h-[100svh] flex items-center">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          poster="/images/hero-stillness.jpg"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/65 to-background/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/90" />

        <FlowerOfLife className="pointer-events-none absolute -right-32 top-1/4 h-[640px] w-[640px] text-foreground/[0.07] breathe-slow" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10 pt-32 pb-24">
          <div className="max-w-2xl">
            <p className="label-caps label-caps-accent reveal">
              — A Sanctuary For Becoming —
            </p>
            <h1 className="reveal reveal-delay-1 mt-6 font-serif text-[clamp(2.75rem,7vw,5.75rem)] leading-[1.02] tracking-tight">
              Come home <br /> to yourself.
            </h1>
            <p className="reveal reveal-delay-2 mt-8 max-w-lg text-lg leading-relaxed text-foreground/75">
              A sanctuary for emotional healing, nervous system regulation, and
              the quiet work of becoming.
            </p>
            <div className="reveal reveal-delay-3 mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/begin" className="btn-soft">
                Begin your journey
              </Link>
              <Link href="/sound-sanctuary" className="btn-ghost">
                Explore healing sounds
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-foreground/50">
          <span className="label-caps text-[0.6rem]">Exhale</span>
          <span className="block h-12 w-px bg-foreground/30 breathe" />
        </div>
      </section>

      {/* FEELING TILES */}
      <section className="relative py-32 md:py-40">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="text-center max-w-2xl mx-auto">
            <p className="label-caps label-caps-accent">— A Soft Beginning —</p>
            <h2 className="mt-5 font-serif text-4xl md:text-5xl leading-tight">
              How are you feeling lately?
            </h2>
            <p className="mt-5 text-foreground/70 leading-relaxed">
              There&apos;s no wrong answer, just what&apos;s true for you right now.
              Share it, and we&apos;ll inbox you a small care package curated for you.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {feelings.map((f) => (
              <Link
                key={f.label}
                href={`/begin?feeling=${f.slug}`}
                className="group relative rounded-3xl bg-card border border-border/60 p-7 text-left transition-all duration-700 hover:border-accent/60 hover:shadow-[var(--shadow-glow)] hover:-translate-y-1"
              >
                <FlowerOfLife className="absolute right-4 top-4 h-8 w-8 text-foreground/10 group-hover:text-accent/40 transition-colors duration-700" />
                <p className="font-serif text-2xl">{f.label}</p>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {f.note}
                </p>
                <p className="mt-8 text-[0.65rem] tracking-[0.25em] uppercase text-foreground/40 group-hover:text-accent transition-colors">
                  Meet me here &rarr;
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROMISE */}
      <section className="relative py-32 bg-secondary/50 overflow-hidden">
        <FlowerOfLife className="pointer-events-none absolute -left-40 top-1/2 -translate-y-1/2 h-[600px] w-[600px] text-foreground/[0.05]" />
        <div className="relative mx-auto max-w-6xl px-6 md:px-10">
          <div className="text-center max-w-2xl mx-auto">
            <p className="label-caps label-caps-accent">— The Sacred Therapy Promise —</p>
            <h2 className="mt-5 font-serif text-4xl md:text-5xl leading-tight">
              Healing that meets you where you are.
            </h2>
          </div>
          <div className="mt-20 grid md:grid-cols-3 gap-10 md:gap-16">
            {promises.map((p) => (
              <div key={p.title} className="text-center md:text-left">
                <FlowerOfLife className="h-12 w-12 text-accent mx-auto md:mx-0 breathe-slow" />
                <h3 className="mt-6 font-serif text-2xl">{p.title}</h3>
                <p className="mt-3 text-foreground/70 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER PREVIEW */}
      <section className="relative py-32 md:py-40">
        <div className="mx-auto max-w-6xl px-6 md:px-10 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl aspect-[3/4]">
              <Image
                src="/images/founder-neshi.jpg"
                alt="Neshi and partner on a wooden deck overlooking the ocean"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-honey/10 mix-blend-multiply" />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 rounded-full bg-background/90 backdrop-blur p-4 shadow-[var(--shadow-soft)]">
              <FlowerOfLife className="h-12 w-12 text-foreground breathe-slow" />
            </div>
          </div>
          <div>
            <p className="label-caps label-caps-accent">— Founder Story —</p>
            <h2 className="mt-5 font-serif text-4xl md:text-5xl leading-tight">
              Built by Neshi. Built from the healing he couldn&apos;t find anywhere else.
            </h2>
            <p className="mt-8 text-lg text-foreground/75 leading-relaxed">
              Born in Sri Lanka, now based in Australia — Neshi is a clinical
              psychotherapist, clinical hypnotherapist, breathwork practitioner,
              and Master NLP practitioner. He created Sacred Therapy as the
              sanctuary he once searched for.
            </p>
            <p className="mt-4 text-foreground/70 leading-relaxed">
              Modern psychology met with embodied, grounded wisdom. Without the
              bypass. Without the noise.
            </p>
            <Link
              href="/about"
              className="mt-10 inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] border-b border-foreground/30 pb-1 hover:border-accent hover:text-accent transition-colors duration-500"
            >
              Read the full story
            </Link>
          </div>
        </div>
      </section>

      {/* SOUND SANCTUARY PREVIEW (dark) */}
      <section className="relative bg-deep text-cream py-32 md:py-40 overflow-hidden grain">
        <Image
          src="/images/sanctuary-candle.jpg"
          alt=""
          fill
          className="object-cover opacity-20 mix-blend-luminosity"
        />
        <div className="absolute inset-0 glow-amber opacity-50" />
        <FlowerOfLife className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] text-cream/[0.04] breathe-slow" />
        <div className="relative mx-auto max-w-6xl px-6 md:px-10">
          <div className="max-w-xl">
            <p className="label-caps !text-honey">— The Sound Sanctuary —</p>
            <h2 className="mt-5 font-serif text-4xl md:text-5xl leading-tight text-cream">
              Hand-selected hypnosis music to guide the nervous system home.
            </h2>
            <p className="mt-6 text-cream/75 leading-relaxed">
              An immersive library of curated sound journeys — for sleep, for
              grief, for stillness, for the inner child who is finally being
              heard.
            </p>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-5">
            {sanctuaryTracks.map((t) => (
              <div
                key={t.title}
                className="group rounded-3xl border border-cream/10 bg-cream/[0.03] backdrop-blur-sm p-6 transition-all duration-700 hover:bg-cream/[0.07] hover:border-honey/40"
              >
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-honey/30 to-deep flex items-center justify-center relative overflow-hidden">
                  <FlowerOfLife className="h-32 w-32 text-cream/80 breathe-slow" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-deep/40">
                    <span className="h-14 w-14 rounded-full bg-cream/95 text-deep flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="h-5 w-5 ml-0.5" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </div>
                </div>
                <p className="mt-5 text-[0.65rem] tracking-[0.25em] uppercase text-honey">
                  {t.mood}
                </p>
                <p className="mt-2 font-serif text-xl text-cream">{t.title}</p>
                {t.duration && <p className="mt-1 text-xs text-cream/60">{t.duration}</p>}
              </div>
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <Link href="/sound-sanctuary" className="btn-soft !bg-honey !text-deep">
              Enter the Sound Sanctuary
            </Link>
          </div>
        </div>
      </section>

      {/* JOURNEYS */}
      <section className="relative py-32 md:py-40">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex items-end justify-between flex-wrap gap-6 max-w-4xl">
            <div>
              <p className="label-caps label-caps-accent">— Transformation Journeys —</p>
              <h2 className="mt-5 font-serif text-4xl md:text-5xl leading-tight max-w-xl">
                Guided programs for the long, gentle work.
              </h2>
            </div>
            <Link
              href="/journeys"
              className="text-xs uppercase tracking-[0.22em] border-b border-foreground/30 pb-1 hover:border-accent hover:text-accent transition-colors duration-500"
            >
              View all journeys
            </Link>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {journeys.map((j) => (
              <Link href="/journeys" key={j.title} className="group block">
                <div className="relative overflow-hidden rounded-3xl aspect-[4/5]">
                  <Image
                    src="/images/journey-ocean.jpg"
                    alt=""
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep/60 via-transparent to-transparent" />
                  <p className="absolute top-5 left-5 label-caps !text-cream/90">
                    {j.tag}
                  </p>
                  <p className="absolute bottom-5 right-5 text-xs text-cream/80 tracking-wider">
                    {j.duration}
                  </p>
                </div>
                <h3 className="mt-5 font-serif text-2xl group-hover:text-accent transition-colors duration-500">
                  {j.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MEMBERSHIP */}
      <section className="relative py-32 md:py-40">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="text-center max-w-2xl mx-auto">
            <p className="label-caps label-caps-accent">— Membership —</p>
            <h2 className="mt-5 font-serif text-4xl md:text-5xl leading-tight">
              When you&apos;re ready to go deeper.
            </h2>
          </div>
          <div className="mt-20 grid md:grid-cols-3 gap-6">
            {[
              {
                name: "The Quiet Path",
                price: "Free",
                note: "Begin gently",
                features: ["Daily mood check-ins", "Sample meditations", "A taste of the Sound Sanctuary"],
                featured: true,
              },
              {
                name: "The Sanctuary",
                price: "$29",
                per: "/month",
                note: "Coming soon",
                features: ["Full Sound Sanctuary access", "All Healing Journeys & Breathwork", "Journaling space + daily rituals"],
              },
              {
                name: "The Inner Circle",
                price: "$290",
                per: "/year",
                note: "Two months on us",
                features: ["Everything in The Sanctuary", "Monthly live healing circles", "Founder Q&As & retreat priority"],
              },
            ].map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-3xl p-10 transition-all duration-700 ${
                  tier.featured
                    ? "bg-deep text-cream border border-honey/40 md:scale-105 shadow-[var(--shadow-glow)]"
                    : "bg-card border border-border/60"
                }`}
              >
                {tier.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-honey text-deep px-4 py-1 rounded-full text-[0.65rem] tracking-[0.25em] uppercase">
                    Most Chosen
                  </span>
                )}
                <p className={`text-xs uppercase tracking-[0.25em] ${tier.featured ? "text-honey" : "text-muted-foreground"}`}>
                  {tier.note}
                </p>
                <h3 className="mt-3 font-serif text-3xl">{tier.name}</h3>
                <p className="mt-6 font-serif text-5xl">
                  {tier.price}
                  <span className="text-base text-muted-foreground font-sans">{tier.per ?? ""}</span>
                </p>
                <ul className={`mt-8 space-y-3 text-sm ${tier.featured ? "text-cream/80" : "text-foreground/75"}`}>
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <span className={`mt-2 h-1 w-1 rounded-full shrink-0 ${tier.featured ? "bg-honey" : "bg-sand"}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                {tier.price === "Free" ? (
                  <Link
                    href="/begin"
                    className={`mt-10 inline-flex w-full justify-center rounded-full py-3 text-[0.7rem] uppercase tracking-[0.22em] transition-all duration-500 border ${
                      tier.featured
                        ? "bg-honey text-deep border-honey hover:bg-honey/90"
                        : "border-foreground/30 hover:border-accent hover:text-accent"
                    }`}
                  >
                    Collect your key
                  </Link>
                ) : (
                  <span
                    className={`mt-10 inline-flex w-full justify-center rounded-full py-3 text-[0.7rem] uppercase tracking-[0.22em] cursor-not-allowed ${
                      tier.featured
                        ? "bg-honey/40 text-deep/60"
                        : "border border-foreground/20 text-foreground/40"
                    }`}
                  >
                    Coming soon
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
