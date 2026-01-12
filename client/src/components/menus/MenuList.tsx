import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import MenuListItem, { type MenuEntity } from "../ui/MenuListItem";

type Props = {
  endpoint?: string;
  endpoints?: string[];
  className?: string;
  limit?: number;
};

const MenuList: React.FC<Props> = ({ endpoint, endpoints, className, limit }) => {
  const [items, setItems] = useState<MenuEntity[]>([]);
  const [loading, setLoading] = useState(true);

  const listToLoad = useMemo<string[]>(
    () => (endpoints && endpoints.length ? endpoints : endpoint ? [endpoint] : []),
    [endpoint, endpoints]
  );

  useEffect(() => {
    let mounted = true;
    setLoading(true);


    if (!listToLoad.length) {
      setItems([]);
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const base = import.meta.env.VITE_API_URL ?? "";
        const calls = listToLoad.map((ep) => axios.get<MenuEntity[]>(`${base}${ep}`));
        const res = await Promise.all(calls);
        const merged = res.flatMap((r) => r.data ?? []);

        const map = new Map<string, MenuEntity>();
        for (const it of merged) {
          const key = (it as any).id || (it as any)._id || it.name;
          if (!map.has(key)) map.set(key, it);
        }
        let data = Array.from(map.values());
        if (typeof limit === "number") data = data.slice(0, limit);
        if (mounted) setItems(data);
      } catch (e: any) {
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [listToLoad.join("|"), limit]);

  return (
    <section className={["mx-auto max-w-6xl px-4 md:px-6", className || ""].join(" ")}>
      {loading ? (
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-[210px] md:h-[220px] rounded-2xl bg-white shadow-sm ring-1 ring-black/5 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {items.map((it, idx) => (
            <MenuListItem key={(it as any).id || (it as any)._id || idx} item={it} />
          ))}
        </div>
      )}
    </section>
  );
};

export default MenuList;
