import { NextResponse } from 'next/server';
import { requireSession } from '@/lib/admin-session';
import { getMenu } from '@/lib/db/menu';
import { getDictionary, isLocale } from '@/lib/i18n';
import { renderMenuPdf } from '@/lib/print/menu-pdf';

export const dynamic = 'force-dynamic';

/**
 * Liefert die Speisekarte als PDF, fertig zum Drucken. `?ansicht` zeigt sie im
 * Browser an statt sie herunterzuladen — so bekommt die Verwaltung eine
 * Vorschau, ohne dass das PDF zweimal gebaut werden müsste.
 */
export async function GET(request: Request, { params }: { params: Promise<{ file: string }> }) {
  await requireSession();

  const { file } = await params;
  const match = /^speisekarte-([a-z]{2})\.pdf$/.exec(file);
  const locale = match?.[1];
  if (!locale || !isLocale(locale)) {
    return new NextResponse('Nicht gefunden', { status: 404 });
  }

  const categories = await getMenu(locale);
  const { pdf } = await renderMenuPdf({ categories, dict: getDictionary(locale), locale });

  const inline = new URL(request.url).searchParams.has('ansicht');
  const filename = `Speisekarte La Ratatouille ${locale.toUpperCase()}.pdf`;

  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `${inline ? 'inline' : 'attachment'}; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  });
}
