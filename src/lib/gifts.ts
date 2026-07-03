// Maps a homepage "feeling" tile to its matched Sound Sanctuary track —
// the audio gift sent when someone submits the /begin form.
export interface Gift {
  slug: string;
  label: string;
  trackTitle: string;
  trackSlug: string;
}

export const GIFTS: Record<string, Gift> = {
  anxious: {
    slug: "anxious",
    label: "Anxious",
    trackTitle: "Patience & Intention",
    trackSlug: "patience-and-intention",
  },
  overwhelmed: {
    slug: "overwhelmed",
    label: "Overwhelmed",
    trackTitle: "Sacred Stillness",
    trackSlug: "sacred-stillness",
  },
  disconnected: {
    slug: "disconnected",
    label: "Disconnected",
    trackTitle: "The Woodland Mirror: A Journey of Radical Acceptance",
    trackSlug: "woodland-mirror-radical-acceptance",
  },
  "burnt-out": {
    slug: "burnt-out",
    label: "Burnt out",
    trackTitle: "Rejuvenating Your Inner Energy",
    trackSlug: "rejuvenating-inner-energy",
  },
  "seeking-confidence": {
    slug: "seeking-confidence",
    label: "Seeking confidence",
    trackTitle: "The Reset: Subconscious Blueprinting",
    trackSlug: "the-reset-subconscious-blueprinting",
  },
};

// Fallback gift for visitors who reach /begin without a feeling tile
// (e.g. via the header "Begin" link).
export const DEFAULT_GIFT: Gift = {
  slug: "general",
  label: "Just here",
  trackTitle: "Soft Landing",
  trackSlug: "soft-landing",
};

export function getGift(slug: string | null): Gift {
  if (slug && GIFTS[slug]) return GIFTS[slug];
  return DEFAULT_GIFT;
}
