import { Icon } from '@/components/ds';

/**
 * A single line above the header — a closure, a change of hours. It scrolls
 * away with the page rather than sticking, and carries no dismiss button:
 * a notice the house wants read should not be one click from gone.
 */
export function AnnouncementBanner({ text }: { text: string }) {
  return (
    <aside
      className="lr-banner lr-no-print"
      style={{ background: 'var(--surface-accent)', color: 'var(--text-on-inverse)' }}
    >
      <div className="lr-container lr-banner__inner">
        <Icon name="info" size={16} color="var(--sage-300)" style={{ marginTop: 2 }} />
        <p style={{ margin: 0, font: 'var(--type-body-sm)', fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body-sm)', lineHeight: 'var(--lh-body)' }}>
          {text}
        </p>
      </div>
    </aside>
  );
}
