'use server';

import { headers } from 'next/headers';
import { HOUSE } from '@/lib/house';
import { getDictionary } from '@/lib/i18n';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { sendMail } from '@/lib/mail';
import { rateLimit } from '@/lib/rate-limit';

export interface ReservationState {
  status: 'idle' | 'success' | 'error';
  message?: string;
  fieldErrors?: Partial<Record<'name' | 'email' | 'date' | 'time' | 'privacy', string>>;
  /** Echoed back so the form can repopulate after a failed submit. */
  values?: Record<string, string>;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;



function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

export async function submitReservation(
  _prev: ReservationState,
  formData: FormData,
): Promise<ReservationState> {
  const rawLocale = String(formData.get('locale') ?? 'de');
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'de';
  const dict = getDictionary(locale);
  const errors = dict.reserve.errors;

  // Honeypot: a real guest never fills this in.
  if (String(formData.get('website') ?? '').trim() !== '') {
    return { status: 'success' };
  }

  const values = {
    name: String(formData.get('name') ?? '').trim(),
    email: String(formData.get('email') ?? '').trim(),
    phone: String(formData.get('phone') ?? '').trim(),
    date: String(formData.get('date') ?? '').trim(),
    time: String(formData.get('time') ?? '').trim(),
    guests: String(formData.get('guests') ?? '').trim(),
    notes: String(formData.get('notes') ?? '').trim(),
  };
  const privacyAccepted = formData.get('privacy') === 'on';

  const fieldErrors: ReservationState['fieldErrors'] = {};
  if (values.name.length < 2) fieldErrors.name = errors.name;
  if (!EMAIL.test(values.email)) fieldErrors.email = errors.email;
  if (!privacyAccepted) fieldErrors.privacy = errors.privacy;

  if (!values.date) {
    fieldErrors.date = errors.date;
  } else {
    const chosen = new Date(`${values.date}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (Number.isNaN(chosen.getTime())) {
      fieldErrors.date = errors.date;
    } else if (chosen < today) {
      fieldErrors.date = errors.dateInPast;
    } else if ((HOUSE.closedWeekdays as readonly number[]).includes(chosen.getDay())) {
      fieldErrors.date = errors.closed;
    } else if (
      (HOUSE.lunchTimes as readonly string[]).includes(values.time)
      && !(HOUSE.lunchWeekdays as readonly number[]).includes(chosen.getDay())
    ) {
      // Lunch is served on Friday and Saturday only.
      fieldErrors.time = errors.lunchClosed;
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { status: 'error', fieldErrors, values };
  }

  const headerList = await headers();
  const ip = headerList.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  if (!rateLimit(`reservation:${ip}`)) {
    return { status: 'error', message: errors.rateLimit, values };
  }

  const dateLabel = new Intl.DateTimeFormat(locale, { dateStyle: 'full' }).format(new Date(`${values.date}T12:00:00`));

  const lines: [string, string][] = [
    ['Name', values.name],
    ['E-Mail', values.email],
    ['Telefon', values.phone || '—'],
    ['Datum', `${dateLabel} (${values.date})`],
    ['Uhrzeit', values.time],
    ['Personen', values.guests],
    ['Anmerkungen', values.notes || '—'],
    ['Sprache der Anfrage', locale.toUpperCase()],
  ];

  const text = [
    `Neue Reservierungsanfrage über ${HOUSE.name}`,
    '',
    ...lines.map(([k, v]) => `${k}: ${v}`),
    '',
    `Antworten Sie einfach auf diese E-Mail — sie geht an ${values.email}.`,
  ].join('\n');

  const html = `
    <div style="font-family:Georgia,'Times New Roman',serif;color:#2F2A28;max-width:560px">
      <p style="font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#52663F;margin:0 0 4px">
        ${HOUSE.name}
      </p>
      <h1 style="font-size:22px;font-weight:400;color:#17251C;margin:0 0 20px">Neue Reservierungsanfrage</h1>
      <table style="border-collapse:collapse;width:100%;font-family:Helvetica,Arial,sans-serif;font-size:14px">
        ${lines.map(([k, v]) => `
          <tr>
            <td style="padding:8px 16px 8px 0;color:#6B645E;white-space:nowrap;vertical-align:top;border-bottom:1px solid #E1D8C9">${escapeHtml(k)}</td>
            <td style="padding:8px 0;color:#2F2A28;border-bottom:1px solid #E1D8C9">${escapeHtml(v).replace(/\n/g, '<br>')}</td>
          </tr>`).join('')}
      </table>
      <p style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#6B645E;margin-top:24px">
        Antworten Sie einfach auf diese E-Mail — sie geht an
        <a href="mailto:${escapeHtml(values.email)}" style="color:#2A4534">${escapeHtml(values.email)}</a>.
      </p>
    </div>`;

  try {
    await sendMail({
      subject: `Reservierung: ${values.name}, ${values.guests} · ${values.date} ${values.time}`,
      text,
      html,
      replyTo: values.email,
    });
  } catch (error) {
    console.error('[reservation] Mailversand fehlgeschlagen:', error);
    return { status: 'error', message: errors.generic, values };
  }

  return { status: 'success' };
}
