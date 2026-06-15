import type { QualifiedLead } from '@/types';

const EVOLUTION_URL = process.env.EVOLUTION_API_URL;
const EVOLUTION_KEY = process.env.EVOLUTION_API_KEY;
const EVOLUTION_INSTANCE = process.env.EVOLUTION_INSTANCE ?? 'medismile';
const COMMERCIAL_NUMBER = process.env.WHATSAPP_COMMERCIAL_NUMBER ?? '16893103396';

interface SendResult {
  ok: boolean;
  status: number;
  data?: unknown;
}

/**
 * Send a plain-text WhatsApp message through the Evolution API.
 * SERVER-ONLY. `phone` may be any format — non-digits are stripped and a US
 * country code is assumed if missing.
 */
export async function sendWhatsAppMessage(phone: string, message: string): Promise<SendResult> {
  if (!EVOLUTION_URL || !EVOLUTION_KEY) {
    throw new Error('Evolution API is not configured (EVOLUTION_API_URL / EVOLUTION_API_KEY).');
  }

  const digits = phone.replace(/\D/g, '');
  const number = digits.startsWith('1') ? digits : `1${digits}`;

  const response = await fetch(`${EVOLUTION_URL}/message/sendText/${EVOLUTION_INSTANCE}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: EVOLUTION_KEY,
    },
    body: JSON.stringify({
      number: `${number}@s.whatsapp.net`,
      text: message,
    }),
  });

  const data: unknown = await response.json().catch(() => undefined);
  return { ok: response.ok, status: response.status, data };
}

/** Notify the commercial team about a freshly qualified lead. */
export async function notifyCommercialTeam(lead: QualifiedLead): Promise<SendResult> {
  const unitLabel = lead.unit === 'ocoee' ? 'Ocoee' : 'Winter Springs';
  const langLabel = lead.language === 'pt' ? '🇧🇷 Português' : lead.language === 'es' ? '🇪🇸 Español' : '🇺🇸 English';

  const message = [
    '🦷 *NOVO LEAD QUALIFICADO — MediSmile*',
    '',
    `👤 Nome: ${lead.name}`,
    `🦷 Serviço: ${lead.service}`,
    `📋 Plano: ${lead.insurance || 'Particular'}`,
    `📍 Unidade: ${unitLabel}`,
    `🗓 Preferência: ${lead.schedule_preference}`,
    `🌐 Idioma: ${langLabel}`,
    '',
    '👆 Acesse o painel para mais detalhes.',
  ].join('\n');

  return sendWhatsAppMessage(COMMERCIAL_NUMBER, message);
}
