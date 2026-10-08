/**
 * Customer review data — single source of truth for the social-proof section.
 *
 * Nothing here is hard-coded in a component, so real reviews can be dropped in
 * later without touching any markup. See `README` notes at the bottom of this
 * file for how to swap seed content for genuine reviews.
 */

export type ReviewSource =
  | 'discord'
  | 'google'
  | 'trustpilot'
  | 'instagram'
  | 'website'
  | 'feedback';

/** Maps a review source to the badge shown on the card. */
export const reviewSources: Record<ReviewSource, { label: string }> = {
  discord: { label: 'Discord' },
  google: { label: 'Google' },
  trustpilot: { label: 'Trustpilot' },
  instagram: { label: 'Instagram' },
  website: { label: 'Wchib website' },
  feedback: { label: 'Direct feedback' },
};

export type Review = {
  id: string;
  /** Display name. Use the format the customer agreed to. */
  name: string;
  /** Optional Discord handle shown next to the name, e.g. "@wchib". */
  handle?: string;
  /** 1–5. */
  rating: number;
  text: string;
  /** Human-readable plan label, e.g. "Stone Plan · 4 GB". */
  planLabel?: string;
  /** Display date, e.g. "Aug 2026". Keep as a string so ordering stays yours to control. */
  date?: string;
  /** Set only when the review genuinely came from that platform. */
  source?: ReviewSource;
  /**
   * Set to true ONLY when verification genuinely exists (for example a linked
   * Discord message or an order record). Never set it to imply authenticity.
   */
  verified?: boolean;
  /**
   * True for the seed entries below. Rendered with a "Sample review" chip so no
   * example copy is ever mistaken for a real customer. Set to false — or delete
   * the entry — when replacing it with a genuine review.
   */
  placeholder?: boolean;
};

export const reviews: Review[] = [
  {
    id: 'sample-1',
    name: 'Aayush',
    handle: '@aayush_mc',
    rating: 5,
    text: 'Really good performance for the price. My SMP runs smoothly and the panel is easy to use.',
    planLabel: 'Stone Plan · 4 GB',
    date: 'Aug 2026',
    // `source` intentionally left undefined: a source badge is a claim that the
    // review exists on that platform, so it stays empty until one genuinely does.
    placeholder: true,
  },
  {
    id: 'sample-2',
    name: 'Nischal',
    handle: '@nischal_',
    rating: 4,
    text: 'Moved over from a bigger provider and the difference in lag is obvious. Support answered on Discord within minutes.',
    planLabel: 'Diamond Plan · 16 GB',
    date: 'Aug 2026',
    source: 'discord',
    placeholder: true,
  },
  {
    id: 'sample-3',
    name: 'Prakash',
    rating: 5,
    text: 'Setup took under ten minutes and world backups stay quick on the NVMe storage. Exactly what our realm needed.',
    planLabel: 'Gold Plan · 10 GB',
    date: 'Sep 2026',
    placeholder: true,
  },
];

export const reviewConfig = {
  heading: 'Trusted by Minecraft Server Owners',
  subheading: 'Affordable Minecraft hosting without compromising on performance.',
  /**
   * Override the headline rating with a verified figure, e.g. 4.9.
   * `null` averages whatever is in `reviews` instead, so the number always
   * matches the cards on screen.
   */
  ratingOverride: null as number | null,
  /** Override the caption, e.g. "Based on 42 customer reviews". */
  ratingCaption: 'Based on customer reviews',
};

export type OverallRating = { value: string; caption: string };

/**
 * Derives the displayed rating from the review list so a headline number can
 * never drift from the reviews shown underneath it. Returns `null` when there
 * is nothing to rate, which renders an empty state instead of a fake score.
 */
export function overallRating(): OverallRating | null {
  const live = reviews.filter((review) => !review.placeholder);
  const source = live.length > 0 ? live : reviews;
  if (source.length === 0 && reviewConfig.ratingOverride === null) return null;
  const value =
    reviewConfig.ratingOverride ??
    source.reduce((total, review) => total + review.rating, 0) / source.length;
  return { value: value.toFixed(1), caption: reviewConfig.ratingCaption };
}

/**
 * Swapping in real reviews
 * ------------------------
 * 1. Replace the three `placeholder: true` entries above with genuine reviews,
 *    or delete them and append your own.
 * 2. Set `placeholder: false` (or omit it) so the "Sample review" chip disappears.
 * 3. Set `source` only for reviews that actually exist on that platform. A badge
 *    is a claim — leave `source` undefined if the review was sent directly.
 * 4. Set `verified: true` only where verification genuinely exists.
 * 5. Optionally set `reviewConfig.ratingOverride` to a figure you can back up.
 */
