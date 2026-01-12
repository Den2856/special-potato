import React, { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";

export type FilterItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  iconSrc?: string;
  iconAlt?: string;
  isNew?: boolean;
};

type Props = {
  items: FilterItem[];
  activeId?: string;
  onChange: (id: string) => void;
  className?: string;
};

const MenuFilters: React.FC<Props> = ({ items, activeId, onChange, className }) => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const activeIndex = useMemo(
    () => items.findIndex((i) => i.id === activeId),
    [items, activeId]
  );

  useEffect(() => {
    if (!activeId) return;
    const wrap = listRef.current;
    if (!wrap) return;
    const btn = wrap.querySelector<HTMLButtonElement>(`button[data-id="${activeId}"]`);
    if (!btn) return;
    const br = btn.getBoundingClientRect();
    const wr = wrap.getBoundingClientRect();
    if (br.left < wr.left || br.right > wr.right) {
      wrap.scrollBy({ left: br.left - wr.left - wr.width / 3, behavior: "smooth" });
    }
  }, [activeId]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();

    if (activeIndex === -1) {
      return;
    }

    const dir = e.key === "ArrowRight" ? 1 : -1;
    const next = (activeIndex + dir + items.length) % items.length;
    onChange(items[next].id);
  };

  const handleClick = (id: string) => {
    onChange(id);
  };

  return (
    <div className={["w-full", className || ""].join(" ")}>
      <div
        ref={listRef}
        className="flex gap-3 overflow-x-auto py-2 px-5 sm:px-2 scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent snap-x snap-mandatory"
        onKeyDown={handleKey}
        role="tablist"
        aria-label="Menu filters"
      >
        {items.map((it) => {
          const active = it.id === activeId;
          return (
            <motion.button
              data-id={it.id}
              key={it.id}
              role="tab"
              aria-selected={active}
              whileTap={{ scale: 0.97 }}
              className={[
                "snap-start inline-flex items-center gap-2 rounded-full px-5 py-2",
                "bg-white text-dark hover:bg-[#fafafa]",
                "transition shadow-sm whitespace-nowrap",
                active ? " text-dark bg-[#fafafa]" : "hover:ring-dark",
              ].join(" ")}
              onClick={() => handleClick(it.id)}
            >
              {it.iconSrc && (
                <img
                  src={it.iconSrc!}
                  alt={it.iconAlt ?? it.label}
                  className="h-5 w-5 rounded-full object-cover"
                  loading="lazy"
                />
              )}
              <span className="text-sm font-medium">{it.label}</span>

              {(active) && (
                <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-fire-red" />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default MenuFilters;
