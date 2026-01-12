import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Trash2, Plus, Minus } from "lucide-react";
import { useCart, type CartItem } from "../../context/CartContext";
import { Link } from "react-router-dom";

type Props = {
  open: boolean;
  onClose: () => void;
};

const POPOVER_WIDTH = 360;
const GAP = 12;

const CartPopover: React.FC<Props> = ({ open, onClose }) => {
  const { cartItems, increment, decrement, removeItem, clearCart, subtotal } = useCart();
  const popRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState<{ left: number; top: number }>({ left: 0, top: 0 });

  const updatePos = () => {
    const btn = document.getElementById("cart-fab");
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const vw = window.innerWidth;
    const width = Math.min(POPOVER_WIDTH, vw - 24);
    const left = Math.min(Math.max(12, r.right - width), vw - width - 12);
    const top = r.bottom + GAP;
    setPos({ left, top });
  };

  useLayoutEffect(() => {
    if (open) updatePos();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onResize = () => updatePos();
    const onScroll = () => updatePos();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll as any);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!popRef.current) return;
      if (!popRef.current.contains(e.target as Node) && !(e.target as Node).hasOwnProperty("closest")) {
        onClose();
        return;
      }
      const el = e.target as HTMLElement;
      if (popRef.current && !popRef.current.contains(el) && !el.closest("#cart-fab")) {
        onClose();
      }
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [open, onClose]);

  const empty = cartItems.length === 0;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            key="popover"
            ref={popRef}
            role="dialog"
            aria-label="Shopping cart"
            className="fixed z-[70] w-[min(360px,calc(100vw-24px))] rounded-2xl bg-white shadow-2xl border border-black/5 overflow-hidden"
            style={{ left: pos.left, top: pos.top }}
            initial={{ opacity: 0, scale: 0.95, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h3 className="text-base font-bold text-dark">Your Cart</h3>
              <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full" aria-label="Close cart">
                <X className="h-5 w-5 text-dark" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto px-3 py-3 space-y-3">
              <AnimatePresence initial={false}>
                {empty ? (
                  <div className="text-center text-dark py-8">Your cart is empty</div>
                ) : (
                  (cartItems as CartItem[]).map((it: CartItem) => (
                    <motion.div
                      key={it.key}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-center gap-3 rounded-xl border border-black/5 p-2"
                    >
                      <img src={it.imagePath} alt={it.name} className="h-14 w-14 rounded-lg object-cover bg-white" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold text-dark">{it.name}</p>
                        <p className="text-xs text-dark mt-0.5">${it.price.toFixed(2)}</p>

                        <div className="mt-2 inline-flex items-center rounded-full border border-black/10 overflow-hidden">
                          <button
                            onClick={() => (it.quantity <= 1 ? removeItem(it.key) : decrement(it.key))}
                            className="px-2 py-1 hover:bg-black/5"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-3 text-sm">{it.quantity}</span>
                          <button
                            onClick={() => increment(it.key)}
                            className="px-2 py-1 hover:bg-black/5"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => removeItem(it.key)}
                        className="p-2 rounded-full hover:bg-black/5"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-5 w-5 text-dark" />
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            <motion.div layout className="border-t px-4 py-3 space-y-3">
              <div className="flex items-center justify-between text-dark">
                <span className="font-semibold">Subtotal</span>
                <span className="font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={clearCart}
                  className="rounded-full border border-black/10 px-4 py-2 text-dark hover:bg-black/5 transition"
                >
                  Clear
                </button>
                <button
                  className="rounded-full bg-fire-red px-6 py-2 text-white font-semibold hover:bg-dark transition"
                >
                  <Link to="/cart">
                    Checkout
                  </Link>
                </button>
              </div>
            </motion.div>

            <div
              className="absolute -top-2 right-6 h-4 w-4 rotate-45 bg-white border-l border-t border-black/5"
              aria-hidden
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartPopover;
