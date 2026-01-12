// src/components/cart/CartUpSell.tsx
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, Minus, Sparkles } from "lucide-react";
import { useCart } from "../../context/CartContext";

type Category = "pizza" | "pasta" | "sides" | "dessert" | "drinks";
type DBItem = Record<string, any>;

const ENDPOINTS: Record<Category, string> = {
  pizza: "/api/pizzas",
  dessert: "/api/desserts",
  pasta: "/api/pasta",
  sides: "/api/sides",
  drinks: "/api/drinks",
};

const asNumber = (v: any) => {
  if (v == null) return 0;
  const n = typeof v === "string" ? Number(v.replace(",", ".")) : Number(v);
  return Number.isFinite(n) ? n : 0;
};

const imgFrom = (it: any) => {
  if (typeof it?.imagePath === "string" && it.imagePath) return it.imagePath;
  if (typeof it?.image === "string" && it.image) return it.image;
  const r = it?.image;
  if (r && typeof r === "object") return r.large || r.medium || r.small || "";
  return it?.img || it?.thumbnail || it?.imageUrl || "";
};

const normalize = (x: DBItem, i: number) => ({
  id: x.id ?? x._id ?? x.sku ?? x.slug ?? `it-${i}`,
  name: x.name ?? x.title ?? "Item",
  price: asNumber(x.price ?? x.unitPrice ?? x.amount ?? x.cost ?? x.priceCents / 100),
  imagePath: imgFrom(x),
  measure: x.measure ?? x.weight ?? x.size ?? "",
  spiceLevel: x.spiceLevel ?? ""
});

type Props = {
  categories?: Category[];
  limit?: number;
  title?: string;
  currency?: string;
  className?: string;
};

export default function CartUpSell({
  categories = ["sides", "dessert", "drinks"],
  limit = 12,
  title = "Complete your meal",
  currency = "₽",
  className = "",
}: Props) {
  const [items, setItems] = useState<Array<ReturnType<typeof normalize>>>([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { cartItems = [], addItem, addToCart, add, increment, decrement, updateQuantity, removeItem } = useCart() as any;
  const base = import.meta.env.VITE_API_URL;

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setLoading(true);
      try {
        const urls = categories.map((c) => ENDPOINTS[c]);
        const res = await Promise.all(urls.map((u) => fetch(`${base}${u}`).then((r) => r.json()).catch(() => [])));
        const flat: DBItem[] = res.flat().filter(Boolean);
        const shuffled = [...flat].sort(() => Math.random() - 0.5).slice(0, limit);
        const norm = shuffled.map(normalize);
        if (!cancelled) setItems(norm);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    run();
    return () => { cancelled = true; };
  }, [categories.join("|"), limit]);

  const byKey = (it: any) => String(it.key ?? it.id ?? it.productId ?? it.sku);
  const map = useMemo(() => {
    const m = new Map<string, any>();
    for (const it of cartItems) m.set(byKey(it), it);
    return m;
  }, [cartItems]);

  const inCart = (s: { id: string | number }) => map.get(String(s.id));

  const onAdd = (s: any) => {
    const exist = inCart(s);
    if (exist) return increment?.(byKey(exist));
    const addFn = addItem ?? addToCart ?? add;
    if (addFn)
      return addFn({
        key: String(s.id),
        productId: s.id,
        name: s.name,
        price: s.price,
        quantity: 1,
        imagePath: s.imagePath,
        spiceLevel: s.spiceLevel
      });
    const ex2 = inCart(s);
    if (ex2 && updateQuantity) return updateQuantity(byKey(ex2), (ex2.quantity ?? 0) + 1);
  };

  const onDec = (s: any) => {
    const exist = inCart(s);
    if (!exist) return;
    const next = (exist.quantity ?? 1) - 1;
    if (next < 1) return removeItem?.(byKey(exist));
    if (updateQuantity) return updateQuantity(byKey(exist), next);
    return decrement?.(byKey(exist));
  };

  const pages = Math.max(1, Math.ceil(items.length / 3));
  const nextSlide = () => setCurrentIndex((p) => (p + 1) % pages);
  const prevSlide = () => setCurrentIndex((p) => (p - 1 + pages) % pages);
  const visibleItems = items.slice(currentIndex * 3, currentIndex * 3 + 3);

  if (!loading && items.length === 0) return null;

  return (
    <section className={`mt-10 bg-fire-red-98 ${className} text-dark`}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-3 mb-8">
        <Sparkles className="h-5 w-5 text-fire-red" />
        <h3 className="text-2xl sm:text-3xl font-bold text-center">{title}</h3>
        <Sparkles className="h-5 w-5 text-fire-red" />
      </motion.div>

      <div className="relative max-w-5xl mx-auto">
        <button
          onClick={prevSlide}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full border bg-fire-red border-fire-red text-white hover:bg-fire-red/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-red focus-visible:ring-offset-2 focus-visible:ring-offset-fire-red-98 transition flex items-center justify-center shadow"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full border bg-fire-red border-fire-red text-white hover:bg-fire-red/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-red focus-visible:ring-offset-2 focus-visible:ring-offset-fire-red-98 transition flex items-center justify-center shadow"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2 sm:p-4"
            >
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08 }}
                    className="rounded-2xl bg-white border border-outline-default p-4 animate-pulse"
                  >
                    <div className="rounded-xl bg-fire-red-98 border border-outline-default h-40 mb-3" />
                    <div className="h-4 bg-dark/10 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-dark/10 rounded w-1/2 mb-3" />
                    <div className="h-11 rounded-xl bg-white border border-outline-default" />
                  </motion.div>
                ))
              ) : (
                visibleItems.map((s, index) => {
                  const exist = inCart(s);
                  const qty = exist?.quantity ?? 0;

                  return (
                    <motion.div
                      key={String(s.id)}
                      initial={{ opacity: 0, y: 14, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: index * 0.08, duration: 0.28 }}
                      whileHover={{ y: -4, transition: { duration: 0.18 } }}
                      className="group rounded-2xl bg-white border border-outline-default p-4 hover:border-fire-red/50 transition"
                    >
                      <div className="relative mb-3">
                        <div className="rounded-xl bg-fire-red-98 border border-outline-default h-40 flex items-center justify-center overflow-hidden">
                          {s.imagePath ? (
                            <motion.img
                              src={s.imagePath}
                              alt={s.name}
                              className="object-contain w-full h-full"
                              loading="lazy"
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.25 }}
                            />
                          ) : (
                            <div className="w-20 h-20 rounded-full bg-fire-red/20" />
                          )}
                        </div>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 }}
                          className="absolute -top-2 left-3 px-3 py-1 rounded-full bg-fire-red text-white text-sm font-bold shadow"
                        >
                          {currency}{s.price.toFixed(2)}
                        </motion.div>
                      </div>

                      <div className="space-y-1 mb-3">
                        <h4 className="font-semibold leading-tight line-clamp-2 group-hover:text-fire-red transition-colors">
                          {s.name}
                        </h4>
                        <p className="text-sm opacity-70">{s.measure}</p>
                      </div>

                      <motion.div layout className="mt-3">
                        {qty > 0 ? (
                          <motion.div
                            initial={{ scale: 0.98 }}
                            animate={{ scale: 1 }}
                            className="h-12 rounded-xl bg-white border border-fire-red flex items-center justify-between px-3"
                          >
                            <motion.button
                              whileHover={{ scale: 1.06 }}
                              whileTap={{ scale: 0.94 }}
                              onClick={() => onDec(s)}
                              className="h-8 w-8 rounded-lg border bg-fire-red border-fire-red text-white hover:bg-fire-red/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-red focus-visible:ring-offset-2 focus-visible:ring-offset-white transition"
                            >
                              <Minus className="h-3 w-3 mx-auto" />
                            </motion.button>

                            <motion.span key={qty} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="font-semibold text-lg">
                              {qty}
                            </motion.span>

                            <motion.button
                              whileHover={{ scale: 1.06 }}
                              whileTap={{ scale: 0.94 }}
                              onClick={() => onAdd(s)}
                              className="h-8 w-8 rounded-lg border bg-fire-red border-fire-red text-white hover:bg-fire-red/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-red focus-visible:ring-offset-2 focus-visible:ring-offset-white transition"
                            >
                              <Plus className="h-3 w-3 mx-auto" />
                            </motion.button>
                          </motion.div>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onAdd(s)}
                            className="h-12 w-full rounded-xl bg-fire-red text-white font-semibold hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-red focus-visible:ring-offset-2 focus-visible:ring-offset-white transition"
                          >
                            Add to cart
                          </motion.button>
                        )}
                      </motion.div>
                    </motion.div>
                  );
                })
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {!loading && items.length > 3 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: pages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${index === currentIndex ? "bg-fire-red w-8" : "bg-outline-default/40 w-2 hover:bg-outline-default"}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
