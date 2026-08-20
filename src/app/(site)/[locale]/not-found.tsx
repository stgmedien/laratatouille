import { Button, SectionHeading } from '@/components/ds';
import { PageShell } from '@/components/site/PageShell';
import { Section } from '@/components/site/Section';
import { getDictionary } from '@/lib/i18n';
import { defaultLocale, pathFor } from '@/lib/i18n/config';

/**
 * A not-found inside a locale segment cannot read that segment's params, so it
 * speaks the house language and links back to the German start.
 */
export default function NotFound() {
  const dict = getDictionary(defaultLocale);
  return (
    <PageShell locale={defaultLocale} dict={dict} page="home">
      <Section style={{ minHeight: '50vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-32)' }}>
          <SectionHeading as="h1" title={dict.notFound.title} intro={dict.notFound.body} />
          <div><Button href={pathFor('home', defaultLocale)}>{dict.notFound.cta}</Button></div>
        </div>
      </Section>
    </PageShell>
  );
}
