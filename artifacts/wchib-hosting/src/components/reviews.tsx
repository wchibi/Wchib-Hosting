import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BadgeCheck } from 'lucide-react';
import {
  overallRating, reviewConfig, reviewSources, reviews, type Review,
} from '@/data/reviews';

function Stars({ rating }: { rating: number }) {
  const rounded = Math.round(rating);
  return (
    <div className="review-stars" role="img" aria-label={`Rated ${rounded} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} aria-hidden="true" className={star <= rounded ? 'is-on' : undefined}>★</span>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  // A source badge and a "verified" badge are both claims about where a review
  // came from, so neither is rendered unless the data actually asserts it.
  const source = review.source ? reviewSources[review.source] : null;
  return (
    <article className="review-card" data-review-card>
      <div className="review-card-top">
        <Stars rating={review.rating} />
        <div className="review-badges">
          {review.placeholder && <span className="review-chip review-chip-sample">Sample review</span>}
          {source && !review.placeholder && <span className="review-chip">{source.label}</span>}
          {review.verified && !review.placeholder && (
            <span className="review-chip review-chip-verified"><BadgeCheck size={11} aria-hidden="true" /> Verified</span>
          )}
        </div>
      </div>
      <blockquote className="review-quote"><p>{review.text}</p></blockquote>
      <footer className="review-meta">
        <div className="review-author">
          <strong>{review.name}</strong>
          {review.handle && <span>{review.handle}</span>}
        </div>
        {(review.planLabel || review.date) && (
          <div className="review-context">
            {review.planLabel && <span>{review.planLabel}</span>}
            {review.date && <span>{review.date}</span>}
          </div>
        )}
      </footer>
    </article>
  );
}

/**
 * Responsive review carousel: 3 cards on desktop, 2 on tablet, 1 on mobile.
 * Native horizontal scrolling supplies swipe support for free; the buttons just
 * scroll by one card width, so there is no carousel library to ship.
 */
export function ReviewSection() {
  const headingId = useId();
  const viewportRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const rating = overallRating();

  const sync = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const max = viewport.scrollWidth - viewport.clientWidth;
    setCanPrev(viewport.scrollLeft > 2);
    setCanNext(viewport.scrollLeft < max - 2);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    sync();
    viewport.addEventListener('scroll', sync, { passive: true });
    const observer = new ResizeObserver(sync);
    observer.observe(viewport);
    window.addEventListener('resize', sync);
    return () => {
      viewport.removeEventListener('scroll', sync);
      observer.disconnect();
      window.removeEventListener('resize', sync);
    };
  }, [sync]);

  const scrollByCard = (direction: 1 | -1) => {
    const viewport = viewportRef.current;
    const card = viewport?.querySelector<HTMLElement>('[data-review-card]');
    if (!viewport || !card) return;
    const gap = parseFloat(getComputedStyle(viewport).columnGap || '0') || 0;
    viewport.scrollBy({ left: (card.offsetWidth + gap) * direction, behavior: 'smooth' });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') { event.preventDefault(); scrollByCard(1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); scrollByCard(-1); }
  };

  return (
    <section className="section reviews-section" aria-labelledby={headingId}>
      <div className="container">
        <div className="reviews-header">
          <div className="section-heading">
            <span className="eyebrow">Player feedback</span>
            <h2 id={headingId}>{reviewConfig.heading}</h2>
            <p>{reviewConfig.subheading}</p>
          </div>
          {rating && (
            <div className="rating-summary">
              <Stars rating={Number(rating.value)} />
              <div className="rating-score"><strong>{rating.value}</strong><span>/5</span></div>
              <span className="rating-caption">{rating.caption}</span>
            </div>
          )}
        </div>

        {reviews.length === 0 ? (
          <p className="reviews-empty">Customer reviews are being collected. Check back soon — or reach out on Discord in the meantime.</p>
        ) : (
          <>
            <div
              className="reviews-viewport"
              ref={viewportRef}
              tabIndex={0}
              role="group"
              aria-label={`${reviewConfig.heading} — reviews`}
              onKeyDown={onKeyDown}
            >
              {reviews.map((review) => <ReviewCard key={review.id} review={review} />)}
            </div>
            <div className="reviews-controls">
              <span className="reviews-hint">Swipe or use the arrows</span>
              <div className="reviews-buttons">
                <button type="button" className="reviews-button" onClick={() => scrollByCard(-1)} disabled={!canPrev} aria-label="Previous reviews">
                  <ArrowLeft size={16} aria-hidden="true" />
                </button>
                <button type="button" className="reviews-button" onClick={() => scrollByCard(1)} disabled={!canNext} aria-label="Next reviews">
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
