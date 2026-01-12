import axios from "axios";
import type { ApiItem, Category, MenuItem } from "../types/menu";

const API = import.meta.env.VITE_API_URL ?? "";

export const ENDPOINTS: Record<Exclude<Category, "all">, string> = {
  pizza:   "/api/pizzas",
  pasta:   "/api/pasta",
  sides:   "/api/sides",
  dessert: "/api/desserts",
  drinks:  "/api/drinks",
};

const normalize = (raw: ApiItem, category: MenuItem["category"]): MenuItem => ({
  ...raw,
  id: (raw.id || raw._id || crypto.randomUUID()) as string,
  category,
});

export async function fetchCategory(
  category: Exclude<Category, "all">
): Promise<MenuItem[]> {
  const url = `${API}${ENDPOINTS[category]}`;
  const { data } = await axios.get<ApiItem[]>(url);
  return (data ?? []).map((i) => normalize(i, category));
}

export async function fetchAll(): Promise<MenuItem[]> {
  const cats = Object.keys(ENDPOINTS) as Exclude<Category, "all">[];
  const chunks = await Promise.all(cats.map((c) => fetchCategory(c)));
  return chunks.flat();
}
