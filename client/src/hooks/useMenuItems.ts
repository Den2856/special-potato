import { useEffect, useRef, useState } from "react";
import type { Category, MenuItem } from "../types/menu";
import { fetchAll, fetchCategory } from "../api/menu";

type State = { items: MenuItem[]; loading: boolean; error: string | null };

const cache = new Map<Category, MenuItem[]>();

export function useMenuItems(category: Category) {
  const [state, setState] = useState<State>({ items: [], loading: true, error: null });
  const catRef = useRef(category);

  useEffect(() => {
    let cancelled = false;
    catRef.current = category;

    async function load() {
      setState((s) => ({ ...s, loading: true, error: null }));

      try {
        if (cache.has(category)) {
          if (!cancelled) setState({ items: cache.get(category)!, loading: false, error: null });
          return;
        }

        const items =
          category === "all" ? await fetchAll() : await fetchCategory(category as Exclude<Category, "all">);

        cache.set(category, items);
        if (!cancelled) setState({ items, loading: false, error: null });
      } catch (e: any) {
        if (!cancelled) setState({ items: [], loading: false, error: e?.message ?? "Failed to load" });
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [category]);

  const refetch = async () => {
    cache.delete(category);
    const items =
      category === "all" ? await fetchAll() : await fetchCategory(category as Exclude<Category, "all">);
    cache.set(category, items);
    setState({ items, loading: false, error: null });
  };

  return { ...state, refetch };
}
