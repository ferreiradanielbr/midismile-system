'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: ReadonlyArray<FAQItem>;
}

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: FAQItem & { isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="rounded-lg border border-mist bg-pearl overflow-hidden">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className={cn(
          'flex w-full items-center justify-between gap-4 px-5 py-5 text-left',
          'font-ui font-semibold text-midnight transition-colors duration-fast',
          'hover:text-primary',
        )}
      >
        <span className="text-[16px] leading-snug">{question}</span>
        <ChevronDown
          className={cn(
            'h-5 w-5 shrink-0 text-dim transition-transform duration-base',
            isOpen && 'rotate-180',
          )}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1, transition: { duration: 0.25, ease: [0, 0, 0.2, 1] } }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.15, ease: [0.4, 0, 1, 1] } }}
          >
            <div className="border-t border-mist px-5 pb-5 pt-4">
              <p className="font-body text-base leading-relaxed text-dim">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </div>
  );
}
