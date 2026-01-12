import React, { useState } from "react";
import { useCart, type CartItem } from "../../context/CartContext";
import FadeContent from "../bits/FadeContent";
import ClickSpark from "../bits/ClickSpark";
import PizzaSizeModal, { type PizzaSize, type PizzaModalData } from "../ui/PizzaModal";

export type RspImage = { small: string; medium: string; large: string };
export type MenuItem = {
  id?: string; _id?: string;
  name: string;
  description?: string;
  ingredients?: string;
  price: number;
  image: RspImage | string;
  category?: string;
};

type Props = {
  item: MenuItem;
  bgClass?: string;
  className?: string;
};

const ProductCard: React.FC<Props> = ({ item, bgClass = "bg-white", className }) => {
  const { cartItems, increment, decrement, removeItem, addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const productId = (item.id || item._id || item.name) as string;
  const imagePath =
    typeof item.image === "string"
      ? item.image
      : item.image?.small || item.image?.medium || item.image?.large || "";

  // Определяем, нужна ли модалка выбора размера
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

  // Найдём записи в корзине
  const entries = cartItems.filter((c: CartItem) =>
    isSized ? c.productId.startsWith(productId + "|") : c.productId === productId
  );
  const totalQty = entries.reduce((sum: number, entry: CartItem) => sum + entry.quantity, 0);

  // sizes для модалки
  const sizes: PizzaSize[] = isSized
    ? (
        productType === "drinks"
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
      )
    : [];

  const modalData: PizzaModalData = {
    productId,
    name: item.name,
    basePrice: item.price,
    imagePath,
    sizes,
  };

  const quickAddSimple = () => {
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
      if (lastEntry.quantity <= 1) {
        removeItem(lastEntry.key);
      } else {
        decrement(lastEntry.key);
      }
    }
  };

  const handlePlus = () => {
    if (entries.length > 0) {
      const lastEntry = entries[entries.length - 1];
      increment(lastEntry.key);
    } else {
      isSized ? setIsModalOpen(true) : quickAddSimple();
    }
  };

  const handleOrderNow = () => {
    isSized ? setIsModalOpen(true) : quickAddSimple();
  };

  return (
    <>
      <FadeContent blur={false} duration={2000} easing="ease-out" initialOpacity={0}>
        <div
          className={[
            `${bgClass} h-[512px] rounded-lg shadow-lg p-4 transition-transform`,
            "flex flex-col relative",
            className || "",
          ].join(" ")}
        >
          <picture>
            {typeof item.image !== "string" && (
              <>
                <source media="(min-width:1024px)" srcSet={item.image.large} />
                <source media="(min-width:768px)" srcSet={item.image.medium} />
              </>
            )}
            <img
              src={imagePath}
              alt={item.name}
              className="max-w-full max-h-[360px] object-contain absolute top-[-50px] left-1/2 -translate-x-1/2"
            />
          </picture>

          <div className="p-4 mt-auto h-48">
            <h3 className="text-[28px] font-bold text-dark">{item.name}</h3>
            {(item.description || item.ingredients) && (
              <p className="mt-2 text-sm text-dark line-clamp-3">
                {item.description ?? item.ingredients}
              </p>
            )}

            {/* НИЖНЯЯ ПАНЕЛЬ КАРТОЧКИ */}
            <div className="mt-auto pt-4 flex items-center justify-between overflow-visible">
              {totalQty === 0 ? (
                <span className="relative inline-flex p-3 -m-3 overflow-visible">
                  <ClickSpark sparkColor='#ff003c' sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
                    <button
                      type="button"
                      onClick={handleOrderNow}
                      className="h-10 rounded-full bg-fire-red m-4 ml-0 text-white px-5 text-sm font-semibold leading-none hover:bg-dark transition-colors duration-200"
                    >
                      Order Now
                    </button>
                  </ClickSpark>
                </span>
              ) : (
                <div className="inline-flex items-center gap-2">
                  <span className="relative inline-flex p-2.5 -m-2.5 overflow-visible">
                    <ClickSpark sparkColor='#1a1a1a' sparkSize={10} sparkRadius={15} sparkCount={8} duration={400} >
                      <button
                        type="button"
                        onClick={handleMinus}
                        aria-label="Decrease quantity"
                        className="h-10 w-10 rounded-full border m-4 mx-0 border-black/10 hover:bg-black/5 flex items-center justify-center leading-none transition-colors duration-200"
                      >
                        –
                      </button>
                    </ClickSpark>
                  </span>

                  <span className="min-w-8 text-center text-sm leading-none font-medium">{totalQty}</span>

                  <span className="relative inline-flex p-2.5 -m-2.5 overflow-visible">
                    <ClickSpark sparkColor='#1a1a1a' sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
                      <button
                        type="button"
                        onClick={handlePlus}
                        aria-label="Increase quantity"
                        className="h-10 w-10 rounded-full border m-4 ml-0 border-black/10 hover:bg-black/5 flex items-center justify-center leading-none transition-colors duration-200"
                      >
                        +
                      </button>
                    </ClickSpark>
                  </span>
                </div>
              )}

              <span className="text-sm font-semibold text-foreground-p leading-none">
                from <span className="text-[22px] text-dark">${item.price.toFixed(2)}</span>
              </span>
            </div>
          </div>
        </div>
      </FadeContent>

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

export default ProductCard;
