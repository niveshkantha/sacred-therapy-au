"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FlowerOfLife } from "@/components/FlowerOfLife";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

// Emotional-state entry tags — the way a listener names how they arrive.
type Feeling =
  | "I feel anxious"
  | "I feel emotionally overwhelmed"
  | "I feel drained"
  | "I can't sleep"
  | "I feel stuck"
  | "I feel disconnected"
  | "I want confidence";

const FEELINGS: ("All" | Feeling)[] = [
  "All",
  "I feel anxious",
  "I feel emotionally overwhelmed",
  "I feel drained",
  "I can't sleep",
  "I feel stuck",
  "I feel disconnected",
  "I want confidence",
];

interface Track {
  slug: string;
  title: string;
  feeling: Feeling;
  // duration: formatted display string once known; null = pending manual/auto entry.
  duration: string | null;
  src: string;
}

const tracks: Track[] = [
  { slug: "rejuvenating-inner-energy", title: "Rejuvenating Your Inner Energy", feeling: "I feel drained", duration: "13 min", src: "/audio/rejuvenating-inner-energy.mp3" },
  { slug: "sacred-stillness", title: "Sacred Stillness", feeling: "I feel emotionally overwhelmed", duration: "23 min", src: "/audio/sacred-stillness.mp3" },
  { slug: "soft-landing", title: "Soft Landing", feeling: "I can't sleep", duration: "7 min", src: "/audio/soft-landing.mp3" },
  { slug: "woodland-mirror-radical-acceptance", title: "The Woodland Mirror: A Journey of Radical Acceptance", feeling: "I feel disconnected", duration: "13 min", src: "/audio/woodland-mirror-radical-acceptance.mp3" },
  { slug: "mirroring-water-mindset-alignment", title: "Mirroring the Water: Deep Mindset Alignment & Core Clarity", feeling: "I feel stuck", duration: "13 min", src: "/audio/mirroring-water-mindset-alignment.mp3" },
  { slug: "10-step-descent-to-clarity", title: "Into Clarity: A Guided Descent", feeling: "I feel stuck", duration: "13 min", src: "/audio/10-step-descent-to-clarity.mp3" },
  { slug: "brilliant-white-light-awareness", title: "Brilliant White Light: A Journey of Connected Awareness", feeling: "I feel disconnected", duration: "14 min", src: "/audio/brilliant-white-light-awareness.mp3" },
  { slug: "the-reset-subconscious-blueprinting", title: "The Reset: Subconscious Blueprinting", feeling: "I want confidence", duration: "10 min", src: "/audio/the-reset-subconscious-blueprinting.mp3" },
  { slug: "patience-and-intention", title: "Patience & Intention", feeling: "I feel anxious", duration: "8 min", src: "/audio/patience-and-intention.mp3" },
];

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const PREVIEW_SECONDS = 60;
const FADE_MS = 3000;
const GATE_STORAGE_KEY = "ss-gate-passed";
// Preview/email gate is a separate follow-up task — keep the logic wired but
// inert so this pass is raw playback only. Flip to true to re-enable the gate.
const GATE_ENABLED = false;

export default function SoundSanctuary() {
  const [active, setActive] = useState<(typeof FEELINGS)[number]>("All");
  const [playing, setPlaying] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [gatePassed, setGatePassed] = useState(false);
  const [showGate, setShowGate] = useState(false);
  const [gateVisible, setGateVisible] = useState(false);
  const [email, setEmail] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fadingRef = useRef(false);

  const filtered = active === "All" ? tracks : tracks.filter((t) => t.feeling === active);
  const current = tracks.find((t) => t.slug === playing);
  const hasAudio = Boolean(current?.src);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem(GATE_STORAGE_KEY) === "true") {
      setGatePassed(true);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!current?.src) {
      audio.pause();
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
      setAudioDuration(0);
      return;
    }
    clearFade();
    audio.volume = 1;
    audio.src = current.src;
    audio.currentTime = 0;
    audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  }, [current?.src]);

  function clearFade() {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
    fadingRef.current = false;
  }

  function startFadeOut() {
    const audio = audioRef.current;
    if (!audio || fadingRef.current) return;
    fadingRef.current = true;
    const startVolume = audio.volume;
    const steps = 60;
    const stepMs = FADE_MS / steps;
    let i = 0;
    fadeIntervalRef.current = setInterval(() => {
      i += 1;
      const next = startVolume * (1 - i / steps);
      audio.volume = Math.max(0, next);
      if (i >= steps) {
        clearFade();
        audio.pause();
        audio.volume = 1;
        setShowGate(true);
        requestAnimationFrame(() => setGateVisible(true));
      }
    }, stepMs);
  }

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio || !hasAudio) return;
    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }

  function handleSeek(e: React.MouseEvent<HTMLDivElement>) {
    const audio = audioRef.current;
    if (!audio || !audioDuration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = Math.max(0, Math.min(1, pct)) * audioDuration;
  }

  function closePlayer() {
    clearFade();
    if (audioRef.current) audioRef.current.volume = 1;
    audioRef.current?.pause();
    setPlaying(null);
    setGateVisible(false);
    setShowGate(false);
  }

  function handleGateSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setGatePassed(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(GATE_STORAGE_KEY, "true");
    }
    setGateVisible(false);
    setTimeout(() => {
      setShowGate(false);
      const audio = audioRef.current;
      if (audio) {
        audio.volume = 1;
        audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    }, 500);
  }

  return (
    <main className="relative min-h-screen bg-deep text-cream overflow-hidden grain">
      <Image
        src="/images/sanctuary-candle.jpg"
        alt=""
        fill
        priority
        className="object-cover opacity-15 mix-blend-luminosity pointer-events-none"
      />
      <div className="dark-section">
        <SiteHeader />
      </div>

      <div className="absolute inset-0 glow-amber opacity-40 pointer-events-none" />
      <FlowerOfLife className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-40 h-[720px] w-[720px] text-cream/[0.04] breathe-slow" />

      <section className="relative pt-40 pb-16 text-center px-6">
        <p className="label-caps !text-honey reveal">— The Sound Sanctuary —</p>
        <h1 className="reveal reveal-delay-1 mt-6 font-serif text-[clamp(2.75rem,7vw,5.5rem)] leading-[1.05] text-cream">
          Sound to bring you home.
        </h1>
        <p className="reveal reveal-delay-2 mt-8 max-w-xl mx-auto text-cream/75 leading-relaxed">
          Hand-selected hypnosis meditation music to guide the nervous system
          gently back to safety.
        </p>
      </section>

      {/* Mood filters */}
      <div className="relative max-w-5xl mx-auto px-6 mb-14">
        <div className="flex flex-wrap justify-center gap-2">
          {FEELINGS.map((m) => (
            <button
              key={m}
              onClick={() => setActive(m)}
              className={`px-5 py-2 rounded-full text-xs uppercase tracking-[0.22em] transition-all duration-500 border ${
                active === m
                  ? "bg-honey text-deep border-honey"
                  : "border-cream/15 text-cream/70 hover:border-honey/50 hover:text-cream"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Track grid */}
      <section className="relative mx-auto max-w-6xl px-6 pb-40">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((t) => (
            <button
              key={t.slug}
              onClick={() => setPlaying(t.slug)}
              className="group text-left rounded-3xl border border-cream/10 bg-cream/[0.03] backdrop-blur-sm p-6 transition-all duration-700 hover:bg-cream/[0.07] hover:border-honey/40 hover:-translate-y-1"
            >
              <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-honey/30 via-sand/20 to-deep flex items-center justify-center overflow-hidden">
                <FlowerOfLife className="h-36 w-36 text-cream/80 breathe-slow" />
                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-deep/40">
                  <span className="h-14 w-14 rounded-full bg-cream/95 text-deep flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 ml-0.5" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
              </div>
              <p className="mt-5 text-[0.65rem] tracking-[0.25em] uppercase text-honey">
                {t.feeling}
              </p>
              <p className="mt-2 font-serif text-2xl text-cream">{t.title}</p>
              {t.duration && <p className="mt-1 text-xs text-cream/55">{t.duration}</p>}
            </button>
          ))}
        </div>
      </section>

      <SiteFooter />

      {/* Immersive player overlay */}
      {current && (
        <div
          className="fixed inset-0 z-50 bg-deep/95 backdrop-blur-xl flex items-center justify-center px-6 reveal"
          style={{ animationDuration: "0.6s" }}
        >
          <button
            onClick={closePlayer}
            className="absolute top-8 right-8 text-cream/60 hover:text-cream text-xs uppercase tracking-[0.25em]"
          >
            Close
          </button>
          <div className="absolute inset-0 glow-amber opacity-50 pointer-events-none" />
          <div className="relative text-center max-w-md">
            <FlowerOfLife className={`mx-auto h-72 w-72 text-honey/80 ${isPlaying ? "breathe" : ""}`} />
            <p className="mt-10 text-[0.65rem] tracking-[0.3em] uppercase text-honey">
              {current.feeling}
            </p>
            <h2 className="mt-3 font-serif text-4xl text-cream">{current.title}</h2>
            <p className="mt-2 text-sm text-cream/60">
              {hasAudio && audioDuration
                ? `${formatTime(currentTime)} / ${formatTime(audioDuration)}`
                : current.duration}
            </p>

            <div
              onClick={hasAudio ? handleSeek : undefined}
              className={`mt-12 h-1.5 w-full bg-cream/20 relative rounded-full ${hasAudio ? "cursor-pointer" : ""}`}
            >
              <span
                className="absolute left-0 top-0 h-full bg-honey rounded-full transition-[width] duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-8 flex items-center justify-center gap-8 text-cream">
              <button aria-label="Previous" className="opacity-60 hover:opacity-100 transition">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                  <path d="M6 6h2v12H6zm3.5 6l8.5-6v12z" />
                </svg>
              </button>
              <button
                onClick={togglePlay}
                disabled={!hasAudio}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="h-16 w-16 rounded-full bg-honey text-deep flex items-center justify-center shadow-[var(--shadow-glow)] transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isPlaying ? (
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
                    <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-7 w-7 ml-0.5" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
              <button aria-label="Next" className="opacity-60 hover:opacity-100 transition">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                  <path d="M16 6h2v12h-2zM6 18l8.5-6L6 6z" />
                </svg>
              </button>
            </div>
            <p className="mt-10 text-[0.65rem] tracking-[0.3em] uppercase text-cream/40">
              {hasAudio ? "Stay in stillness" : "Audio coming soon"}
            </p>
          </div>
        </div>
      )}

      <audio
        ref={audioRef}
        onTimeUpdate={(e) => {
          const a = e.currentTarget;
          setCurrentTime(a.currentTime);
          if (a.duration) setProgress((a.currentTime / a.duration) * 100);
          if (GATE_ENABLED && !gatePassed && !fadingRef.current && !showGate && a.currentTime >= PREVIEW_SECONDS) {
            startFadeOut();
          }
        }}
        onLoadedMetadata={(e) => setAudioDuration(e.currentTarget.duration)}
        onEnded={() => {
          setIsPlaying(false);
          setProgress(0);
          setCurrentTime(0);
        }}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        preload="metadata"
      />

      {/* Email gate modal */}
      {showGate && (
        <div
          className={`fixed inset-0 z-[60] flex items-center justify-center px-6 transition-opacity duration-700 ease-out ${
            gateVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-deep/80 backdrop-blur-2xl" />
          <div className="absolute inset-0 glow-amber opacity-30 pointer-events-none" />
          <div
            className={`relative w-full max-w-md rounded-3xl border border-honey/20 bg-deep/95 px-8 py-12 sm:px-10 sm:py-14 text-center shadow-[var(--shadow-glow)] transition-all duration-700 ease-out ${
              gateVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            <FlowerOfLife className="mx-auto h-14 w-14 text-honey/80 breathe-slow" />
            <p className="mt-8 label-caps !text-honey">— A Soft Pause —</p>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl text-cream leading-[1.15]">
              You&apos;re just getting started.
            </h2>
            <p className="mt-5 text-sm sm:text-base text-cream/70 leading-relaxed">
              Join free to keep listening — no card needed.
            </p>
            <form onSubmit={handleGateSubmit} className="mt-8 space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                autoFocus
                className="w-full rounded-full bg-cream/[0.06] border border-cream/15 px-5 py-3.5 text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:border-honey/60 focus:ring-2 focus:ring-honey/20 transition"
              />
              <button
                type="submit"
                className="w-full rounded-full bg-honey text-deep py-3.5 text-[0.7rem] uppercase tracking-[0.22em] hover:shadow-[var(--shadow-glow)] transition-all duration-500"
              >
                Continue listening &rarr;
              </button>
            </form>
            <p className="mt-5 text-[0.65rem] tracking-[0.2em] uppercase text-cream/40">
              No noise. Unsubscribe anytime.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
