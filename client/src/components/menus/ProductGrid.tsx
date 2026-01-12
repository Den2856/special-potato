import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import ProductCard, { type MenuItem } from "../ui/ProductCard";

type Props = {
  endpoint?: string;
  endpoints?: string[];
  title?: string;
  bgClass?: string;
  cardBgClass?: string;
  className?: string;
  limit?: number;
};

const ProductsGrid: React.FC<Props> = ({
  endpoint,
  endpoints,
  title,
  bgClass = "bg-pink-50",
  cardBgClass = "bg-white",
  className = "",
  limit
}) => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const listToLoad = useMemo<string[]>(
    () => (endpoints && endpoints.length ? endpoints : endpoint ? [endpoint] : []),
    [endpoint, endpoints]
  );

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    if (!listToLoad.length) {
      setItems([]);
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const base = import.meta.env.VITE_API_URL ?? "";
        const calls = listToLoad.map((ep) => axios.get<MenuItem[]>(`${base}${ep}`));
        const responses = await Promise.all(calls);
        const merged = responses.flatMap((r) => r.data ?? []);

        const map = new Map<string, MenuItem>();
        for (const it of merged) {
          const key = (it as any).id || (it as any)._id || it.name;
          if (!map.has(key)) map.set(key, it);
        }
        let data = Array.from(map.values());
        if (typeof limit === "number") data = data.slice(0, limit);

        if (mounted) setItems(data);
      } catch (e: any) {
        if (mounted) setError(e?.message ?? "Failed to load");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [listToLoad.join("|"), limit]);

  return (
    <section className={`py-16 px-4 text-center ${bgClass} ${className}`}>
      {title ? <h2 className="mb-8 text-3xl font-extrabold text-dark">{title}</h2> : null}

      {error && <div className="text-fire-red mb-6">Error: {error}</div>}

      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-[512px] rounded-lg bg-white shadow animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <ProductCard key={idx} item={item} bgClass={cardBgClass} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductsGrid;
