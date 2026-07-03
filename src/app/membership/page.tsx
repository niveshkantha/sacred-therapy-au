import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { FlowerOfLife } from "@/components/FlowerOfLife";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Membership — Sacred Therapy",
  description: "Three quiet paths — from a free beginning, to the full sanctuary, to the inner circle.",
};

const tiers = [
  {
    name: "The Quiet Path",
    price: "Free",
    note: "Begin gently",
    featured: true,
    description: "A soft place to start. No commitment, no pressure — just a quiet space to explore what healing could feel like.",
    features: [
      "Daily mood check-ins",
      "Sample meditations & breathwork",
      "A taste of the Sound Sanctuary",
      "Weekly emotional support emails",
    ],
  },
  {
    name: "The Sanctuary",
    price: "$29",
    per: "/month",
    note: "Coming soon",
    description: "Full access to the Sacred Therapy ecosystem. Every journey, every sound, every practice — whenever you need it.",
    features: [
      "Full Sound Sanctuary access",
      "All Healing Journeys & Breathwork",
      "Journaling space + daily rituals",
      "Personalised mood-based recommendations",
      "Streak tracking (gentle, no pressure)",
      "Priority access to new content",
    ],
  },
  {
    name: "The Inner Circle",
    price: "$290",
    per: "/year",
    note: "Two months on us",
    description: "For the woman ready to commit to herself. Everything in The Sanctuary, plus live healing spaces with Neshi.",
    features: [
      "Everything in The Sanctuary",
      "Monthly live healing circles",
      "Founder Q&As with Neshi",
      "Priority access to retreats",
      "Early access to new programs",
      "Annual saves you two months",
    ],
  },
];

export default function MembershipPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <SiteHeader />
      <FlowerOfLife className="pointer-events-none absolute -right-40 top-20 h-[640px] w-[640px] text-foreground/[0.05] breathe-slow" />

      <section className="relative mx-auto max-w-4xl px-6 md:px-10 pt-48 pb-20 text-center">
        <p className="label-caps label-caps-accent reveal">— Membership —</p>
        <h1 className="reveal reveal-delay-1 mt-6 font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[1.05]">
          When you&apos;re ready to go deeper.
        </h1>
        <p className="reveal reveal-delay-2 mt-8 text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto">
          Three quiet paths — from a free beginning, to the full sanctuary, to
          the inner circle. Choose the key to open the door that feels right for now.
        </p>
      </section>

      <section className="relative mx-auto max-w-6xl px-6 md:px-10 pb-32">
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
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

              <p className={`mt-6 text-sm leading-relaxed ${tier.featured ? "text-cream/70" : "text-foreground/65"}`}>
                {tier.description}
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
                <button
                  disabled
                  className={`mt-10 inline-flex w-full justify-center rounded-full py-3 text-[0.7rem] uppercase tracking-[0.22em] cursor-not-allowed ${
                    tier.featured
                      ? "bg-honey/40 text-deep/60"
                      : "border border-foreground/20 text-foreground/40"
                  }`}
                >
                  Coming soon
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-20 text-center space-y-4">
          <p className="text-sm text-foreground/60">
            All subscriptions are in AUD. Cancel anytime — no questions asked.
          </p>
          <p className="text-xs text-muted-foreground">
            Questions?{" "}
            <Link href="/begin" className="border-b border-honey/60 pb-0.5 hover:border-honey text-foreground/70">
              Reach out gently
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ-STYLE SECTION */}
      <section className="relative py-24 bg-secondary/40 overflow-hidden">
        <Image
          src="/images/hero-stillness.jpg"
          alt=""
          fill
          className="object-cover opacity-10"
        />
        <div className="relative mx-auto max-w-2xl px-6 md:px-10">
          <p className="label-caps label-caps-accent text-center">— You might be wondering —</p>
          <div className="mt-12 space-y-10">
            {[
              { q: "Is this therapy?", a: "Sacred Therapy offers therapeutic tools and practices — breathwork, hypnosis, nervous system education — but is not a replacement for 1:1 clinical therapy. If you are in crisis, please reach out to a mental health professional." },
              { q: "Can I cancel anytime?", a: "Yes. No lock-in, no exit interview, no guilt. Cancel from your account whenever you like. We hope you'll stay, but we'll understand if you go." },
              { q: "What if I'm new to breathwork or meditation?", a: "Perfect. Most of what we offer is designed for beginners. The practices guide you. You don't need to know what you're doing — just be willing to start." },
            ].map((item) => (
              <div key={item.q}>
                <h3 className="font-serif text-xl text-foreground">{item.q}</h3>
                <p className="mt-3 text-foreground/70 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
