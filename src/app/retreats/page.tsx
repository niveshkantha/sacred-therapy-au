import Image from "next/image";
import type { Metadata } from "next";
import { FlowerOfLife } from "@/components/FlowerOfLife";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Retreats — Sacred Therapy",
  description: "Retreats and live healing circles are being prepared. Leave your email and we'll let you know — gently — when the doors open.",
};

export default function RetreatsPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <SiteHeader />
      <Image
        src="/images/journey-linen.jpg"
        alt=""
        fill
        priority
        className="object-cover opacity-15 pointer-events-none"
      />
      <FlowerOfLife className="pointer-events-none absolute -right-40 top-20 h-[640px] w-[640px] text-foreground/[0.05] breathe-slow" />

      <section className="relative mx-auto max-w-4xl px-6 md:px-10 pt-48 pb-32 text-center">
        <p className="label-caps label-caps-accent reveal">— Retreats &amp; Live Sessions —</p>
        <h1 className="reveal reveal-delay-1 mt-6 font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[1.05]">
          Soon, we gather.
        </h1>
        <p className="reveal reveal-delay-2 mt-8 text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto">
          Retreats and live healing circles are being prepared with care. Intimate
          gatherings for women ready to soften, breathe, and come home to
          themselves — together.
        </p>

        <div className="reveal reveal-delay-3 mt-16 mx-auto max-w-md">
          <p className="text-sm text-foreground/60 mb-6">
            Leave your email and we&apos;ll let you know — gently — when the
            doors open.
          </p>
          <form className="flex w-full gap-2">
            <input
              type="email"
              required
              placeholder="Your email"
              className="flex-1 rounded-full bg-card border border-border px-5 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 transition"
            />
            <button type="submit" className="btn-soft !py-3 !px-6 text-[0.7rem]">
              Notify me
            </button>
          </form>
        </div>

        <div className="reveal reveal-delay-4 mt-24">
          <FlowerOfLife className="mx-auto h-16 w-16 text-accent/40 breathe-slow" />
          <p className="mt-8 text-xs tracking-[0.25em] uppercase text-muted-foreground">
            Settling in. This space is being prepared with care.
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
