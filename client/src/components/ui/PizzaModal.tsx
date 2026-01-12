import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";

export type PizzaSize = {
  size: string;
  price: number;
  imageScale?: number;
};

export type PizzaModalData = {
  productId: string;
  name: string;
  basePrice: number;
  imagePath: string;
  sizes: PizzaSize[];
};

type ProductType = "pizza" | "drinks";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  pizzaData: PizzaModalData;
  productType: ProductType;
};

const PizzaSizeModal: React.FC<Props> = ({ isOpen, onClose, pizzaData, productType }) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageScale, setImageScale] = useState(1);

  const sizeScales = { Small: 0.8, Medium: 1, Large: 1.2 };

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
      setImageLoading(true);
      setImageScale(1);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  };

  const handleSizeSelect = (index: number) => {
    const selectedSizeName = pizzaData.sizes[index].size;
    const newScale = sizeScales[selectedSizeName as keyof typeof sizeScales] || 1;

    setImageScale(0.9);
    setTimeout(() => {
      setSelectedSize(index);
      setImageScale(newScale);
    }, 150);
  };

  const handleAddToCart = () => {
    const s = pizzaData.sizes[selectedSize];
    addToCart({
      productId: `${pizzaData.productId}|${s.size}`,
      name: `${pizzaData.name} (${s.size})`,
      price: s.price,
      imagePath: pizzaData.imagePath,
      quantity: 1,
      type: productType,
    });
    handleClose();
    window.dispatchEvent(new CustomEvent("cart:open"));
  };

  const handleImageLoad = () => setImageLoading(false);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-500 ${
        isVisible ? "bg-black/60 backdrop-blur-sm" : "bg-black/0 backdrop-blur-0"
      }`}
      onClick={handleClose}
    >
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`relative bg-white rounded-3xl mx-4 max-w-2xl w-full transform transition-all duration-500 ${
          isVisible ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-8"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* брендовые «якоря» сверху/снизу */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-fire-red rounded-full" />
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-fire-red rounded-full" />

        <button
          onClick={handleClose}
          className="absolute -top-12 right-0 w-8 h-8 text-white hover:text-white/80 transition-colors duration-200 z-10"
        >
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-dark mb-2 bg-gradient-to-r from-fire-red to-dark bg-clip-text text-transparent">
              {pizzaData.name}
            </h3>
            <p className="text-gray-600 text-lg">Choose your perfect size</p>
          </div>

          {/* image + glow */}
          <div className="relative mb-8 flex justify-center">
            <div className="relative w-64 h-64 flex items-center justify-center">
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-fire-red/90 border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              <div className="relative">
                <img
                  src={pizzaData.imagePath}
                  alt={pizzaData.name}
                  className={`transition-all duration-500 ${imageLoading ? "opacity-0" : "opacity-100"}`}
                  style={{ transform: `scale(${imageScale})`, filter: imageLoading ? "blur(10px)" : "blur(0)" }}
                  onLoad={handleImageLoad}
                />
                <div
                  className="absolute inset-0 bg-fire-red/25 rounded-full blur-xl transition-all duration-500"
                  style={{ transform: `scale(${imageScale * 1.2})`, opacity: 0.6 - (imageScale - 1) * 0.3 }}
                />
              </div>

              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-fire-red text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                {pizzaData.sizes[selectedSize].size}
              </div>
            </div>
          </div>

          {/* size buttons */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {pizzaData.sizes.map((size, index) => {
              const active = selectedSize === index;
              return (
                <button
                  key={size.size}
                  onClick={() => handleSizeSelect(index)}
                  className={[
                    "p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105",
                    active
                      ? "border-fire-red bg-gradient-to-br from-fire-red to-dark text-white shadow-lg scale-105"
                      : "border-black/10 bg-white hover:border-fire-red/30 hover:bg-fire-red/5",
                  ].join(" ")}
                >
                  <div className="text-center">
                    <div className={`font-bold text-lg mb-1 ${active ? "text-white" : "text-dark"}`}>{size.size}</div>
                    <div className={`text-sm font-semibold ${active ? "text-white/80" : "text-fire-red"}`}>
                      ${size.price.toFixed(2)}
                    </div>
                    <div
                      className={[
                        "mt-2 w-3 h-3 rounded-full mx-auto transition-all duration-300",
                        active ? "bg-white scale-100" : "bg-black/20 scale-75",
                      ].join(" ")}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* summary chip (брендовый soft-bg) */}
          <div className="bg-gradient-to-r from-fire-red/5 to-transparent rounded-2xl p-4 mb-6 text-center border border-fire-red/20">
            <div className="text-sm text-gray-600">Selected</div>
            <div className="font-bold text-lg text-dark">
              {pizzaData.name} - {pizzaData.sizes[selectedSize].size}
            </div>
            <div className="text-fire-red font-bold text-xl">
              ${pizzaData.sizes[selectedSize].price.toFixed(2)}
            </div>
          </div>

          {/* actions */}
          <div className="flex gap-4">
            <button
              onClick={handleClose}
              className="flex-1 py-4 px-6 rounded-2xl border-2 border-black/10 font-semibold text-dark hover:bg-black/5 hover:border-black/20 transition-all duration-300 transform hover:scale-105"
            >
              Cancel
            </button>
            <button
              onClick={handleAddToCart}
              className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-fire-red to-dark text-white font-semibold hover:from-dark hover:to-dark shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add to Cart
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaSizeModal;
