import React, { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

type AccordionItemProps = {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
};

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  defaultOpen,
  className = "",
}) => {
  const [open, setOpen] = useState(!!defaultOpen);
  const contentId = useId();

  return (
    <div className={`rounded-2xl bg-white border border-black/5 shadow-sm ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={contentId}
        className="w-full flex items-center justify-between gap-4 p-6 text-left"
      >
        <span className="text-dark text-[20px] font-semibold">{title}</span>
        <ChevronDown
          className={`h-5 w-5 text-dark/70 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      <div
        id={contentId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6 pt-0 text-dark text-[15px] leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
