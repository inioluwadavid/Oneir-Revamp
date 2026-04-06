import { Resend } from 'resend';
import { NextResponse } from 'next/server';

type DemoStep1 = {
  fullName?: string;
  companyName?: string;
  email?: string;
  phone?: string;
  jobTitle?: string;
};

type DemoStep2 = {
  industry?: string;
  employees?: string;
  currentSystem?: string;
  mainChallenge?: string;
  timeline?: string;
};

type DemoStep3 = {
  preferredContact?: string;
  bestTime?: string;
  hearAbout?: string;
};

type DemoStep4 = {
  message?: string;
  country?: string;
  requestType?: string;
  fileName?: string | null;
  /** HTTPS URL from Cloudinary (client upload with unsigned preset) */
  fileUrl?: string | null;
};

type DemoRequestBody = {
  locale?: string;
  step1Data?: DemoStep1;
  step2Data?: DemoStep2;
  step3Data?: DemoStep3;
  step4Data?: DemoStep4;
  antiBotData?: {
    humanConfirmed?: boolean;
    website?: string;
  };
};

function nonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim() !== '';
}

const REQUEST_TYPES = new Set(['productDemo', 'scheduleCall', 'newsletterOptIn']);
const CONTACT_TYPES = new Set(['email', 'phone']);

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isValidCloudinaryHttpsUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === 'https:' && u.hostname === 'res.cloudinary.com';
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  let body: DemoRequestBody;
  try {
    body = (await request.json()) as DemoRequestBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const s1 = body.step1Data;
  const s2 = body.step2Data;
  const s3 = body.step3Data;
  const s4 = body.step4Data;
  const antiBotData = body.antiBotData;

  if (!antiBotData || antiBotData.humanConfirmed !== true) {
    return NextResponse.json({ error: 'Bot check failed' }, { status: 400 });
  }

  if (
    typeof antiBotData.website === 'string' &&
    antiBotData.website.trim() !== ''
  ) {
    return NextResponse.json({ error: 'Bot check failed' }, { status: 400 });
  }

  if (
    !s1 ||
    !nonEmptyString(s1.fullName) ||
    !nonEmptyString(s1.companyName) ||
    !nonEmptyString(s1.email) ||
    !nonEmptyString(s1.jobTitle)
  ) {
    return NextResponse.json({ error: 'Missing step 1 fields' }, { status: 400 });
  }

  if (!isValidEmail(s1.email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  if (
    !s2 ||
    !nonEmptyString(s2.industry) ||
    !nonEmptyString(s2.employees) ||
    !nonEmptyString(s2.currentSystem) ||
    !nonEmptyString(s2.mainChallenge) ||
    !nonEmptyString(s2.timeline)
  ) {
    return NextResponse.json({ error: 'Missing step 2 fields' }, { status: 400 });
  }

  if (
    !s3 ||
    !nonEmptyString(s3.preferredContact) ||
    !CONTACT_TYPES.has(s3.preferredContact) ||
    !nonEmptyString(s3.bestTime) ||
    !nonEmptyString(s3.hearAbout)
  ) {
    return NextResponse.json({ error: 'Missing step 3 fields' }, { status: 400 });
  }

  if (
    !s4 ||
    !nonEmptyString(s4.message) ||
    !nonEmptyString(s4.country) ||
    !nonEmptyString(s4.requestType) ||
    !REQUEST_TYPES.has(s4.requestType)
  ) {
    return NextResponse.json({ error: 'Missing step 4 fields' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const to = process.env.DEMO_REQUEST_TO;

  if (!apiKey || !from || !to) {
    console.error('demo-request: missing RESEND_API_KEY, RESEND_FROM, or DEMO_REQUEST_TO');
    return NextResponse.json({ error: 'Email is not configured' }, { status: 500 });
  }

  const phone = typeof s1.phone === 'string' ? s1.phone.trim() : '';

  const fileNameRaw =
    s4.fileName && nonEmptyString(s4.fileName) ? s4.fileName.trim() : '';
  let fileUrlRaw = '';
  if (s4.fileUrl != null && nonEmptyString(s4.fileUrl)) {
    if (!isValidCloudinaryHttpsUrl(s4.fileUrl.trim())) {
      return NextResponse.json({ error: 'Invalid file URL' }, { status: 400 });
    }
    fileUrlRaw = s4.fileUrl.trim();
  }

  const locale = typeof body.locale === 'string' ? body.locale : '';

  const rows: [string, string][] = [
    ['Locale', locale || '—'],
    ['Full name', s1.fullName.trim()],
    ['Company', s1.companyName.trim()],
    ['Email', s1.email.trim()],
    ['Phone', phone || '—'],
    ['Job title', s1.jobTitle.trim()],
    ['Industry', s2.industry],
    ['Employees', s2.employees],
    ['Current system', s2.currentSystem],
    ['Main challenge', s2.mainChallenge],
    ['Timeline', s2.timeline],
    ['Preferred contact', s3.preferredContact],
    ['Best time', s3.bestTime],
    ['Heard about us', s3.hearAbout],
    ['Message', s4.message.trim()],
    ['Country / region', s4.country],
    ['Request type', s4.requestType],
    ['Attachment file name', fileNameRaw || '(none)'],
  ];

  const htmlRows = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px;border:1px solid #e0e3eb;font-weight:600;vertical-align:top">${escapeHtml(k)}</td><td style="padding:8px;border:1px solid #e0e3eb">${escapeHtml(v)}</td></tr>`,
    )
    .join('');

  const fileLinkRow = fileUrlRaw
    ? `<tr><td style="padding:8px;border:1px solid #e0e3eb;font-weight:600;vertical-align:top">Attachment (Cloudinary)</td><td style="padding:8px;border:1px solid #e0e3eb"><a href="${escapeHtml(fileUrlRaw)}">${escapeHtml(fileUrlRaw)}</a></td></tr>`
    : '';

  const html = `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;font-size:14px;color:#2d2d2d">
<p>New demo request from the website.</p>
<table style="border-collapse:collapse;width:100%;max-width:640px">${htmlRows}${fileLinkRow}</table>
</body></html>`;

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: s1.email.trim(),
    subject: `New demo request — ${s1.fullName.trim()} (${s1.companyName.trim()})`,
    html,
  });

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id: data?.id });
}
