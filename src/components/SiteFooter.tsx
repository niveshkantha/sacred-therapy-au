import Link from "next/link";
import { FlowerOfLife } from "./FlowerOfLife";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-secondary/40 mt-32">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-10">
        <div className="flex flex-col items-center text-center">
          <FlowerOfLife className="h-14 w-14 text-foreground/70 breathe-slow" />

          <h3 className="mt-8 font-serif text-3xl md:text-4xl leading-tight max-w-xl">
            Receive weekly emotional support, healing rituals, and quiet reflections.
          </h3>
          <p className="mt-3 text-sm text-muted-foreground">
            No noise. Unsubscribe anytime.
          </p>

          <form className="mt-8 flex w-full max-w-md gap-2">
            <input
              type="email"
              required
              placeholder="Your email"
              className="flex-1 rounded-full bg-background/80 border border-border px-5 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 transition"
            />
            <button type="submit" className="btn-soft !py-3 !px-6 text-[0.7rem]">
              Subscribe
            </button>
          </form>
        </div>

        <div className="mt-24 grid grid-cols-2 gap-10 text-sm md:grid-cols-4 text-foreground/90">
          <div>
            <p className="label-caps mb-4 !text-foreground/70">Sanctuary</p>
            <ul className="space-y-2">
              <li><Link href="/sound-sanctuary" className="hover:text-foreground transition">Sound Sanctuary</Link></li>
              <li><Link href="/breathwork" className="hover:text-foreground transition">Breathwork</Link></li>
              <li><Link href="/journeys" className="hover:text-foreground transition">Journeys</Link></li>
            </ul>
          </div>
          <div>
            <p className="label-caps mb-4 !text-foreground/70">Community</p>
            <ul className="space-y-2">
              <li><Link href="/membership" className="hover:text-foreground transition">Membership</Link></li>
              <li><Link href="/retreats" className="hover:text-foreground transition">Retreats</Link></li>
            </ul>
          </div>
          <div>
            <p className="label-caps mb-4 !text-foreground/70">About</p>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-foreground transition">Founder</Link></li>
              <li><Link href="/begin" className="hover:text-foreground transition">Reach out</Link></li>
            </ul>
          </div>
          <div>
            <p className="label-caps mb-4 !text-foreground/70">Quiet</p>
            <ul className="space-y-2">
              <li><span className="text-foreground/75">Privacy</span></li>
              <li><span className="text-foreground/75">Terms</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/60 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-foreground/75">
          <p>&copy; {new Date().getFullYear()} Sacred Therapy AU. Made gently.</p>
          <p className="tracking-[0.2em] uppercase">Come home to yourself.</p>
        </div>
      </div>
    </footer>
  );
}
