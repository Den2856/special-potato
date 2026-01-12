import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ChevronLeft } from "lucide-react";
import Header from "../components/Header";
import { useCart } from "../context/CartContext";
import CartUpSell from "../components/cart/CartUpSell";
import { Link } from "react-router-dom";

const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

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


export default function CartPage() {
  const { cartItems = [], increment, decrement, removeItem } = useCart() as any;

  const items = cartItems.map((it: any, idx: number) => ({
    key: it.key ?? `${it.productId ?? idx}`,
    name: it.name ?? "Item",
    price: asNumber(it.price),
    quantity: asNumber(it.quantity || 1) || 1,
    description: it.description ?? it.subtitle,
    imagePath: imgFrom(it),
  }));

  const subtotal = items.reduce((s: number, it: any) => s + asNumber(it.price) * asNumber(it.quantity), 0);
  const deliveryFee = 2.99;
  const total = subtotal + deliveryFee;

  const inc = (it: any) => increment?.(it.key);
  const dec = (it: any) => {
    const next = (it.quantity ?? 0) - 1;
    if (next < 1) return removeItem?.(it.key);
    return decrement?.(it.key);
  };
  const removeByKey = (k: string) => removeItem?.(k);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-fire-red-98 overflow-hidden text-dark">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-fire-red/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-yellow-50/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-28 md:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 mb-8">
            <ChevronLeft className="h-4 w-4" />
            <Link
              to="/menu"
              className="hover:text-fire-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-red focus-visible:ring-offset-2 focus-visible:ring-offset-fire-red-98 rounded"
            >
              Back to menu
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-white border border-outline-default">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Your Cart</h1>
                  <p>{items.length} items</p>
                </div>
              </motion.div>

              <AnimatePresence mode="popLayout">
                {items.length === 0 ? (
                  <motion.div
                    key="empty-cart"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-2xl bg-white border border-outline-default p-12 text-center"
                  >
                    <ShoppingBag className="h-16 w-16 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                    <p className="mb-6">Add some items to get started!</p>
                    <Link
                      to="/menu"
                      className="inline-flex items-center justify-center rounded-full bg-fire-red px-6 py-3 text-white font-semibold hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-red focus-visible:ring-offset-2 focus-visible:ring-offset-fire-red-98 transition"
                    >
                      Browse Menu
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div key="cart-items" variants={containerVariants} initial="hidden" animate="show" className="space-y-4">
                    {items.map((item: any) => (
                      <motion.div
                        key={String(item.key)}
                        variants={itemVariants}
                        layout
                        exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
                        className="rounded-2xl bg-white border border-outline-default overflow-hidden"
                      >
                        <div className="p-4">
                          <div className="flex gap-4">
                            <motion.div whileHover={{ scale: 1.03 }} className="flex-shrink-0 relative">
                              {item.imagePath ? (
                                <img
                                  src={item.imagePath}
                                  alt={item.name}
                                  className="w-20 h-20 rounded-xl object-cover"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="w-20 h-20 rounded-xl bg-fire-red/10 flex items-center justify-center">
                                  <div className="w-12 h-12 rounded-full bg-fire-red/30" />
                                </div>
                              )}
                            </motion.div>

                            <div className="flex-grow">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="font-semibold">{item.name}</h3>
                                  {item.description && <p className="text-sm">{item.description}</p>}
                                </div>
                                <button
                                  onClick={() => removeByKey(item.key)}
                                  className="p-2 hover:text-fire-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-red focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded transition"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>

                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                  <button
                                    onClick={() => dec(item)}
                                    className="w-8 h-8 rounded-full border bg-fire-red border-fire-red text-white flex items-center justify-center hover:bg-fire-red/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-red focus-visible:ring-offset-2 focus-visible:ring-offset-white transition"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </button>

                                  <motion.span key={item.quantity} initial={{ scale: 1.15 }} animate={{ scale: 1 }} className="font-semibold min-w-8 text-center">
                                    {item.quantity}
                                  </motion.span>

                                  <button
                                    onClick={() => inc(item)}
                                    className="w-8 h-8 rounded-full border bg-fire-red border-fire-red text-white flex items-center justify-center hover:bg-fire-red/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-red focus-visible:ring-offset-2 focus-visible:ring-offset-white transition"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </button>
                                </div>

                                <motion.span className="font-bold" initial={{ scale: 0.9 }} animate={{ scale: 1 }} key={asNumber(item.price) * asNumber(item.quantity)}>
                                  ${(asNumber(item.price) * asNumber(item.quantity)).toFixed(2)}
                                </motion.span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="lg:col-span-1">
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="sticky top-28">
                <div className="rounded-2xl bg-white border border-outline-default p-6">
                  <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <motion.span key={subtotal} initial={{ scale: 1.05 }} animate={{ scale: 1 }}>
                        ${subtotal.toFixed(2)}
                      </motion.span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery fee</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-outline-default pt-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <motion.span key={total} initial={{ scale: 1.05 }} animate={{ scale: 1 }}>
                          ${total.toFixed(2)}
                        </motion.span>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full rounded-xl bg-fire-red py-4 text-white font-semibold hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-red focus-visible:ring-offset-2 focus-visible:ring-offset-fire-red-98 transition flex items-center justify-center gap-2"
                  >
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </div>

                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="rounded-2xl bg-white border border-outline-default p-6 mt-4">
                  <h3 className="font-semibold mb-3">Promo Code</h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="flex-grow rounded-xl border border-outline-default bg-white px-4 py-2 outline-none focus:border-fire-red"
                    />
                    <button className="rounded-xl border border-fire-red bg-fire-red text-white px-4 py-2 hover:bg-fire-red/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-red focus-visible:ring-offset-2 focus-visible:ring-offset-fire-red-98 transition">
                      Apply
                    </button>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="rounded-2xl bg-white border border-outline-default p-6 mt-4">
                  <h3 className="font-semibold mb-3">Delivery Estimate</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-fire-red rounded-full" />
                    <span>20-30 minutes</span>
                  </div>
                  <p className="text-sm mt-2">Hot and fresh, delivered to your door</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        <CartUpSell currency="$" categories={["sides","dessert","drinks"]} limit={12} />
      </main>
    </>
  );
}
