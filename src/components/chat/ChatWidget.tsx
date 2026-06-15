'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { Alert } from '@/components/ui/Alert';
import { cn } from '@/lib/utils';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const INITIAL_MESSAGE: ChatMessage = {
  role: 'assistant',
  content:
    'Olá! Sou a Sofia, assistente virtual da MediSmile. Como posso ajudar você hoje? 😊\n\nHi! I\'m Sofia, MediSmile\'s virtual assistant. How can I help you today?',
};

/**
 * Skeleton shimmer — replaces bouncing dots.
 * Rule: progressive-loading — shows content shape instead of a spinner.
 * Three lines simulate a short assistant reply being composed.
 */
function TypingIndicator() {
  return (
    <div
      className="flex flex-col gap-2 rounded-2xl bg-soft px-4 py-3 w-[180px]"
      aria-label="Sofia is typing…"
      role="status"
    >
      {[100, 75, 55].map((widthPct, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="block h-2.5 rounded-full bg-mist overflow-hidden"
          style={{ width: `${widthPct}%` }}
        >
          {/* shimmer sweep */}
          <span className="block h-full w-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent bg-[length:200%_100%]" />
        </span>
      ))}
    </div>
  );
}

/**
 * Sofia AI chat widget — floating bottom-right.
 * Spec: SPRINT_2_PROMPT.md Block 5
 */
export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const conversationId = useRef<string | undefined>(undefined);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;

    setInput('');
    setError(null);
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, conversationId: conversationId.current }),
      });

      if (!res.ok) throw new Error('Failed to get response');

      const data = (await res.json()) as { reply: string; conversationId: string };
      conversationId.current = data.conversationId;
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setError('Sorry, something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[200]">
      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 400, damping: 30 } }}
            exit={{ opacity: 0, y: 12, scale: 0.97, transition: { duration: 0.15, ease: [0.4, 0, 1, 1] } }}
            className="absolute bottom-[70px] right-0 flex w-[360px] flex-col overflow-hidden rounded-[20px] shadow-chat"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-primary px-5 py-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent font-display text-lg font-bold text-white shrink-0">
                S
              </div>
              <div className="flex-1">
                <p className="font-display text-[16px] font-bold text-white">Sofia</p>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white-border bg-white-subtle px-2.5 py-0.5 font-ui text-[11px] font-semibold text-white-faded">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                  Online · AI Assistant
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="text-white/60 transition-colors hover:text-white"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Messages */}
            <div
              role="log"
              aria-live="polite"
              aria-label="Chat messages"
              className="flex max-h-[400px] flex-col gap-3 overflow-y-auto bg-white p-4"
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    'max-w-[85%] rounded-2xl px-4 py-3 font-ui text-sm leading-relaxed whitespace-pre-wrap',
                    msg.role === 'assistant'
                      ? 'self-start rounded-tl-[4px] bg-soft text-body'
                      : 'self-end rounded-tr-[4px] bg-primary text-white',
                  )}
                >
                  {msg.content}
                </div>
              ))}

              {isLoading && (
                <div className="self-start">
                  <TypingIndicator />
                </div>
              )}

              {error && (
                <Alert variant="error" className="text-xs">
                  {error}
                </Alert>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-mist bg-white px-4 py-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message…"
                disabled={isLoading}
                className="flex-1 bg-transparent font-ui text-sm text-body placeholder:text-dim focus:outline-none disabled:opacity-50"
                aria-label="Chat message input"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-opacity disabled:opacity-40"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Chat with Sofia"
        aria-expanded={isOpen}
        className="relative flex h-[58px] w-[58px] items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all duration-base hover:-translate-y-1 hover:shadow-xl"
      >
        <MessageCircle className="h-6 w-6" aria-hidden="true" />

        {/* Notification ping */}
        {!isOpen && (
          <span className="absolute -right-0.5 -top-0.5" aria-hidden="true">
            <span className="absolute inline-flex h-[10px] w-[10px] animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-[10px] w-[10px] rounded-full bg-accent" />
          </span>
        )}
      </button>
    </div>
  );
}
