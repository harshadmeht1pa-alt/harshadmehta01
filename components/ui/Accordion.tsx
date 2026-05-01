"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionItemProps extends AccordionItem {
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function AccordionItemComponent({ question, answer, isOpen, onToggle, index }: AccordionItemProps) {
  return (
    <motion.div
      className="border-b border-brand-border/60 last:border-0"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span className={`text-sm sm:text-base font-medium transition-colors duration-200 ${isOpen ? "text-white" : "text-brand-muted group-hover:text-white"}`}>
          {question}
        </span>
        <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${isOpen ? "bg-brand-blue text-white" : "bg-brand-bgLight text-brand-dim group-hover:bg-brand-bgLight group-hover:text-brand-muted"}`}>
          {isOpen ? <Minus className="w-3 h-3" strokeWidth={2.5} /> : <Plus className="w-3 h-3" strokeWidth={2.5} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-brand-muted text-sm leading-relaxed pb-5">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export default function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        if (!allowMultiple) next.clear();
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className="divide-y-0">
      {items.map((item, i) => (
        <AccordionItemComponent
          key={i}
          {...item}
          index={i}
          isOpen={openIndices.has(i)}
          onToggle={() => toggle(i)}
        />
      ))}
    </div>
  );
}
