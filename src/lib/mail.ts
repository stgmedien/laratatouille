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
    super('Kein Mailversand konfiguriert: es fehlen RESEND_API_KEY beziehungsweise '
      + 'SMTP_HOST, eine Absenderadresse (RESERVATION_FROM) oder ein Empfänger (RESERVATION_TO).');
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

  // Eine gesetzte, aber leere Variable würde einen Absender wie
  // "La Ratatouille <>" erzeugen — den nimmt kein Server an. Deshalb || statt
  // ?? und ein klarer Abbruch, wenn nichts Brauchbares übrig bleibt.
  const sender = process.env.RESERVATION_FROM || process.env.SMTP_USER || '';

  if (process.env.RESEND_API_KEY) {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = sender || 'onboarding@resend.dev';

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
    if (!sender) throw new MailNotConfiguredError();
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
      from: `"La Ratatouille" <${sender}>`,
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
