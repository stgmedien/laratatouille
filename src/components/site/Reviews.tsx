import { Rule } from '@/components/ds';
import type { LocalisedReview } from '@/lib/db/types';

/**
 * Guest quotes stay in the language they were written in — attributing a
 * translation to a named person would put words in their mouth. Kept short:
 * an excerpt with the author and the platform it came from.
 */
export function ReviewGrid({ reviews, translatedLabel }: {
  reviews: LocalisedReview[]; translatedLabel: string;
}) {
  return (
    <div className="lr-grid-3" style={{ alignItems: 'start' }}>
      {reviews.map((review) => (
        <figure
          key={review.id}
          style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-16)' }}
        >
          <Rule variant="short" />
          <blockquote
            lang={review.lang}
            style={{
              margin: 0,
              font: 'var(--fw-regular) var(--fs-h3)/1.4 var(--font-display)',
              color: 'var(--text-heading)',
              textWrap: 'pretty',
            }}
          >
            {`“${review.quote}”`}
          </blockquote>
          <figcaption
            style={{
              display: 'flex', alignItems: 'center', gap: 'var(--space-8)',
              font: 'var(--type-caption)', letterSpacing: 'var(--ls-caps)',
              textTransform: 'uppercase', color: 'var(--text-faint)',
            }}
          >
            {review.author}
            {review.source && (
              <>
                <span aria-hidden="true" style={{ width: 16, height: 1, background: 'currentColor', opacity: 0.5 }} />
                {review.source}
              </>
            )}
            {review.translated && <>{' · '}{translatedLabel}</>}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
