import Anthropic from '@anthropic-ai/sdk';

/** Server-only Anthropic client. The model is configurable via env. */
export function createAnthropicClient(): Anthropic {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
}

export const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL ?? 'claude-sonnet-4-6';
