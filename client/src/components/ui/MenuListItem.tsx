import React, { useState } from "react";
import { useCart, type CartItem } from "../../context/CartContext";
import PizzaSizeModal, { type PizzaSize, type PizzaModalData } from "../ui/PizzaModal";

export type RspImage = { small?: string; medium?: string; large?: string };

type NutritionalInfo = {
  calories?: number | string;
  fat?: number | string;
  carbohydrates?: number | string;
  protein?: number | string;
};

export type MenuEntity = {
  id?: string;
  _id?: string;
  name: string;
  description?: string;
  ingredients?: string;
  allergens?: string;
  price: number;
  image: RspImage | string;
  category?: string;
  /** 🔹 делаем опциональным, чтобы TS не ругался */
  nutritionalInfo?: NutritionalInfo;
};

type Props = { item: MenuEntity; className?: string };

const MenuListItem: React.FC<Props> = ({ item, className = "" }) => {
  const { cartItems, increment, decrement, removeItem, addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const productId = (item.id || item._id || item.name) as string;
  const imagePath =
    typeof item.image === "string"
      ? item.image
      : item.image.large || item.image.medium || item.image.small || "";

  // --- определить категорию и нужны ли размеры
  const rawCat = String((item as any).category ?? (item as any).type ?? "").toLowerCase();
  let productType: "pizza" | "drinks" | null = null;
  if (rawCat.includes("pizza")) productType = "pizza";
  else if (rawCat.startsWith("drink")) productType = "drinks";
  else {
    const p = imagePath.toLowerCase();
    if (p.includes("pizza")) productType = "pizza";
    if (p.includes("drink")) productType = "drinks";
  }
  const isSized = productType !== null;

  // Вытаскиваем записи из корзины
  const entries = cartItems.filter((c: CartItem) =>
    isSized ? c.productId.startsWith(productId + "|") : c.productId === productId
  );
  const totalQty = entries.reduce((sum: number, entry: CartItem) => sum + entry.quantity, 0);

  // sizes для модалки (по умолчанию множители 0.8 / 1 / 1.2)
  const sizes: PizzaSize[] = isSized
    ? productType === "drinks"
      ? [
          { size: "Small (0.3 L)", price: Math.round(item.price * 0.8 * 100) / 100 },
          { size: "Medium (0.5 L)", price: item.price },
          { size: "Large (0.7 L)", price: Math.round(item.price * 1.2 * 100) / 100 },
        ]
      : [
          { size: "Small", price: Math.round(item.price * 0.8 * 100) / 100 },
          { size: "Medium", price: item.price },
          { size: "Large", price: Math.round(item.price * 1.2 * 100) / 100 },
        ]
    : [];

  const modalData: PizzaModalData = {
    productId,
    name: item.name,
    basePrice: item.price,
    imagePath,
    sizes,
  };

  const quickAddSimple = () => {
    // для категорий без размеров — сразу кладём в корзину
    addToCart({
      productId,
      name: item.name,
      price: item.price,
      imagePath,
      quantity: 1,
      type: rawCat || "product",
    });
    window.dispatchEvent(new CustomEvent("cart:open"));
  };

  const handleMinus = () => {
    if (entries.length > 0) {
      const lastEntry = entries[entries.length - 1];
      if (lastEntry.quantity <= 1) removeItem(lastEntry.key);
      else decrement(lastEntry.key);
    }
  };

  const handlePlus = () => {
    if (entries.length > 0) {
      const lastEntry = entries[entries.length - 1];
      increment(lastEntry.key);
    } else {
      // если нужна модалка — открываем, иначе сразу кладём
      isSized ? setIsModalOpen(true) : quickAddSimple();
    }
  };

  const handleOrderNow = () => {
    isSized ? setIsModalOpen(true) : quickAddSimple();
  };

  const nutri = item.nutritionalInfo; // 🔸 теперь тип знает про поле

  return (
    <>
      <article
        className={[
          "w-full rounded-2xl bg-white shadow-sm ring-1 ring-black/5",
          "px-4 sm:px-6 py-4 sm:py-6",
          className,
        ].join(" ")}
      >
        <div className="grid gap-4 md:grid-cols-[260px_1fr_auto] md:items-start">
          <div className="mx-auto md:mx-0">
            <img
              src={imagePath}
              alt={item.name}
              className="w-[280px] h-[280px] object-cover rounded-lg"
            />
          </div>

          <div className="space-y-3 text-left">
            <h3 className="text-2xl font-extrabold text-dark">{item.name}</h3>

            {item.ingredients && (
              <div className="text-sm">
                <span className="font-semibold text-dark">Ingredients:</span>{" "}
                <span className="text-dark">{item.ingredients}</span>
              </div>
            )}

            {/* 🔹 блок питания — только если есть данные */}
            {nutri && (
              <div className="text-sm">
                <div className="font-semibold text-dark">Nutritional Info:</div>
                <ul className="mt-1 list-disc pl-5 space-y-0.5 text-dark">
                  {nutri.calories !== undefined && <li>Calories: {nutri.calories}</li>}
                  {nutri.fat !== undefined && <li>Fat: {nutri.fat}</li>}
                  {nutri.carbohydrates !== undefined && (
                    <li>Carbohydrates: {nutri.carbohydrates}</li>
                  )}
                  {nutri.protein !== undefined && <li>Protein: {nutri.protein}</li>}
                </ul>
              </div>
            )}

            {item.allergens && (
              <div className="text-sm">
                <span className="font-semibold text-dark">Allergens:</span>{" "}
                <span className="text-dark">{item.allergens}</span>
              </div>
            )}

            {/* controls (mobile) */}
            <div className="mt-2 md:hidden flex items-center justify-between">
              {totalQty === 0 ? (
                <button
                  onClick={handleOrderNow}
                  className="rounded-full bg-fire-red px-5 py-2 text-white font-semibold hover:bg-dark transition-colors duration-200"
                >
                  Order Now
                </button>
              ) : (
                <div className="inline-flex items-center rounded-full border border-black/10 overflow-hidden">
                  <button
                    onClick={handleMinus}
                    className="px-3 py-2 hover:bg-black/5 transition-colors duration-200"
                  >
                    –
                  </button>
                  <span className="px-4 text-sm font-medium">{totalQty}</span>
                  <button
                    onClick={handlePlus}
                    className="px-3 py-2 hover:bg-black/5 transition-colors duration-200"
                  >
                    +
                  </button>
                </div>
              )}

              <span className="text-sm font-semibold text-foreground-p">
                from <span className="text-[22px] text-dark">${item.price.toFixed(2)}</span>
              </span>
            </div>
          </div>

          {/* right column (desktop) */}
          <div className="hidden md:flex md:h-full md:flex-col md:items-end md:justify-between">
            <span className="text-sm font-semibold text-foreground-p">
              from <span className="text-[22px] text-dark">${item.price.toFixed(2)}</span>
            </span>

            {totalQty === 0 ? (
              <button
                onClick={handleOrderNow}
                className="rounded-full bg-fire-red px-6 py-2 text-white font-semibold hover:bg-dark transition-colors duration-200"
              >
                Order Now
              </button>
            ) : (
              <div className="inline-flex items-center rounded-full border border-black/10 overflow-hidden">
                <button
                  onClick={handleMinus}
                  className="px-3 py-2 hover:bg-black/5 transition-colors duration-200"
                >
                  –
                </button>
                <span className="px-4 text-sm font-medium">{totalQty}</span>
                <button
                  onClick={handlePlus}
                  className="px-3 py-2 hover:bg-black/5 transition-colors duration-200"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </article>

      {isSized && (
        <PizzaSizeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          pizzaData={modalData}
          productType={productType!}
        />
      )}
    </>
  );
};

export default MenuListItem;
