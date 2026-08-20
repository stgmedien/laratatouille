import 'server-only';

export interface MailMessage {
  subject: string;
  text: string;
  html: string;
  /** Guest address, so a reply from the mailbox goes straight back to them. */
  replyTo?: string;
}

export class MailNotConfiguredError extends Error {
  constructor() {
    super('Kein Mailversand konfiguriert: RESEND_API_KEY oder SMTP_HOST fehlen.');
    this.name = 'MailNotConfiguredError';
  }
}

function recipients(): string[] {
  const raw = process.env.RESERVATION_TO ?? '';
  return raw.split(',').map((s) => s.trim()).filter(Boolean);
}

/**
 * Two ways out of the building:
 *   - Resend, when RESEND_API_KEY is set (simplest on Vercel), or
 *   - the restaurant's own mailbox over SMTP.
 * Whichever is configured wins; Resend first.
 */
export async function sendMail(message: MailMessage): Promise<void> {
  const to = recipients();
  if (to.length === 0) throw new MailNotConfiguredError();

  if (process.env.RESEND_API_KEY) {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.RESERVATION_FROM ?? 'onboarding@resend.dev';

    const { error } = await resend.emails.send({
      from: `La Ratatouille <${from}>`,
      to,
      subject: message.subject,
      text: message.text,
      html: message.html,
      replyTo: message.replyTo,
    });
    if (error) throw new Error(`Resend: ${error.message}`);
    return;
  }

  if (process.env.SMTP_HOST) {
    const nodemailer = (await import('nodemailer')).default;
    const port = Number(process.env.SMTP_PORT ?? 587);

    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD ?? '' }
        : undefined,
    });

    await transport.sendMail({
      from: `"La Ratatouille" <${process.env.RESERVATION_FROM ?? process.env.SMTP_USER}>`,
      to: to.join(', '),
      subject: message.subject,
      text: message.text,
      html: message.html,
      replyTo: message.replyTo,
    });
    return;
  }

  throw new MailNotConfiguredError();
}
